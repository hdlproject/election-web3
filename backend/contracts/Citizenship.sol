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
    mapping(address => Citizen) Citizens;
    address[] citizensByAddress;

    constructor() {
        admin = msg.sender;
    }

    function registerCitizen(address _address, string memory _id, uint8 _age) public {
        require(msg.sender == admin);

        if (bytes(_id).length == 0) {
            revert CitizenInvalidId();
        }

        if (bytes(Citizens[_address].id).length != 0) {
            revert CitizenAlreadyRegistered({citizenAddress: _address});
        }

        Citizen memory citizen = Citizen({
            id: _id,
            age: _age
        });
        Citizens[_address] = citizen;
        citizensByAddress.push(_address);

        emit CitizenRegistered(_address, _id, _age);
    }

    function getCitizen(address _address) public view returns (string memory id, uint8 age) {
        return (Citizens[_address].id, Citizens[_address].age);
    }

    function getCitizens() public view returns (address[] memory citizenAddresses){
        return citizensByAddress;
    }
}
