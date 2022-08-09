const Citizenship = artifacts.require('Citizenship');

module.exports = async function(deployer) {
  await deployer.deploy(Citizenship);
};
