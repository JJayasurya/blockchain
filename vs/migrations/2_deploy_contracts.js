var Tokens = artifacts.require("./Token.sol");

module.exports = function(deployer) {

  const _name = "tt coin";
  const _symbol = "tt";
  const _decimals = 18;
  const _totalSupply = 2500;
  deployer.deploy(Tokens, _name, _symbol, _decimals, _totalSupply);
};

