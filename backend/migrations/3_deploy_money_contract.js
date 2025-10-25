const Money = artifacts.require('Money');
const Citizenship = artifacts.require('Citizenship');

module.exports = async function(deployer) {
  const citizenship = await Citizenship.deployed();

  await deployer.deploy(Money, citizenship.address, 0);
};
