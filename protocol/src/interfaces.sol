// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import {IERC20} from "../lib/openzeppelin-contracts/contracts/token/ERC20/IERC20.sol";

interface ITreasury {
    event Deposit(address indexed sender, uint amount);
    event Withdraw(address indexed recipient, uint amount);

    function deposit() external payable;
    function authorize(address ) external;
    function setTokenPrice(uint256 _newPrice) external;
    function withdraw(address payable _recipient, uint _amount) external;
    function getBalance() external view returns (uint);
}

interface IDAO {
    event ProposalCreated(uint indexed id, string description);
    event Voted(uint indexed proposalId, address indexed voter, bool vote);
    event ProposalExecuted(uint indexed proposalId);
    event ProposalRemoved(address indexed creator, uint indexed id);

    struct Proposal {
        uint id;
        string description;
        uint forVotes;
        uint time_created;
        uint againstVotes;
        bool executed;
        bool status;
        address creator;
    }

    struct Member {
        address useraddr;
        string _username;
        uint256 _noOfVotes;
        bool status;
    }

    function addMember(address _member, string memory _username) external;
    function removeMember(address _member, uint _id) external;
    function createProposal(string memory _description) external;
    function removeProposal(uint _id) external;
    function vote(uint _proposalId, bool _vote) external;
    function isProposalPassed(uint _id) external view returns (bool);
    function closeProposal(uint _id) external;
    function executeProposal(uint _proposalid) external;
    function approveWithdrawal(uint _proposalid, address _candidate, uint _amount) external;
    function getBalance() external view returns (uint);

    function proposalCount() external view returns (uint256);
    function memberCount() external view returns (uint256);
    function quorum() external view returns (uint);
    function treasury() external view returns (address);
    function UltToken() external view returns (address);
    function members(address) external view returns (address, string memory, uint256, bool);
    function proposals(uint) external view returns (uint, string memory, uint, uint, uint, bool, bool, address);
    function voted(address, uint) external view returns (bool);
    function withdrawal(address) external view returns (uint);
}

interface IUltNft {
    // ERC721 functions
    function balanceOf(address owner) external view returns (uint256);
    function ownerOf(uint256 tokenId) external view returns (address);
    function approve(address to, uint256 tokenId) external;
    function getApproved(uint256 tokenId) external view returns (address);
    function setApprovalForAll(address operator, bool approved) external;
    function isApprovedForAll(address owner, address operator) external view returns (bool);
    function transferFrom(address from, address to, uint256 tokenId) external;
    function safeTransferFrom(address from, address to, uint256 tokenId) external;
    function safeTransferFrom(address from, address to, uint256 tokenId, bytes calldata data) external;
    function tokenURI(uint256 tokenId) external view returns (string memory);

    // SoulBoundToken specific functions
    function safeMint(address to, string memory tokenURI) external;
    function burn(uint256 tokenId) external;
}


interface IStakERC20 {
    function stake(address token, uint256 amount) external;
    function increaseStake(address token, uint256 amount) external;
    function addStakableToken(address token) external;
    function removeStakableToken(address token) external;
    function calcReward(address token) external view returns (uint256);
    function claimReward(address token) external;
    function unstake(address token) external;
    function userInfo(address user) external view returns (User memory);
    function getStakableTokens() external view returns (IERC20[] memory);
    function getDao() external view returns (address);
    function stakeassets(address user, address token) external view returns (stakes memory);
    function user(address user) external view returns (User memory);
    struct User {
        uint256 rewardAccrued;
        IERC20[] assets;
    }

    struct stakes {
        address asset;
        uint256 capital;
        uint256 reward_accured;
        uint256 startTime;
    }
}

import {AggregatorV3Interface} from "../lib/chainlink-brownie-contracts/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

interface ISwapper {
    struct Tokens {
        AggregatorV3Interface tokenpricefeed;
        uint256 swapbalance;
        uint decimal;
        address tokenaddress;
    }

    struct swapdata {
        uint from_token;
        uint to_token;
        uint from_amount;
        uint to_amount;
    }

    struct User {
        address user;
        mapping(bytes32 => liquidity) userliquidity;
        mapping(uint => swapdata) userSwapdata;
    }

    struct liquidity {
        address creator;
        bytes32 pairId;
        uint token1;
        uint token2;
        uint token1balance;
        uint token2balance;
    }

    function addSwappableToken(
        address _aggregatorpricefeed,
        uint _decimal,
        address _tokenaddress
    ) external;

    function swapTokensForTokens(
        uint _fromTokenId,
        uint _toTokenId,
        uint256 _amountToSwap
    ) external returns (bool);

    function swapEthForTokens(uint _tokenId) external payable returns (bool);

    function swapTokensForEth(
        uint _tokenId,
        uint256 _amountToSwap
    ) external returns (bool);

    function addLiquidity(
        uint _pairId,
        uint _amount
    ) external payable;

    function createliquiditypool(
        uint _token1Id,
        uint _token1_amount,
        uint _token2Id,
        uint _token2_amount
    ) external payable;

    function getAllLiquidityPairs() external view returns (liquidity[] memory);
}
