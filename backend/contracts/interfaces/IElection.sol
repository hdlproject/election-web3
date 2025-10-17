// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

/**
 * @title IElection
 * @dev Interface for the Election contract to allow other contracts (or off-chain systems)
 *      to interact without importing full implementation code.
 */
interface IElection {
    // Errors (optional in interface for reference; not enforced by compiler usage)
    // error CitizenNotRegistered(address citizenAddress);
    // error CitizenUnderaged(address citizenAddress);
    // error ElecteeAlreadyRegistered(address electeeAddress);
    // error ElecteeNotRegistered(address electeeAddress);
    // error ElectorAlreadyRegistered(address electorAddress);
    // error ElectorNotRegistered(address electorAddress);
    // error ElectorAlreadyElect(address electorAddress);
    // error NotElectionAdmin(address caller);

    // Events
    event ElecteeRegistered(address electeeAddress, string electeeId, uint8 electeeAge);
    event ElectorRegistered(address electorAddress, string electorId, uint8 electorAge);
    event Elected(address electeeAddress, address electorAddress, uint256 voteCount);
    event ElectionStarted();
    event ElectionFinished();

    // Core lifecycle
    function start() external;
    function finish() external;

    // Registration
    function registerElectee(address _address) external;
    function registerElector(address _address) external;

    // Voting
    function elect(address _address) external;

    // Views
    function getElectee(address _address) external view returns (string memory id, uint8 age, uint256 voteCount);
    function getElectees() external view returns (address[] memory electeeAddresses);
    function getElector(address _address) external view returns (string memory id, uint8 age, bool alreadyElected);
    function getElectors() external view returns (address[] memory electorAddresses);
    function getBestElectee() external view returns (address electeeAddress);
    function getStatus() external view returns (bool started, bool finished, address leader, uint256 leaderVotes);
}

