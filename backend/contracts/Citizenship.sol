// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Citizenship {
    struct Citizen {
        string id;
        uint8 age;
    }

    error CitizenAlreadyRegistered(address citizenAddress);
    error CitizenInvalidId();

    event CitizenRegistered(address citizenAddress, string citizenId, uint8 citizenAge);

    address public admin;
    mapping(address => Citizen) citizens;
    address[] citizensByAddress;

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
}
