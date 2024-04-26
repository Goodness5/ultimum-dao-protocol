// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console} from "../lib/forge-std/src/Test.sol";
import {DAO} from "../src/dao.sol";
import {UltNft} from "../src/nft.sol";
import {StakERC20} from "../src/stake.sol";
import {Swapper} from "../src/swap.sol";
import {Treasury} from "../src/treasury.sol";
import {Ultimum} from "../src/token.sol";
import {P2PLending} from "../src/lending.sol";
import {ITreasury, IStakERC20, IUltNft} from "../src/interfaces.sol";
import {IERC20} from "../lib/openzeppelin-contracts/contracts/token/ERC20/IERC20.sol";
import {IERC721} from "../lib/openzeppelin-contracts/contracts/token/ERC721/IERC721.sol";

contract DAOTest is Test {
   Treasury treasury;
    StakERC20 stakErc20;  
    UltNft ultNft;
    DAO dao;
    P2PLending lending;
    Swapper swap;
    Ultimum erc20;
    address member1 = mkaddr("member1");
    address member2 = mkaddr("member2");
    address owner = mkaddr("owner");

    function setUp() public {
        // Deploy contracts
        ultNft = new UltNft(owner);
        erc20 = new Ultimum(owner);
        treasury = new Treasury(owner, address(erc20));
        stakErc20 = new StakERC20(owner, address(erc20));
       swap = new Swapper(0xE6e2595f5f910c8A6c4cf42267Ca350c6BA8c054);
        // Deploy DAO contract
        dao = new DAO(3, address(treasury), address(ultNft), address(erc20), address(stakErc20), address(swap), address(lending));
        
    }

    function mkaddr(string memory name) public returns (address) {
        address addr = address(
            uint160(uint256(keccak256(abi.encodePacked(name))))
        );
        return addr;
    }

    function testtransfer()public {
         vm.startPrank(owner);
        uint balance =  erc20.balanceOf(owner);
         console.log(balance);
         erc20.transfer(member1, 2000 ether);
         vm.stopPrank();
    }


    function testStake()public{
      testtransfer();
      vm.startPrank(member1);
      erc20.approve(address(stakErc20), 1000 ether);
      stakErc20.stake(address(erc20), 1000 ether, 1 days);

      vm.warp(30 days);
      uint amount = stakErc20.claimReward(address(erc20));
      console.log(amount);
      console.log(erc20.balanceOf(member1));

      stakErc20.stakeassets(member1, address(erc20));
      assert(amount < 1000 ether);
      vm.stopPrank();


    }

    function testMintNft()public{
         testStake();
         vm.startPrank(owner);
         ultNft.transferOwnership(address(dao));
         vm.stopPrank();
         vm.startPrank(member1);
         dao.mintNft("https://ipfs.com/myuri");
         vm.stopPrank();
    }
    function testAddMember() public {
      testMintNft();
      dao.addMember(member1, "superman");
      
      dao.members(member1);
      

    }

    // function testRemoveMember() public {
    //      testAddMember();
    //      vm.startPrank(member1);
    //      dao.createProposal("proposl to remove member1");
    //      dao.vote(0, true);
    //      dao.proposals(0);
    //      dao.removeMember(member1, 0);
    //      dao.members(member1);
    // }

    function testCreateProposal() public {
      testAddMember();
      vm.startPrank(member1);
      dao.createProposal("proposl to add a token to the swap");
      vm.stopPrank();
        
    }

    function testVote() public {
         testCreateProposal();
         vm.startPrank(member1);
         dao.vote(0, true);
         
        
    }

    function testExecuteProposal() public {

        
    }


}
