// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";
import {DAO} from "../src/dao.sol";
import {UltNft} from "../src/nft.sol";
import {P2PLending} from "../src/lending.sol";
import {StakERC20} from "../src/stake.sol";
import {Swapper} from "../src/swap.sol";
import {Treasury} from "../src/treasury.sol";
import {Ultimum} from "../src/token.sol";
contract Deployscript is Script {
   Treasury treasury;
    StakERC20 stakErc20;  
    UltNft ultNft;
    Swapper swap;
    DAO dao;
    Ultimum erc20;
    P2PLending lending;


    function run() public {
        uint256 key = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(key);
        ultNft = new UltNft(0xE6e2595f5f910c8A6c4cf42267Ca350c6BA8c054);
        erc20 = new Ultimum(0xE6e2595f5f910c8A6c4cf42267Ca350c6BA8c054);
        treasury = new Treasury(0xE6e2595f5f910c8A6c4cf42267Ca350c6BA8c054, address(erc20));
        stakErc20 = new StakERC20(0xE6e2595f5f910c8A6c4cf42267Ca350c6BA8c054, address(erc20));
        lending = new P2PLending(0xE6e2595f5f910c8A6c4cf42267Ca350c6BA8c054, address(treasury), address(erc20), 0x1D5cd5833f43C63F724eBb0F28C6AaeD79bF5BF2, 0xE9C49311b81545cCed67aB3313C8f4f938ba1920);
        swap = new Swapper(0xE6e2595f5f910c8A6c4cf42267Ca350c6BA8c054);
        // Deploy DAO contract
        dao = new DAO(3, address(treasury), address(ultNft), address(erc20), address(stakErc20), address(swap), address(lending));
        
    }




}