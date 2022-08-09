// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/utils/Address.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Votes.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/draft-ERC20Permit.sol";

contract Money is ERC20, ERC20Votes, ERC20Permit, AccessControl, Ownable {
    using Address for address;
    using SafeMath for uint;

    bytes32 public constant MINTER = keccak256("MINTER");

    constructor ()
    public
    ERC20("money", "MNY")
    ERC20Permit("money")
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

    function mint(address account, uint amount)
    public
    onlyRole(MINTER)
    {
        _mint(account, amount);
    }

    // For the governance purpose

    function _afterTokenTransfer(address from, address to, uint256 amount)
    internal
    override(ERC20, ERC20Votes)
    {
        super._afterTokenTransfer(from, to, amount);
    }

    function _mint(address to, uint256 amount)
    internal
    override(ERC20, ERC20Votes)
    {
        super._mint(to, amount);
    }

    function _burn(address account, uint256 amount)
    internal
    override(ERC20, ERC20Votes)
    {
        super._burn(account, amount);
    }
}
