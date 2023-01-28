import { expect } from "chai";
import { ethers } from "hardhat";
import {utils} from "ethers";

describe("VIP_BANK Test", function () {
    it("Should hack CTF", async function () {
        const [OWNER, ATTACKER] = await ethers.getSigners();
        const VIP_BANK = await ethers.getContractFactory("VIP_Bank");
        const vipBank = await VIP_BANK.deploy();
        await vipBank.deployed();

        const Kamikaze = await ethers.getContractFactory("Kamikaze");
        const kamikaze = await Kamikaze.connect(ATTACKER).deploy({value: utils.parseEther("1")});
        await kamikaze.deployed();

        await kamikaze.hack(vipBank.address);
    });
});