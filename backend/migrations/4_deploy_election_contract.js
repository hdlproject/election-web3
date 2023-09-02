const Election = artifacts.require('Election');

module.exports = async function(deployer) {
  await deployer.deploy(Election, process.env.CITIZENSHIP_CONTRACT_ADDRESS, process.env.MONEY_CONTRACT_ADDRESS);
};
