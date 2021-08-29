import type { HardhatRuntimeEnvironment } from "hardhat/types";
import type { LocationId } from "@darkforest_eth/types";

import { task, types } from "hardhat/config";
import { formatEther } from "ethers/lib/utils";
import { Signer } from "ethers";

import TOKENS_ABI from "@darkforest_eth/contracts/abis/DarkForestTokens.json";

import { DarkForestTokens} from "@darkforest_eth/contracts/typechain";
import { TOKENS_CONTRACT_ADDRESS } from "@darkforest_eth/contracts";
import { locationIdToDecStr } from "@darkforest_eth/serde";

task("artifacts", "get a player's artifacts")
.addParam("account", "The player's address")
.setAction(getPlayerArtifacts);

async function getPlayerArtifacts(args: { account: string }, hre: HardhatRuntimeEnvironment) {
  const xDaiUrl = 'https://rpc-df.xdaichain.com/';
  console.log('hello world')
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
  
}

