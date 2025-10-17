const Election = artifacts.require('Election');
const Citizenship = artifacts.require('Citizenship');

module.exports = async function(deployer) {
  await deployer.deploy(Election, process.env.CITIZENSHIP_CONTRACT_ADDRESS);

  const citizenship = await Citizenship.deployed();
  // Authorize Election contract for president changes
  await citizenship.setElectionContract(Election.address);
};
