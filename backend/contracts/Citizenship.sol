// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

contract Citizenship is AccessControl, Ownable {
    struct Citizen {
        string id;
        uint8 age;
    }

    bytes32 public constant PRESIDENT = keccak256("PRESIDENT");
    bytes32 public constant ELECTION_ADMIN = keccak256("ELECTION_ADMIN");

    address public electionContract;

    error CitizenAlreadyRegistered(address citizenAddress);
    error CitizenInvalidId();
    error ElectionContractNotSet();
    error ElectionContractUnauthorized(address caller);
    error PresidentNotCitizen(address presidentAddress); // new error

    event CitizenRegistered(address citizenAddress, string citizenId, uint8 citizenAge);
    event PresidentChanged(address oldPresidentAddress, address newPresidentAddress);
    event ElectionAdminAdded(address electionAdminAddress);
    event ElectionAdminRemoved(address electionAdminAddress);
    event ElectionContractSet(address oldElectionContract, address newElectionContract); // new event

    mapping(address => Citizen) citizens;
    address[] citizensByAddress;
    address presidentAddress;

    constructor() {}

    function setElectionContract(address _address)
    public
    onlyOwner
    {
        require(_address != address(0), "Citizenship: invalid election contract address");
        address old = electionContract;
        electionContract = _address;
        emit ElectionContractSet(old, _address);
    }

    function registerCitizen(address _address, string memory _id, uint8 _age) public onlyOwner {
        if (bytes(_id).length == 0) {
            revert CitizenInvalidId();
        }
        if (bytes(citizens[_address].id).length != 0) {
            revert CitizenAlreadyRegistered({citizenAddress: _address});
        }
        Citizen memory citizen = Citizen({id: _id, age: _age});
        citizens[_address] = citizen;
        citizensByAddress.push(_address);
        emit CitizenRegistered(_address, _id, _age);
    }

    function getCitizen(address _address) public view returns (string memory id, uint8 age) {
        return (citizens[_address].id, citizens[_address].age);
    }

    function getCitizens() public view returns (address[] memory citizensByAddress) {
        return citizensByAddress;
    }

    function changePresident(address _address)
    public
    {
        if (electionContract == address(0)) {
            revert ElectionContractNotSet();
        }
        if (msg.sender != electionContract) {
            revert ElectionContractUnauthorized(msg.sender);
        }
        if (bytes(citizens[_address].id).length == 0) {
            revert PresidentNotCitizen(_address);
        }
        if (presidentAddress != address(0)) {
            _revokeRole(PRESIDENT, presidentAddress);
        }
        address oldPresidentAddress = presidentAddress;
        presidentAddress = _address;
        _grantRole(PRESIDENT, _address);
        emit PresidentChanged(oldPresidentAddress, presidentAddress);
    }

    function getPresident() external view returns (address) {
        return presidentAddress;
    }

    function addElectionAdmin(address _address)
    public
    onlyOwner
    {
        _grantRole(ELECTION_ADMIN, _address);
        emit ElectionAdminAdded(_address);
    }

    function removeElectionAdmin(address _address)
    public
    onlyOwner
    {
        _revokeRole(ELECTION_ADMIN, _address);
        emit ElectionAdminRemoved(_address);
    }
}
