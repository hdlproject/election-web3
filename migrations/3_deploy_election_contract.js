const Election = artifacts.require('Election');
const Citizenship = artifacts.require('Citizenship');

module.exports = async function(deployer) {
  const citizenship = await Citizenship.deployed();

  await deployer.deploy(Election, citizenship.address);
};
