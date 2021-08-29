import("@nomiclabs/hardhat-waffle");
import type { HardhatRuntimeEnvironment } from "hardhat/types";


// The next line is part of the sample project, you don't need it in your
// project. It imports a Hardhat task definition, that can be used for
// testing the frontend.
// require("./tasks/faucet");
import '@typechain/hardhat'
import '@nomiclabs/hardhat-ethers'
import '@nomiclabs/hardhat-waffle'
import "./tasks/contract";

export default {
  solidity: "0.8.4"
};

