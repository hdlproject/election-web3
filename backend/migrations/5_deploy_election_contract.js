const Election = artifacts.require('Election');
const Citizenship = artifacts.require('Citizenship');

module.exports = async function(deployer) {
  await deployer.deploy(Election, process.env.CITIZENSHIP_CONTRACT_ADDRESS, process.env.BADGE_CONTRACT_ADDRESS);

  // Add election as owner,
  // so the contract can grant any winner
  // as a president
  const citizenship = await Citizenship.deployed();
  await citizenship.addOwner(Election.address);
};
