// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./interfaces/ICitizenship.sol"; // use interface for decoupling
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";

contract Money is ERC20, Ownable, Pausable {
    ICitizenship private citizenship;

    uint256 public immutable cap;

    error CitizenNotRegistered(address citizenAddress);
    error NotPresident(address caller);
    error CapExceeded(uint256 attempted, uint256 cap);

    event Minted(address indexed to, uint256 amount, address indexed president);
    event Burned(address indexed from, uint256 amount, address indexed president);
    event CitizenshipContractSet(address oldAddress, address newAddress);

    constructor (address citizenshipContractAddress, uint256 _cap)
    ERC20("money", "MNY")
    {
        citizenship = ICitizenship(citizenshipContractAddress);
        cap = _cap;
    }

    modifier onlyCitizen(address _address) {
        (string memory _id, ) = citizenship.getCitizen(_address);
        if (bytes(_id).length == 0) {
            revert CitizenNotRegistered({citizenAddress: _address});
        }
        _;
    }

    modifier onlyPresident() {
        if (!citizenship.hasRole(citizenship.PRESIDENT(), msg.sender)) {
            revert NotPresident(msg.sender);
        }
        _;
    }

    function setCitizenshipContract(address _address) external onlyOwner {
        require(_address != address(0), "Money: invalid citizenship contract address");
        address old = address(citizenship);
        citizenship = ICitizenship(_address);
        emit CitizenshipContractSet(old, _address);
    }

    function pause() external onlyOwner { _pause(); }
    function unpause() external onlyOwner { _unpause(); }

    function mint(address account, uint256 amount)
    public
    onlyPresident
    whenNotPaused
    {
        _mintInternal(account, amount);
        emit Minted(account, amount, msg.sender);
    }

    function burn(address account, uint256 amount)
    public
    onlyPresident
    whenNotPaused
    {
        _burnInternal(account, amount);
        emit Burned(account, amount, msg.sender);
    }

    function _mintInternal(address to, uint256 amount) internal {
        if (cap != 0) {
            uint256 newTotal = totalSupply() + amount;
            if (newTotal > cap) {
                revert CapExceeded(newTotal, cap);
            }
        }
        _mint(to, amount);
    }

    function _burnInternal(address from, uint256 amount) internal {
        _burn(from, amount);
    }

    function transfer(address to, uint256 amount)
    public
    override(ERC20)
    whenNotPaused
    onlyCitizen(msg.sender)
    onlyCitizen(to) returns (bool)
    {
        return super.transfer(to, amount);
    }

    function transferFrom(address from, address to, uint256 amount)
    public
    override(ERC20)
    whenNotPaused
    onlyCitizen(from)
    onlyCitizen(to) returns (bool)
    {
        return super.transferFrom(from, to, amount);
    }

    function getCitizenshipContract() external view returns (address) {
        return address(citizenship);
    }
}
