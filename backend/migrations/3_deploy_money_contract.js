const Money = artifacts.require('Money');

module.exports = async function(deployer) {
  await deployer.deploy(Money, process.env.CITIZENSHIP_CONTRACT_ADDRESS);
};
