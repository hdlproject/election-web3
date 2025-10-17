// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

/**
 * @title ICitizenship
 * @dev Minimal interface to interact with the Citizenship contract for role & citizen queries.
 *      Keeping this in an interface allows other contracts (e.g., Election, Treasury) to depend only
 *      on the surface they need without importing full implementation (prevents tight coupling and
 *      reduces risk of circular dependencies).
 */
interface ICitizenship {
    // Role queries (AccessControl standard)
    function hasRole(bytes32 role, address account) external view returns (bool);

    // Role constant getters
    function PRESIDENT() external pure returns (bytes32);
    function ELECTION_ADMIN() external pure returns (bytes32);

    // Citizen management
    function registerCitizen(address _address, string memory _id, uint8 _age) external;
    function getCitizen(address _address) external view returns (string memory id, uint8 age);
    function getCitizens() public view returns (address[] memory citizensByAddress);

    // Election contract linkage
    function setElectionContract(address _address) external;
    function electionContract() external view returns (address);

    // Presidency management
    function changePresident(address _address) external;
    function getPresident() external view returns (address);

    // Election admin role management
    function addElectionAdmin(address _address) external;
    function removeElectionAdmin(address _address) external;
}
