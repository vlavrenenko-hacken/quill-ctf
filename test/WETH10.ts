import { expect } from "chai";
import { ethers, network } from "hardhat";
import {utils} from "ethers";

describe("CTF Test", function () {
    it("Should hack CTF", async function () {
        const [deployer, bob] = await ethers.getSigners();

        const WETHPuzzle = await ethers.getContractFactory("WETH10");
        const wethPuzzle = await WETHPuzzle.deploy();
        await wethPuzzle.deployed();

        await network.provider.send("hardhat_setBalance", [
            wethPuzzle.address,
            "0x8AC7230489E80000",
          ]);

        await network.provider.send("hardhat_setBalance", [
        bob.address,
        "0xF43FC2C04EE0000",
        ]);

        expect(await ethers.provider.getBalance(wethPuzzle.address)).to.eq(ethers.utils.parseEther("10"));
        expect(await ethers.provider.getBalance(bob.address)).to.eq(ethers.utils.parseEther("1.1"));
        
        const HackerWETH10 = await ethers.getContractFactory("HackerWETH10");
        const hackerWETH10 = await HackerWETH10.connect(bob).deploy(wethPuzzle.address);
        await hackerWETH10.deployed();

        await wethPuzzle.connect(bob).approve(hackerWETH10.address, ethers.constants.MaxUint256);
        await hackerWETH10.connect(bob).hack({value: ethers.utils.parseEther("1")});

        expect(await ethers.provider.getBalance(wethPuzzle.address)).to.eq(ethers.constants.Zero);
        expect(await ethers.provider.getBalance(bob.address)).to.be.greaterThan(ethers.utils.parseEther("10"));
    });
});