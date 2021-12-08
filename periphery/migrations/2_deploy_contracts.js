const Router = artifacts.require("MCSwapRouter.sol");
const WETH = artifacts.require("WETH.sol");
const ERC20_1 = artifacts.require("ERC20_1.sol");
const ERC20_2 = artifacts.require("ERC20_2.sol");
const ERC20_3 = artifacts.require("ERC20_3.sol");

module.exports = async function (deployer, _network, addresses) {

  await deployer.deploy(WETH);
  const weth = await WETH.deployed();

  const FACTORY_ADDRESS="0x4D35e49960Cda53fC54C6a76443cd986e53d246f";
  await deployer.deploy(Router, FACTORY_ADDRESS, weth.address);
  const router = await Router.deployed();

  await deployer.deploy(ERC20_1,"USD Token","USDC",10000, addresses[0]);
  const usdc = await ERC20_1.deployed();

  await deployer.deploy(ERC20_2,"Tether USD","USDT",10000, addresses[0]);
  const usdt = await ERC20_2.deployed();

  await deployer.deploy(ERC20_3,"Maker Dai","DAI",10000, addresses[0]);
  const dai = await ERC20_3.deployed();

  const ethToAdd=1*10**8;
  const tokToAdd=4000*10**8;

  await usdc.approve(router.address,tokToAdd);
  await router.addLiquidityETH(usdc.address,tokToAdd,0,0,addresses[0],99999999999,{value:ethToAdd});

  await usdt.approve(router.address,tokToAdd);
  await router.addLiquidityETH(usdt.address,tokToAdd,0,0,addresses[0],99999999999,{value:ethToAdd});

  await dai.approve(router.address,tokToAdd);
  await router.addLiquidityETH(dai.address,tokToAdd,0,0,addresses[0],99999999999,{value:ethToAdd});

  await router.swapExactETHForTokens(0, [weth.address,usdc.address], addresses[0], 99999999999, {value:10**6})

};
