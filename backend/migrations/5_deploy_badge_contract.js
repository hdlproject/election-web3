const Badge = artifacts.require('Badge');

module.exports = async function(deployer) {
  await deployer.deploy(Badge, process.env.CITIZENSHIP_CONTRACT_ADDRESS);
};
