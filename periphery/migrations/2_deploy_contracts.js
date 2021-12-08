const Router = artifacts.require("MCSwapRouter.sol");
const WETH = artifacts.require("WETH.sol");
const fUSDC = artifacts.require("fUSDC.sol");
const fUSDT = artifacts.require("fUSDT.sol");
const fDAI = artifacts.require("fDAI.sol");

module.exports = async function (deployer, _network, addresses) {

  await deployer.deploy(WETH);
  const weth = await WETH.deployed();

  const FACTORY_ADDRESS="0x4D35e49960Cda53fC54C6a76443cd986e53d246f";
  await deployer.deploy(Router, FACTORY_ADDRESS, weth.address);
  const router = await Router.deployed();

  await deployer.deploy(fUSDC,"USD Token","USDC",10000, addresses[0]);
  const usdc = await fUSDC.deployed();

  await deployer.deploy(fUSDT,"Tether USD","USDT",10000, addresses[0]);
  const usdt = await fUSDT.deployed();

  await deployer.deploy(fDAI,"Maker Dai","DAI",10000, addresses[0]);
  const dai = await fDAI.deployed();

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
