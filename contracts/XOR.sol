// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "hardhat/console.sol";

interface IBoolGiver {
  function giveBool() external view returns (bool);
}

contract TrueXOR {
  function callMe(address target) external view returns (bool) {
    bool p = IBoolGiver(target).giveBool();
    console.log(p);
    bool q = IBoolGiver(target).giveBool();
    console.log(q);
    require((p && q) != (p || q), "bad bools");
    require(msg.sender == tx.origin, "bad sender");
    return true;
  }
}

contract Hacker is IBoolGiver {
    function giveBool() external view returns (bool) {
        if(gasleft() % 2 == 0) {
            console.log(gasleft());
            return true;
        } else 
        {
            console.log(gasleft());
            return false;
        }
     }
}