const NVMCStake = artifacts.require("./NVMCStake.sol");
const ERC20Factory = artifacts.require("./ERC20Factory.sol");
const MockERC20 = artifacts.require("./MockERC20.sol");
const NVMC = artifacts.require("./NVMC.sol");
const FakeUSDC = artifacts.require("./fUSDC.sol");
const FakeUSDT = artifacts.require("./fUSDT.sol");
const FakeDAI = artifacts.require("./fDAI.sol");
const Web3 = require('web3');

module.exports = async function(deployer, network, accounts) {
  let depositToken, rewardToken;
  let fakeUSDCAddress, fakeUSDTAddress, fakeDAIAddress;

  // If deploying to dev network, create mock tokens and use them for staking contract.
  if (network == "development") {
    await deployer.deploy(ERC20Factory);
    const erc20factory = await ERC20Factory.deployed();
    await erc20factory.createToken("NVMC Stake", "NVMC");
    await erc20factory.createToken("LP NVMC-BNB", "LPToken NVMC");
    const tokens = await erc20factory.getTokens()
    console.log(tokens);
    const lpToken = await MockERC20.at(tokens[1]);
    //console.log(lpToken);
    console.log(lpToken.address);
    await lpToken.mint(accounts[1], Web3.utils.toWei("1000000"));
    await lpToken.mint(accounts[2], Web3.utils.toWei("2000000"));

console.log(accounts[1]);
console.log(accounts[2]);

    depositToken = tokens[1];
    rewardToken = tokens[0];
    console.log('deposit '+depositToken);
    console.log('reward '+rewardToken);

    await deployer.deploy(FakeUSDC);
    const fusdc = await FakeUSDC.deployed();
    await deployer.deploy(FakeUSDT);
    const fusdt = await FakeUSDT.deployed();
    await deployer.deploy(FakeDAI);
    const fdai = await FakeDAI.deployed();
    console.log('fakeUSDC '+fusdc);
    console.log('fakeUSDT '+fusdt);
    console.log('fakeDAI '+fdai);
    // StableCoin address
    fakeUSDCAddress = fusdc.address;
    fakeUSDTAddress = fusdt.address;
    fakeDAIAddress = fdai.address;
    console.log('fakeUSDC '+fakeUSDCAddress);
    console.log('fakeUSDT '+fakeUSDTAddress);
    console.log('fakeDAI '+fakeDAIAddress);
  }
  else {

  }

    await deployer.deploy(NVMCStake, depositToken, rewardToken);
    const nvmcStake = await NVMCStake.deployed();
    console.log(NVMCStake.address);

    await deployer.deploy(NVMC);
    const nvmc = await NVMC.deployed();
    console.log(nvmc.address);
    console.log(await nvmc.owner());
    console.log(await nvmc.getChief(NVMCStake.address));
    /* Set Chief */
    nvmc.setChief(NVMCStake.address);
    console.log('await nvmc.owner()');
    console.log(await nvmc.owner());
    console.log(await nvmc.getChief(NVMCStake.address));
    // Mint NVMC
    //await NVMCStake.mint(accounts[1], Web3.utils.toWei("1000000"));
    /*
    setTimeout(async () => {
      console.log("== Now creating rewards....");

    }, 5000);
    */

};
