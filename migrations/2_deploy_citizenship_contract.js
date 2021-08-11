const Citizenship = artifacts.require("Citizenship");

module.exports = function (deployer) {
    deployer.deploy(Citizenship);
};
