// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

contract Citizenship is AccessControl, Ownable {
    struct Citizen {
        string id;
        uint8 age;
    }

    bytes32 public constant OWNER = keccak256("OWNER");
    bytes32 public constant PRESIDENT = keccak256("PRESIDENT");

    error CitizenAlreadyRegistered(address citizenAddress);
    error CitizenInvalidId();
    error OwnerAdded(address ownerAddress);
    error OwnerRemoved(address ownerAddress);
    error PresidentChanged(address oldPresidentAddress, address newPresidentAddress);

    event CitizenRegistered(address citizenAddress, string citizenId, uint8 citizenAge);

    address public admin;
    mapping(address => Citizen) citizens;
    address[] citizensByAddress;
    address presidentAddress;

    constructor() {
        admin = msg.sender;
    }

    function registerCitizen(address _address, string memory _id, uint8 _age) public {
        require(msg.sender == admin);

        if (bytes(_id).length == 0) {
            revert CitizenInvalidId();
        }

        if (bytes(citizens[_address].id).length != 0) {
            revert CitizenAlreadyRegistered({citizenAddress: _address});
        }

        Citizen memory citizen = Citizen({
            id: _id,
            age: _age
        });
        citizens[_address] = citizen;
        citizensByAddress.push(_address);

        emit CitizenRegistered(_address, _id, _age);
    }

    function getCitizen(address _address) public view returns (string memory id, uint8 age) {
        return (citizens[_address].id, citizens[_address].age);
    }

    function getCitizens() public view returns (address[] memory citizenAddresses){
        return citizensByAddress;
    }

    function addOwner(address _address)
    public
    onlyOwner
    {
        _grantRole(OWNER, _address);

        emit OwnerAdded(_address);
    }

    function removeOwner(address _address)
    public
    onlyOwner
    {
        _revokeRole(OWNER, _address);

        emit OwnerRemoved(_address);
    }

    function changePresident(address _address)
    public
    onlyRole(OWNER)
    {
        if (presidentAddress != address(0)) {
            _revokeRole(PRESIDENT, _address);
        }

        address oldPresidentAddress = presidentAddress;
        presidentAddress = _address;
        _grantRole(PRESIDENT, _address);

        emit PresidentChanged(oldPresidentAddress, presidentAddress);
    }
}
