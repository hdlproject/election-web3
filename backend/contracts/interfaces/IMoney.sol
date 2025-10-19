// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

/**
 * @title IMoney
 * @dev Interface for the national ERC20 Money contract.
 *      Extends IERC20 for standard token operations and adds administrative &
 *      nation-specific controls.
 */
interface IMoney is IERC20 {
    // Custom errors (not enforced by interface, listed for documentation)
    // error CitizenNotRegistered(address citizenAddress);
    // error NotPresident(address caller);
    // error CapExceeded(uint256 attempted, uint256 cap);

    // Events replicated for off-chain indexing
    event Minted(address indexed to, uint256 amount, address indexed president);
    event Burned(address indexed from, uint256 amount, address indexed president);
    event CitizenshipContractSet(address oldAddress, address newAddress);

    // Governance / admin
    function pause() external;
    function unpause() external;
    function setCitizenshipContract(address _address) external;

    // Mint / burn (president controlled)
    function mint(address account, uint256 amount) external;
    function burn(address account, uint256 amount) external;

    // Views
    function cap() external view returns (uint256);
    function getCitizenshipContract() external view returns (address);

    // Status (from Pausable)
    function paused() external view returns (bool);
}

