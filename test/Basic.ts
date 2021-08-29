// We import Chai to use its asserting functions here.
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";
import { expect } from "chai";
import { ethers } from "hardhat";
import { Basic, Basic__factory } from '../typechain';

describe("Basic ", function () {
  let owner: SignerWithAddress;
  let basic: Basic;

  beforeEach(async function () {
    [owner] = await ethers.getSigners();
    const basicFactory = (await ethers.getContractFactory(
      "Basic",
      owner
    )) as unknown as Basic__factory;
    basic = await basicFactory.deploy();
    await basic.deployed();
  });

  it('looks up 0', async function () {
    expect(await basic.lookup(0)).to.equal(1);
  });

}); 