import type { HardhatRuntimeEnvironment } from "hardhat/types";
import type { LocationId } from "@darkforest_eth/types";

import { task, types } from "hardhat/config";
import { formatEther } from "ethers/lib/utils";

import TOKENS_ABI from "@darkforest_eth/contracts/abis/DarkForestTokens.json";

import { DarkForestTokens, DarkForestTokens__factory } from "@darkforest_eth/contracts/typechain";
import { TOKENS_CONTRACT_ADDRESS } from "@darkforest_eth/contracts";

const MARKET_ADDRESS = "0x1e7cb1dbC6DaD80c86e8918382107238fb4562a8";

task("artifacts", "get a player's artifacts")
.addParam("account", "The player's address")
.setAction(getPlayerArtifacts);

async function getPlayerArtifacts(args: { account: string }, hre: HardhatRuntimeEnvironment) {
  const xDaiUrl = 'https://rpc-df.xdaichain.com/';
  const provider = new hre.ethers.providers.JsonRpcProvider(xDaiUrl);
  const token = new hre.ethers.Contract(TOKENS_CONTRACT_ADDRESS, TOKENS_ABI, provider) as DarkForestTokens;
  const balance = await provider.getBalance(args.account);
  console.log(formatEther(balance), `xDai`);
  const artifacts = await token.getPlayerArtifactIds(args.account);
  console.log(artifacts[0])
  const artifact = await token.getArtifact(artifacts[0])
  console.log(artifact.rarity);
  // const asyncRes = await Promise.all(artifacts.map(async (artifact) => {
  //   await token.getArtifact(artifact.toNumber());
  // }));
  
  // console.dir(asyncRes[0]);
}

task("market", "get listed artifacts")
.setAction(getMarketArtifacts);

async function getMarketArtifacts(args: { account: string }, hre: HardhatRuntimeEnvironment) {
  // load market contract address
  const xDaiUrl = 'https://rpc-df.xdaichain.com/';
  const provider = new hre.ethers.providers.JsonRpcProvider(xDaiUrl);
  const tokens = DarkForestTokens__factory.connect(TOKENS_CONTRACT_ADDRESS, provider);
  // const market = Market__factory.connect(MARKET_ADDRESS, provider);
  const marketListings = await tokens.getPlayerArtifactIds(MARKET_ADDRESS);
  console.log(`${marketListings.length} artifacts`);
}

