// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "../lib/openzeppelin-contracts/contracts/token/ERC20/IERC20.sol";
import "../lib/chainlink-brownie-contracts/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
import "../lib/openzeppelin-contracts/contracts/access/Ownable.sol";

contract Swapper is Ownable {
    
    AggregatorV3Interface pricefeedeth;

    struct Tokens {
        AggregatorV3Interface tokenpricefeed;
        uint decimal;
        address tokenaddress;
        string tokenName;
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

    mapping(uint => liquidity) public liquidities;
    mapping(bytes32 => bool) pairExists;
    mapping(address => User) userdata;
    mapping(uint => Tokens) public tokendata;
    uint256 public ethSwapBalance;
    uint256 public tokenIdCounter;
    uint liquidityids;
    uint swapids;
    address public treasury;
    address public UltNft;
    address public UltErc20;
    address public dao;

    constructor(
        address _owner
    ) Ownable(_owner) {
    tokendata[0] = Tokens({
            tokenpricefeed: AggregatorV3Interface(0x59F1ec1f10bD7eD9B938431086bC1D9e233ECf41),
            decimal: 18,
            tokenaddress: address(0),
            tokenName: "eth"
        });
        // DAI
    tokendata[1] = Tokens({
            tokenpricefeed: AggregatorV3Interface(0xb84a700192A78103B2dA2530D99718A2a954cE86 ),
            decimal: 18,
            tokenaddress: 0x1D5cd5833f43C63F724eBb0F28C6AaeD79bF5BF2,
            tokenName: "USDT"
        });
        // USDT
    tokendata[2] = Tokens({
            tokenpricefeed: AggregatorV3Interface(0x9388954B816B2030B003c81A779316394b3f3f11),
            decimal: 18,
            tokenaddress: 0xE9C49311b81545cCed67aB3313C8f4f938ba1920,
            tokenName: "dai"
        });
    }

    modifier validtateToken(uint _tokenid) {
        Tokens storage token = tokendata[_tokenid];
        require(
            token.tokenpricefeed != AggregatorV3Interface(address(0)),
            "Invalid token"
        );
        _;
    }

    modifier onlyDAO() {
        require(msg.sender == dao, "Only DAO can call this function");
        _;
    }

    function setdaoaddress(address _dao) public onlyOwner {
        dao = _dao;
    }

    function getLatestPrice(
        AggregatorV3Interface pricefeed
    )
        internal
        view
        returns (
            uint80 roundID,
            int price,
            uint startedAt,
            uint timeStamp,
            uint80 answeredInRound
        )
    {
        (roundID, price, startedAt, timeStamp, answeredInRound) = pricefeed
            .latestRoundData();
    }

    function _addswaptoken(
        address _aggregatorpricefeed,
        uint _decimal,
        address _tokenaddress,
        string memory _tokenname
    ) internal {
        uint tokenId = tokenIdCounter++;
        tokendata[tokenId] = Tokens({
            tokenpricefeed: AggregatorV3Interface(_aggregatorpricefeed),
            decimal: _decimal,
            tokenaddress: _tokenaddress,
            tokenName: _tokenname
        });
    }
    function addSwappableToken(
        address _aggregatorpricefeed,
        uint _decimal,
        address _tokenaddress,
        string memory _tokenname
    ) public onlyDAO {
        _addswaptoken(_aggregatorpricefeed, _decimal, _tokenaddress, _tokenname);
    }

    function swapTokensForTokens(
        uint _fromTokenId,
        uint _toTokenId,
        uint256 _amountToSwap
    ) external returns (bool) {
        Tokens memory fromToken = tokendata[_fromTokenId];
        Tokens memory toToken = tokendata[_toTokenId];

        require(
            fromToken.tokenpricefeed != AggregatorV3Interface(address(0)),
            "Invalid from token"
        );
        require(
            toToken.tokenpricefeed != AggregatorV3Interface(address(0)),
            "Invalid to token"
        );

        (, int fromPrice, , , ) = getLatestPrice(fromToken.tokenpricefeed);
        (, int toPrice, , , ) = getLatestPrice(toToken.tokenpricefeed);

        uint256 fromPriceInUsd = uint256(fromPrice) * fromToken.decimal;
        uint256 toPriceInUsd = uint256(toPrice) * toToken.decimal;

        uint256 amountToReceive = (_amountToSwap * fromPriceInUsd) /
            toPriceInUsd;

        require(
            IERC20(toToken.tokenaddress).balanceOf(address(this)) >= _amountToSwap,
            "Insufficient liquidity"
        );
            IERC20(fromToken.tokenaddress).transferFrom(msg.sender, address(this), amountToReceive);
            IERC20(toToken.tokenaddress).transfer(msg.sender, amountToReceive);

        // Update user swap data
        swapdata storage newSwap = userdata[msg.sender].userSwapdata[swapids];
        newSwap.from_token = _fromTokenId;
        newSwap.to_token = _toTokenId;
        newSwap.from_amount = _amountToSwap;
        newSwap.to_amount = amountToReceive;
        swapids++;

        return true;
    }

    function swapEthForTokens(uint _tokenId) external payable returns (bool) {
        Tokens memory token = tokendata[_tokenId];

        require(
            token.tokenpricefeed != AggregatorV3Interface(address(0)),
            "Invalid token"
        );

        (, int tokenPrice, , , ) = getLatestPrice(token.tokenpricefeed);

        uint256 tokenPriceInUsd = uint256(tokenPrice) * token.decimal;
        uint256 amountToReceive = (msg.value * 10 ** 18) / tokenPriceInUsd;
        require(IERC20(token.tokenaddress).balanceOf(address(this)) >= amountToReceive, "Insufficient liquidity");
        
            IERC20(token.tokenaddress).transfer(msg.sender, amountToReceive);
        
        tokendata[_tokenId] = token;


        // Update user swap data
        swapdata storage newSwap = userdata[msg.sender].userSwapdata[swapids];
        newSwap.from_token = 0; // ETH token ID is 0
        newSwap.to_token = _tokenId;
        newSwap.from_amount = msg.value;
        newSwap.to_amount = amountToReceive;
        swapids++;

        return true;
    }

    function swapTokensForEth(
        uint _tokenId,
        uint256 _amountToSwap
    ) external returns (bool) {
        Tokens memory token = tokendata[_tokenId];

        require(
            token.tokenpricefeed != AggregatorV3Interface(address(0)),
            "Invalid token"
        );

        (, int tokenPrice, , , ) = getLatestPrice(token.tokenpricefeed);

        uint256 tokenPriceInUsd = uint256(tokenPrice) * token.decimal;
        uint256 amountToReceive = (_amountToSwap * tokenPriceInUsd) / 10 ** 18;
        IERC20(token.tokenaddress).transferFrom(msg.sender, address(this), _amountToSwap);

        require(
            amountToReceive <= address(this).balance,
            "Insufficient liquidity"
        );

        payable(msg.sender).transfer(amountToReceive);

        // Update user swap data
        swapdata storage newSwap = userdata[msg.sender].userSwapdata[swapids];
        newSwap.from_token = _tokenId;
        newSwap.to_token = 0; // ETH token ID is 0
        newSwap.from_amount = _amountToSwap;
        newSwap.to_amount = amountToReceive;
        swapids++;

        return true;
    }

    function addLiquidity(uint _pairId, uint _amount) external payable {
        require(msg.value > 0 || _amount > 0, "Invalid amount");

        // Fetch liquidity details
        liquidity storage pool = liquidities[_pairId];
        require(pool.creator != address(0), "Liquidity pool not found");

        // Transfer tokens from user to contract
        if (pool.token1 != 0) {
            IERC20 token1 = IERC20(tokendata[pool.token1].tokenaddress);
            token1.transferFrom(msg.sender, address(this), _amount);
            pool.token1balance += _amount;
        } else {
            require(msg.value == _amount, "Incorrect ETH amount");
            pool.token1balance += msg.value;
        }

        if (pool.token2 != 0) {
            IERC20 token2 = IERC20(tokendata[pool.token2].tokenaddress);
            token2.transferFrom(msg.sender, address(this), _amount);
            pool.token2balance += _amount;
        } else {
            require(msg.value == _amount, "Incorrect ETH amount");
            pool.token2balance += msg.value;
        }

        bytes32 pairidhash = pool.pairId;
        // Update liquidity data
        liquidities[_pairId] = pool;

        // Update user liquidity data
        userdata[msg.sender].userliquidity[pairidhash] = liquidity({
            creator: pool.creator,
            pairId: pool.pairId,
            token1: pool.token1,
            token2: pool.token2,
            token1balance: _amount,
            token2balance: _amount
        });
    }

    function createliquiditypool(
        uint _token1Id,
        uint _token1_amount,
        uint _token2Id,
        uint _token2_amount
    ) public payable onlyDAO {
        require(
            _token1_amount > 0 && _token2_amount > 0,
            "Invalid token amount"
        );
        require(_token1Id != _token2Id, "Invalid pair");

        // Calculate a unique identifier for the pair
        bytes32 pairId = keccak256(abi.encodePacked(_token1Id, _token2Id));

        // Ensure that the pair doesn't already exist
        require(!pairExists[pairId], "Pair already exists");

        // Transfer tokens from the user to the contract
        if (_token1Id != 0) {
            IERC20(tokendata[_token1Id].tokenaddress).transferFrom(
                msg.sender,
                address(this),
                _token1_amount
            );
        } else {
            require(msg.value == _token1_amount, "Incorrect ETH amount");
        }

        if (_token2Id != 0) {
            IERC20(tokendata[_token2Id].tokenaddress).transferFrom(
                msg.sender,
                address(this),
                _token2_amount
            );
        } else {
            require(msg.value == _token2_amount, "Incorrect ETH amount");
        }

        // Update liquidity balances
        liquidity storage newLiquidity = liquidities[liquidityids];
        newLiquidity.creator = msg.sender;
        newLiquidity.token1 = _token1Id;
        newLiquidity.pairId = pairId;
        newLiquidity.token2 = _token2Id;
        newLiquidity.token1balance = _token1_amount;
        newLiquidity.token2balance = _token2_amount;

        // Update user liquidity data
        userdata[msg.sender].userliquidity[pairId] = newLiquidity;

        // Mark the pair as existing
        pairExists[pairId] = true;
        liquidityids++;
    }

    function getAllLiquidityPairs() external view returns (liquidity[] memory) {
        liquidity[] memory pairs = new liquidity[](liquidityids);

        for (uint i = 0; i < liquidityids; i++) {
            pairs[i] = liquidities[i];
        }

        return pairs;
    }

    receive() external payable{}
    fallback() external payable{}
}
