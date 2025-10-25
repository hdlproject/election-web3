const Badge = artifacts.require('Badge');
const Citizenship = artifacts.require('Citizenship');

module.exports = async function(deployer) {
  const citizenship = await Citizenship.deployed();

  await deployer.deploy(Badge, citizenship.address);
};
