// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

/**
 * @title IBadge
 * @dev Interface for the Badge contract (minister NFTs). Provides a minimal surface
 *      for other contracts or off-chain services to query and interact without
 *      importing full implementation code.
 */
interface IBadge {
    // Events (must match implementation signatures for indexers)
    event MinisterAppointed(address indexed minister, uint256 indexed tokenId);
    event MinisterDismissed(address indexed minister, uint256 indexed tokenId);
    event BadgeMinted(address indexed to, uint256 indexed tokenId, string tokenURI);
    event BadgeBurned(uint256 indexed tokenId);

    // Minister management
    function appointMinister(address newMinister, string memory tokenURI) external returns (uint256 tokenId);
    function dismissMinister(address minister) external;

    // Views
    function getMinisterBadgeId(address minister) external view returns (uint256);
    function getMinisters() external view returns (address[] memory);

    // ERC165 support query
    function supportsInterface(bytes4 interfaceId) external view returns (bool);
}

