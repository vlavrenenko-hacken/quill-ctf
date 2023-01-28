import { expect } from "chai";
import { ethers, network } from "hardhat";
import {utils} from "ethers";

describe("XOR Test", function () {
    it("Should hack CTF", async function () {
        const [OWNER] = await ethers.getSigners();
        const Hacker = await ethers.getContractFactory("Hacker");
        const hacker = await Hacker.deploy();
        await hacker.deployed();

        const TRUEXOR = await ethers.getContractFactory("TrueXOR");
        const trueXOR = await TRUEXOR.deploy();
        await trueXOR.deployed();

        await trueXOR.callMe(hacker.address);
    });
});