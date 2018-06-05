const WineHouse = artifacts.require('WineHouse.sol');

module.exports = function(deployer) {
  deployer.deploy(WineHouse);
};