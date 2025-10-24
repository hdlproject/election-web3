// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./interfaces/ICitizenship.sol"; // decouple from implementation
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Badge is ERC721URIStorage, AccessControl, Ownable {
    using Counters for Counters.Counter;

    ICitizenship private citizenship;
    Counters.Counter private _tokenIds;

    // Replace single minister badge tracking with multi-minister support
    mapping(address => uint256) private ministerBadgeIds; // minister => badge tokenId
    address[] private ministers; // enumeration of current ministers

    // Old single-minister events removed; introduce multi-minister events
    event MinisterAppointed(address indexed minister, uint256 indexed tokenId);
    event MinisterDismissed(address indexed minister, uint256 indexed tokenId);

    // Events for badge lifecycle
    event BadgeMinted(address indexed to, uint256 indexed tokenId, string tokenURI); // restored
    event BadgeBurned(uint256 indexed tokenId); // restored

    // Adjust errors: keep relevant ones, remove unused
    error MinisterAlreadyAppointed(address minister);
    error MinisterNotFound(address minister);

    // Errors referenced in helpers
    error NotPresident(address caller); // restored
    error BadgeInvalidTokenId(); // restored

    constructor (address citizenshipContractAddress)
    ERC721("badge", "BDG")
    {
        citizenship = ICitizenship(citizenshipContractAddress);
    }

    modifier onlyPresident() {
        if (!citizenship.hasRole(citizenship.PRESIDENT(), msg.sender)) {
            revert NotPresident(msg.sender);
        }
        _;
    }

    // Remove public mint/burn; use private helpers
    function _mintBadge(address account, string memory tokenURI) private returns (uint256) {
        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();
        _safeMint(account, newTokenId);
        _setTokenURI(newTokenId, tokenURI);
        emit BadgeMinted(account, newTokenId, tokenURI);
        return newTokenId;
    }

    function _burnBadge(uint256 tokenId) private {
        if (!_exists(tokenId)) {
            revert BadgeInvalidTokenId();
        }
        _burn(tokenId);
        emit BadgeBurned(tokenId);
    }

    // One-step minister appointment. Mints a new badge for a new minister.
    function appointMinister(address newMinister, string memory tokenURI) external onlyPresident returns (uint256 tokenId) {
        (string memory id, ) = citizenship.getCitizen(newMinister);
        require(bytes(id).length != 0, "Badge: minister not citizen");
        if (ministerBadgeIds[newMinister] != 0) {
            revert MinisterAlreadyAppointed(newMinister);
        }
        tokenId = _mintBadge(newMinister, tokenURI);
        ministerBadgeIds[newMinister] = tokenId;
        ministers.push(newMinister);
        emit MinisterAppointed(newMinister, tokenId);
    }

    // Dismiss a minister: burns their badge and removes from list
    function dismissMinister(address minister) external onlyPresident {
        uint256 tokenId = ministerBadgeIds[minister];
        if (tokenId == 0) {
            revert MinisterNotFound(minister);
        }
        _burnBadge(tokenId);
        ministerBadgeIds[minister] = 0;
        // remove from array (swap & pop)
        for (uint256 i = 0; i < ministers.length; i++) {
            if (ministers[i] == minister) {
                ministers[i] = ministers[ministers.length - 1];
                ministers.pop();
                break;
            }
        }
        emit MinisterDismissed(minister, tokenId);
    }

    // Getter for a minister's badge id
    function getMinisterBadgeId(address minister) external view returns (uint256) {
        return ministerBadgeIds[minister];
    }

    // Enumerate current ministers
    function getMinisters() external view returns (address[] memory) {
        return ministers;
    }

    function supportsInterface(bytes4 interfaceId)
    public view
    override(ERC721URIStorage, AccessControl)
    returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}
