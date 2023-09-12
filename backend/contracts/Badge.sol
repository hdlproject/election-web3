// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./Citizenship.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Badge is ERC721URIStorage, AccessControl, Ownable {
    using Address for address;
    using SafeMath for uint256;
    using Counters for Counters.Counter;

    Citizenship private citizenship;
    Counters.Counter private _tokenIds;

    uint256 public ministerBadgeId;

    event MinisterChanged(address oldMinisterAddress, address newMinisterAddress);

    constructor (address citizenshipContractAddress)
    ERC721("badge", "BDG")
    {
        citizenship = Citizenship(citizenshipContractAddress);
    }

    modifier onlyPresident(address _address) {
        require(citizenship.hasRole(citizenship.PRESIDENT(), _address), "Badge: not a president");
        _;
    }

    function mint(address account, string memory tokenURI)
    public
    onlyPresident(msg.sender)
    returns (uint256)
    {
        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();

        _safeMint(account, newTokenId);

        _setTokenURI(newTokenId, tokenURI);

        return newTokenId;
    }

    function burn(uint256 tokenId)
    public
    onlyPresident(msg.sender)
    {
        _burn(tokenId);
    }

    function changeMinister(address _address)
    public
    onlyPresident(msg.sender)
    {
        address currentMinisterAddress = ownerOf(ministerBadgeId);
        safeTransferFrom(currentMinisterAddress, _address, ministerBadgeId);

        emit MinisterChanged(currentMinisterAddress, _address);
    }

    function supportsInterface(bytes4 interfaceId)
    public view
    override(ERC721, AccessControl)
    returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}
