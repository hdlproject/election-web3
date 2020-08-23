pragma solidity ^0.5.16;

contract Elections {
    struct Citizen {
        string id;
        string name;
        uint8 age;
    }

    struct Elector {
        Citizen citizen;
        address electeeAddress;
    }

    struct Electee {
        Citizen citizen;
        uint16 voteCount;
    }

    address public admin;

    mapping(address => Citizen) Citizens;
    mapping(address => Elector) Electors;
    mapping(address => Electee) Electees;

    address[] citizensByAddress;
    address[] electorsByAddress;
    address[] electeesByAddress;

    constructor() public {
        admin = msg.sender;
    }

    function registerCitizen(address citizenAddress, string memory _id, string memory _name, uint8 _age) public returns (bool success) {
        require(msg.sender == admin);

        if (bytes(Citizens[citizenAddress].id).length == 0 && bytes(_id).length != 0) {
            Citizen memory citizen = Citizen({
            id : _id,
            name : _name,
            age : _age
            });

            Citizens[citizenAddress] = citizen;
            citizensByAddress.push(citizenAddress);
            return true;
        } else {
            return false;
        }
    }

    function getCitizen(address citizenAddress) public returns (string memory id, string memory name, uint8 age) {
        return (Citizens[citizenAddress].id, Citizens[citizenAddress].name, Citizens[citizenAddress].age);
    }

    function getCitizens() public returns (address[] memory citizenAddresses){
        return citizensByAddress;
    }

    function registerElector(address citizenAddress) public returns (bool success) {
        require(msg.sender == admin);

        Citizen memory citizen;
        if (bytes(Citizens[citizenAddress].id).length != 0) {
            citizen = Citizens[citizenAddress];
        } else {
            return false;
        }

        if (bytes(Electors[citizenAddress].citizen.id).length == 0) {
            Elector memory elector = Elector({
            citizen : citizen,
            electeeAddress : address(0)
            });

            Electors[citizenAddress] = elector;
            electorsByAddress.push(citizenAddress);
            return true;
        } else {
            return false;
        }
    }

    function getElector(address citizenAddress) public returns (string memory id, string memory name, uint8 age, address electeeAddress) {
        return (Electors[citizenAddress].citizen.id, Electors[citizenAddress].citizen.name, Electors[citizenAddress].citizen.age, Electors[citizenAddress].electeeAddress);
    }

    function getElectors() public returns (address[] memory electorAddresses){
        return electorsByAddress;
    }

    function registerElectee(address citizenAddress) public returns (bool success) {
        require(msg.sender == admin);

        Citizen memory citizen;
        if (bytes(Citizens[citizenAddress].id).length != 0) {
            citizen = Citizens[citizenAddress];
        } else {
            return false;
        }

        if (bytes(Electees[citizenAddress].citizen.id).length == 0) {
            Electee memory electee = Electee({
            citizen : citizen,
            voteCount : 0
            });

            Electees[citizenAddress] = electee;
            electeesByAddress.push(citizenAddress);
            return true;
        } else {
            return false;
        }
    }

    function getElectee(address citizenAddress) public returns (string memory id, string memory name, uint8 age, uint16 voteCount) {
        return (Electees[citizenAddress].citizen.id, Electees[citizenAddress].citizen.name, Electees[citizenAddress].citizen.age, Electees[citizenAddress].voteCount);
    }

    function getElectees() public returns (address[] memory electeeAddresses){
        return electeesByAddress;
    }

    function elect(address electeeAdress) public returns (bool success) {
        Electee memory electee;
        if (bytes(Electees[electeeAdress].citizen.id).length != 0) {
            electee = Electees[electeeAdress];
        } else {
            return false;
        }

        Elector memory elector;
        if (bytes(Electors[msg.sender].citizen.id).length != 0 &&
            Electors[msg.sender].electeeAddress == address(0)) {

            elector = Electors[msg.sender];
            elector.electeeAddress = electeeAdress;
            Electors[msg.sender] = elector;

            electee.voteCount += 1;
            Electees[electeeAdress] = electee;
            return true;
        } else {
            return false;
        }
    }
}