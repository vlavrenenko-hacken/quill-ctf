import { expect } from "chai";
import { ethers, network } from "hardhat";
import {utils} from "ethers";

describe("COnfidentialHash Test", function () {
    it("Should hack CTF", async function () {
        const [OWNER] = await ethers.getSigners();
        const ConfidentialHash = await ethers.getContractFactory("Confidential");
        const hash = await ConfidentialHash.deploy();
        await hash.deployed();

        const aliceHash = await ethers.provider.getStorageAt(hash.address, 4);
        const bobHash = await ethers.provider.getStorageAt(hash.address, 8);
        const key = await hash.hash(aliceHash, bobHash);
        console.log(key);
        //await hash.checkthehash(key);

    });
});