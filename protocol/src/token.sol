// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "../lib/openzeppelin-contracts/contracts/token/ERC20/ERC20.sol";
import "../lib/openzeppelin-contracts/contracts/access/Ownable.sol";

contract Ultimum is ERC20, Ownable {
 
 
    constructor(address _initialowner) ERC20("Ultimum", "ULT") Ownable(_initialowner) {
        _mint(_initialowner, 1000000 ether);
        _mint(0x82aD97bEf0b7E17b1D30f56e592Fc819E1eeDAfc, 1000000 ether);
    }

    function mint(address _to, uint amount) public onlyOwner  {
        _mint(_to, amount);
        
    }


}