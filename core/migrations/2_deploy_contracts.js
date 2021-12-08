const Factory = artifacts.require("MCSwapFactory.sol");
const Test_Token_1 = artifacts.require("Test_Token_1.sol");
const Test_Token_2 = artifacts.require("Test_Token_2.sol");

module.exports = async function (deployer, network, addresses) {
  await deployer.deploy(Factory, addresses[0]);
  const factory = await Factory.deployed();

  await deployer.deploy(Test_Token_1,"Token1","Tok1",1000, addresses[0]);
  const tok1 = await Test_Token_1.deployed();

  await deployer.deploy(Test_Token_2,"Token2","Tok2",1000, addresses[0]);
  const tok2 = await Test_Token_2.deployed();

  await factory.createPair(tok1.address,tok2.address);
};
