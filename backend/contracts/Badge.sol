// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

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

    bytes32 public constant MINTER = keccak256("MINTER");

    Counters.Counter private _tokenIds;

    constructor ()
    public
    ERC721("badge", "BDG")
    {}

    function addMinter(address _minter)
    public
    onlyOwner
    {
        _grantRole(MINTER, _minter);
    }

    function removeMinter(address _minter)
    public
    onlyOwner
    {
        _revokeRole(MINTER, _minter);
    }

    function mint(address account, string memory tokenURI)
    public
    onlyRole(MINTER)
    returns (uint256)
    {
        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();

        _safeMint(account, newTokenId);

        _setTokenURI(newItemId, tokenURI);

        return newTokenId;
    }
}
