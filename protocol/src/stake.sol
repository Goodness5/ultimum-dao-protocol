// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;
import {IERC20} from "../lib/openzeppelin-contracts/contracts/token/ERC20/IERC20.sol";
import "../lib/openzeppelin-contracts/contracts/access/Ownable.sol";

contract StakERC20 is Ownable {
    IERC20[] public stakableTokens;
    

    uint256 constant SECONDS_PER_YEAR = 31536000;
    uint256 constant PENALTY_RATE = 10;
    address dao;
    address public treasury;

    struct User {
        uint256 rewardAccrued;
        IERC20[] assets;
    }

    struct stakes {
        address asset;
        uint capital;
        uint reward_accured;
        uint256 startTime;
        uint256 duration;

    }

    mapping(address => mapping(address =>stakes)) public stakeassets;
    mapping(address => User) public user;
    error tryAgain();

    constructor(address _owner, address _ult) Ownable(_owner) {
        stakableTokens.push(IERC20(_ult));
        stakableTokens.push(IERC20(0x1D5cd5833f43C63F724eBb0F28C6AaeD79bF5BF2));  // mock usdt
        stakableTokens.push(IERC20(0xE9C49311b81545cCed67aB3313C8f4f938ba1920)); // mock dai
    
    }


function getStakableTokens() view public returns(IERC20 [] memory){
    return stakableTokens;
}
    function setdaoaddress(address _dao) public onlyOwner{
    dao = _dao;
}
    function setTreasuryaddress(address _treas) public onlyOwner{
    treasury = _treas;
}

       modifier isStakable(address token) {
            require(_isStakable(token)==true, "token not stakable");
            _;
    }

      modifier onlyDAO() {
        require(msg.sender == dao, "Only DAO can call this function");
        _;
    }

// function setStakeToken(address _token)
//     external onlyDAO
//     returns  (address _newToken)
// {
//     require(_isStakable(_token) == false, "token already stakable");
//     require(_token != address(0), "cannot set address zero");

//     _newToken = address(_token);
//     stakableTokens.push(IERC20(_token));
// }


    function _isStakable(address token) internal view returns (bool) {
        for (uint256 i = 0; i < stakableTokens.length; i++) {
            if (address(stakableTokens[i]) == token) {
                return true;
            }
        }
        return false;
    }

function hasToken(address token, User storage _user) internal view returns (bool) {
    for (uint256 i = 0; i < _user.assets.length; i++) {
        if (address(_user.assets[i]) == token) {
            return true;
        }
    }
    return false;
}

function stake(address token, uint256 amount, uint _duration) external isStakable(token) {
    User storage _user = user[msg.sender];
    stakes storage _stakes = stakeassets[msg.sender][token];
    require(token != address(0), "address zero unstakabble");
    require(!hasToken(token, _user), "User already has this token among their assets");

    // IERC20(token).approve(address(this), amount);
    IERC20(token).transferFrom(msg.sender, address(this), amount);

    if(amount > 0) {
        _stakes.asset = token;
        _stakes.capital += amount;
        _stakes.reward_accured = 0;
        _stakes.startTime = block.timestamp;
        _stakes.duration = _duration;
    }
    _user.assets.push(IERC20(token));
}

function increaseStake(address token, uint256 amount) external isStakable(token) {
    User storage _user = user[msg.sender];
    stakes storage _stakes = stakeassets[msg.sender][token];
    require(token != address(0), "address zero unstakabble");
    require(hasToken(token, _user), "User doesn't have this token staked");

    IERC20(token).approve(address(this), amount);
    IERC20(token).transferFrom(msg.sender, address(this), amount);

    _stakes.capital += amount;
}

 

    function addStakableToken(address token) public onlyDAO {
        require(!_isStakable(token), "Token already stakable");
        require(token != address(0), "cannot add address zero");

        stakableTokens.push(IERC20(token));
    }

 function removeStakableToken(address token) external onlyDAO {
    require(_isStakable(token), "Token not stakable");
    for (uint256 i = 0; i < stakableTokens.length; i++) {
        if (address(stakableTokens[i]) == token) {
            if (i != stakableTokens.length - 1) {
                stakableTokens[i] = stakableTokens[stakableTokens.length - 1];
            }
            stakableTokens.pop();
            return;
        }
    }
}



function calcReward(address token) public returns (uint256 _reward) {
    stakes storage _stakes = stakeassets[msg.sender][token];
    uint256 _amount = _stakes.capital;
    uint256 _startTime = _stakes.startTime;
    uint256 duration = block.timestamp - _startTime;
    uint256 daysStaked = duration / (1 days); // Number of days staked
    uint256 dailyStakeIncrease = (_amount * 1) / 30; // Calculate YEILD of staked amount
    uint256 totalStakeIncrease = dailyStakeIncrease * daysStaked; // Total increase over the duration
    _stakes.reward_accured = totalStakeIncrease;
    _reward =totalStakeIncrease;
}

function claimReward(address _token) public returns(uint reward) {
    stakes storage _stakes = stakeassets[msg.sender][_token];
    User storage _user = user[msg.sender];
    require(hasToken(_token, _user), "reward not available");

    reward = _stakes.reward_accured;
    // Check if stake duration has passed

    reward = updateReward(_token);
    
    if(_stakes.duration + _stakes.startTime > block.timestamp) {
        // Calculate penalty
        uint256 penalty = _stakes.reward_accured * PENALTY_RATE / 100;
        require(IERC20(_token).transfer(treasury, penalty), "penalty transfer failed");
        _stakes.reward_accured -= penalty;
        reward -=penalty;
    }

    
    IERC20(_token).transfer(msg.sender, reward);
    _stakes.reward_accured = 0;
    _stakes.startTime = block.timestamp;
}


    function updateReward(address _token) internal returns (uint _reward) {
        stakes storage _stakes = stakeassets[msg.sender][_token];
        _reward = calcReward(_token);
        _stakes.reward_accured = _reward;
        
    }

function unstake(address _token) public {
    User storage _user = user[msg.sender];
    stakes storage _stakes = stakeassets[msg.sender][_token];
    uint256 staked = _stakes.capital + _stakes.reward_accured;
    require(staked > 0, "no staked amount");

    updateReward(_token);

    // Calculate total amount to transfer to msg.sender (staked amount + reward)
    uint256 totalAmount = staked;

    // Deduct 10% to keep
    uint256 servicefee = totalAmount * 5 / 100;
    totalAmount -= servicefee;

    delete stakeassets[msg.sender][_token];
    removeAsset(_user, _token);

    // Transfer total amount to msg.sender
    require(IERC20(_token).transfer(msg.sender, totalAmount), "transfer failed");
}


function removeAsset(User storage _user, address _token) internal {
    for (uint256 i = 0; i < _user.assets.length; i++) {
        if (address(_user.assets[i]) == _token) {
            // Shift the array elements to remove the token
            if (i != _user.assets.length - 1) {
                _user.assets[i] = _user.assets[_user.assets.length - 1];
            }
            _user.assets.pop();
            return;
        }
    }
}
    function userInfo(address _user) external view returns (User memory) {
        return user[_user];
    }
}