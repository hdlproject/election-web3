// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./Citizenship.sol";
import "./Badge.sol";

contract Election {
    struct Electee {
        string id;
        uint256 voteCount;
    }

    struct Elector {
        string id;
        bool alreadyElect;
    }

    error CitizenNotRegistered(address citizenAddress);
    error CitizenUnderaged(address citizenAddress);
    error ElecteeAlreadyRegistered(address electeeAddress);
    error ElecteeNotRegistered(address electeeAddress);
    error ElectorAlreadyRegistered(address electorAddress);
    error ElectorNotRegistered(address electorAddress);
    error ElectorAlreadyElect(address electorAddress);

    event ElecteeRegistered(address electeeAddress, string electeeId, uint8 electeeAge);
    event ElectorRegistered(address electorAddress, string electorId, uint8 electorAge);
    event Elected(address electeeAddress, address electorAddress, uint256 voteCount);
    event ElectionStarted();
    event ElectionFinished();

    Citizenship private citizenship;
    Badge private badge;

    address public admin;
    mapping(address => Electee) electees;
    mapping(address => Elector) electors;
    address[] electeesByAddress;
    address[] electorsByAddress;
    bool isStarted;
    bool isFinished;
    Electee bestElectee;
    address bestElecteeAddress;

    constructor(address citizenshipContractAddress, address badgeContractAddress) {
        admin = msg.sender;
        citizenship = Citizenship(citizenshipContractAddress);
        badge = Badge(badgeContractAddress);
    }

    modifier notStarted() {
        require(!isStarted, "Election: already started");
        _;
    }

    modifier notFinished() {
        require(isStarted, "Election: not yet started");
        require(!isFinished, "Election: already finished");
        _;
    }

    function registerElectee(address _address) public notFinished {
        require(msg.sender == admin);

        (string memory _id, uint8 _age) = citizenship.getCitizen(_address);
        if (bytes(_id).length == 0) {
            revert CitizenNotRegistered({citizenAddress: _address});
        }
        if (_age < 18) {
            revert CitizenUnderaged({citizenAddress: _address});
        }

        if (bytes(electees[_address].id).length != 0) {
            revert ElecteeAlreadyRegistered({electeeAddress: _address});
        }

        Electee memory electee = Electee({id: _id, voteCount: 0});
        electees[_address] = electee;
        electeesByAddress.push(_address);

        emit ElecteeRegistered(_address, _id, _age);
    }

    function getElectee(address _address) public view returns (string memory id, uint8 age, uint256 voteCount) {
        (id, age) = citizenship.getCitizen(_address);
        voteCount = electees[_address].voteCount;
    }

    function getElectees() public view returns (address[] memory electeeAddresses){
        return electeesByAddress;
    }

    function registerElector(address _address) public notFinished {
        require(msg.sender == admin);

        (string memory _id, uint8 _age) = citizenship.getCitizen(_address);
        if (bytes(_id).length == 0) {
            revert CitizenNotRegistered({citizenAddress: _address});
        }
        if (_age < 18) {
            revert CitizenUnderaged({citizenAddress: _address});
        }

        if (bytes(electors[_address].id).length != 0) {
            revert ElectorAlreadyRegistered({electorAddress: _address});
        }

        Elector memory elector = Elector({id: _id, alreadyElect: false});
        electors[_address] = elector;
        electorsByAddress.push(_address);

        emit ElectorRegistered(_address, _id, _age);
    }

    function getElector(address _address) public view returns (string memory id, uint8 age, bool alreadyElect) {
        (id, age) = citizenship.getCitizen(_address);
        alreadyElect = electors[_address].alreadyElect;
    }

    function getElectors() public view returns (address[] memory electorAddresses){
        return electorsByAddress;
    }

    function elect(address _address) public notFinished {
        if (bytes(electees[_address].id).length == 0) {
            revert ElecteeNotRegistered({electeeAddress: _address});
        }

        if (bytes(electors[msg.sender].id).length == 0) {
            revert ElectorNotRegistered({electorAddress: msg.sender});
        }

        if (electors[msg.sender].alreadyElect == true) {
            revert ElectorAlreadyElect({electorAddress: msg.sender});
        }

        Elector memory elector = electors[msg.sender];
        elector.alreadyElect = true;
        electors[msg.sender] = elector;

        uint256 voteCount = _setBestElectee(_address);

        emit Elected(_address, msg.sender, voteCount);
    }

    function _setBestElectee(address _address) internal virtual returns (uint256 voteCount) {
        Electee memory electee = electees[_address];
        electee.voteCount += 1;
        electees[_address] = electee;

        if (electee.voteCount > bestElectee.voteCount) {
            bestElectee = electee;
            bestElecteeAddress = _address;
        }

        voteCount = electee.voteCount;
    }

    function getBestElectee() public view returns (address electeeAddress) {
        electeeAddress = bestElecteeAddress;
    }

    function start() public notStarted {
        isStarted = true;

        emit ElectionStarted();
    }

    function finish() public notFinished {
        isFinished = true;

        citizenship.changePresident(bestElecteeAddress);

        emit ElectionFinished();
    }
}
