import { expect } from "chai";
import { ethers, network } from "hardhat";
import {utils} from "ethers";

describe("SafeNFT Test", function () {
    it("Should hack CTF", async function () {
        const [OWNER, HACKER] = await ethers.getSigners();
        const SafeNFT = await ethers.getContractFactory("safeNFT");
        const safeNFT = await SafeNFT.deploy("SafeNFT", "SFT", 100);
        await safeNFT.deployed();

        await safeNFT.buyNFT({value:ethers.BigNumber.from("100")});

        await safeNFT.claim();

    });
});