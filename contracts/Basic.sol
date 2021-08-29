// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.4;

contract Basic {
  mapping (uint256 => uint256) public lookup;

  constructor () {
    lookup[0] = 1;
  }

}