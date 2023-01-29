import { expect } from "chai";
import { ethers, network } from "hardhat";
import {utils} from "ethers";

describe("Pelusa Test", function () {
    it("Should hack CTF", async function () {
        const [OWNER, HACKER] = await ethers.getSigners();
        const Pelusa = await ethers.getContractFactory("Pelusa");
        const pelusa = await Pelusa.deploy();
        await pelusa.deployed();
        
        const PelusaDeployer = await ethers.getContractFactory("PelusaDeployer");
        const pelusaDeployer = await PelusaDeployer.deploy(pelusa.address);
        await pelusaDeployer.deployed();

        await pelusaDeployer.attack(OWNER.address);
        console.log(await pelusa.goals());
        
    });
});
