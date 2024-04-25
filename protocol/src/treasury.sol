// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "../lib/openzeppelin-contracts/contracts/access/Ownable.sol";
import "../lib/openzeppelin-contracts/contracts/utils/ReentrancyGuard.sol";
import {IDAO} from "./interfaces.sol";
import {IERC20} from "../lib/openzeppelin-contracts/contracts/token/ERC20/IERC20.sol";



contract Treasury is Ownable, ReentrancyGuard {
    address authorized;
    uint amountauthorized;
    address public dao;
    address public tokenAddress; 
    uint256 tokenrevenue;
    uint tokenPrice;
    constructor(address _owner, address _tokenaddress) Ownable(_owner){
        tokenAddress = _tokenaddress;
        tokenPrice = 0.0001 ether;
        
    }
    event Deposit(address indexed sender, uint amount);
    event Withdraw(address indexed recipient, uint amount);
    event TokensPurchased(address indexed buyer, uint256 amountPaid, uint256 amountBought);


modifier auth(uint _amount){
    require(msg.sender==authorized, "unauthorized acess");
    require(IDAO(dao).withdrawal(msg.sender) <= _amount, "amount exceded");
    _;
}
  modifier onlyDAO() {
        require(msg.sender == dao, "Only DAO can call this function");
        _;
    }
    function deposit() external payable {
        emit Deposit(msg.sender, msg.value);
    }

function setdaoaddress(address _dao) public onlyOwner{
    dao = _dao;
}
    function withdraw(address payable _recipient, uint _amount) external auth(_amount) nonReentrant {
        require(_amount <=amountauthorized, "insufficient allowance");
        require(address(this).balance >= _amount, "Insufficient balance");
        _recipient.transfer(_amount);
        amountauthorized -=_amount;
        emit Withdraw(_recipient, _amount);
    }

    function getBalance() external view returns (uint) {
        return address(this).balance;
    }
    function authorize(address _candidate) public onlyDAO {
        authorized = _candidate;
    }

  function buyTokens() public payable {      
        IERC20 token = IERC20(tokenAddress);
        uint _tokenAmount = calculateTokenAmount(msg.value);
        // Transfer tokens to the buyer
        require(token.transfer(msg.sender, _tokenAmount), "Token transfer failed");
        tokenrevenue +=msg.value;
        emit TokensPurchased(msg.sender, msg.value, _tokenAmount);
    }

    function calculateTokenAmount(uint256 ethAmount) public view returns (uint256) {
        
        require(ethAmount > 0, "ETH amount must be greater than zero");

        uint256 tokens = (ethAmount * 1 ether) / tokenPrice; 

        return tokens;
    }
    function setTokenPrice(uint256 _newPrice) public onlyDAO{
        tokenPrice = _newPrice;
    }
}
