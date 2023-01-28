import { expect } from "chai";
import { ethers, network } from "hardhat";
import {utils} from "ethers";

describe("Dt31eg4t3 Test", function () {
    it("Should hack CTF", async function () {
        const [OWNER, HACKER] = await ethers.getSigners();
        const Dt31eg4t3 = await ethers.getContractFactory("D31eg4t3");
        const dt31eg4t3 = await Dt31eg4t3.deploy();
        await dt31eg4t3.deployed();

        const HackerD31eg4t3 = await ethers.getContractFactory("HackerD31eg4t3");
        const hackerD31eg4t3 = await HackerD31eg4t3.deploy();
        await hackerD31eg4t3.deployed();
        await hackerD31eg4t3.hack(dt31eg4t3.address);
        console.log(await dt31eg4t3.canYouHackMe(hackerD31eg4t3.address));
    });
});