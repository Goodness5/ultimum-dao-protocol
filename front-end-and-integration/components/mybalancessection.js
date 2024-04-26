import { useState, useEffect } from "react";
import { daoContractReadSettings,
    tokenContractReadSettings,
    treasuryContractReadSettings,
    swapContractReadSettings,
    nftContractReadSettings,
    stakeContractReadSettings,
    lendBorrowContractReadSettings,
    scrollTestnetRPC,
    nftContractAddress,
    nftContractABI,
    daoContractAddress,
    daoContractABI,
    stakeContractABI,
    stakeContractAddress,
    tokenContractAddress,
    tokenContractABI,
    treasuryContractABI,
    treasuryContractAddress,
    swapContractABI,
    swapContractAddress,
    lendBorrowContractABI,
    lendBorrowContractAddress,
  } from "@/abiAndContractSettings";
    export default function MyBalancesSection({displayComponent, setDisplayComponent, changeBg3, changeBg4, changeBg5, theWalletAddress}) {
              //first require ethers to connect
              const { ethers } = require("ethers"); 

              // lets read data for the Protocol Metrics section using inbuilt functions and abi related read functions
               const [ultBalance, setultBalance] = useState()
               const [tokenPrice, setTokenPrice] = useState()
               const [totalStakingReward, settotalStakingReward] = useState()
               const [stakedTokensWithAmount, setstakedTokensWithAmount] = useState([])
               const [userLastActiveTime, setuserLastActiveTime] = useState()
               const [userETHBalance, setuserETHBalance] = useState()
   
               useEffect(()=>{
                const getUserData = async() => {
                  try {
                    const getULTbalance = await tokenContractReadSettings.balanceOf(theWalletAddress)
                    console.log((getULTbalance * 10**-18).toString())
                    setultBalance((getULTbalance * 10**-18).toString())
                    setTokenPrice(parseFloat(0.0001).toFixed(10))
                    const ETHbalance = await scrollTestnetRPC.getBalance(theWalletAddress)
                    const parseETHbalance = ethers.utils.formatEther(ETHbalance);
                    console.log(parseETHbalance)
                    setuserETHBalance(parseFloat(parseETHbalance).toFixed(10))
                    const getTotalStakingReward = await stakeContractReadSettings.user(theWalletAddress)
                    console.log(getTotalStakingReward.toString())
                    settotalStakingReward(getTotalStakingReward.toString())
                    const collectStakeData = []
                    const getStakedTokensAndAmount = await stakeContractReadSettings.userInfo(theWalletAddress)
                    const getStakedTokensAndAmountArrayLength = getStakedTokensAndAmount.length
                    for (let i=0; i < getStakedTokensAndAmountArrayLength; i++){
                        const showStakedTokensAndAmount = getStakedTokensAndAmount.assets[i] + " "
                        if (getStakedTokensAndAmount.assets[i] != undefined){collectStakeData.push(showStakedTokensAndAmount)}
                    }
                    console.log(collectStakeData)
                    setstakedTokensWithAmount(collectStakeData)
                    const memberDetails = await daoContractReadSettings.members(theWalletAddress)
                    const lastActiveTimeEpoch = memberDetails.lastactivetime.toString()
                    const lastActiveTime = new Date(memberDetails.lastactivetime * 1000).toUTCString()
                    if (lastActiveTimeEpoch != 0){setuserLastActiveTime(lastActiveTime)}
                  } catch (error) {
                    console.log(error)
                  }
                }
                getUserData();  
               }, [theWalletAddress, displayComponent, ultBalance, tokenPrice, totalStakingReward, stakedTokensWithAmount, userLastActiveTime, userETHBalance])
    
    return (
        <div>
        <div className="font-[500] bg-[#502] px-[0.4cm] py-[0.15cm] rounded-md mb-[0.2cm]" style={{display:"inline-block", boxShadow:"2px 2px 2px 2px #333"}}>My Balances</div>
        <div className="text-[#ccc] text-[90%]">Manage all your assets on Ultimum Protocol</div>
        <div className="text-center mt-[0.4cm]">
            <div className="m-[0.4cm]" style={{display:"inline-block"}}>
                <div className="font-[500] text-[110%]">ULT Balance</div>
                {ultBalance ? (<div className="text-[#aaa]">{Intl.NumberFormat().format(ultBalance)} ULT</div>) : (<span></span>)}
            </div>
            <div className="m-[0.4cm]" style={{display:"inline-block"}}>
                <div className="font-[500] text-[110%]">ULT Price</div>
                {tokenPrice ? (<div className="text-[#aaa]">≈ ${tokenPrice}</div>) : (<span></span>)}
            </div>
            <div className="m-[0.4cm]" style={{display:"inline-block"}}>
                <div className="font-[500] text-[110%]">ETH Balance</div>
                {userETHBalance ? (<div className="text-[#aaa]">{userETHBalance} ETH</div>) : (<span></span>)}
            </div>
            <div className="text-center m-[0.4cm]" style={{display:"inline-block"}}>
                <div className="font-[500] text-[110%]">Staked Tokens Contracts</div>
                {stakedTokensWithAmount ? (<div className="text-[#aaa] lg:w-[100%] md:w-[100%] w-[7cm] overflow-auto">{stakedTokensWithAmount}</div>) : (<span></span>)}
            </div>
            <div className="text-center m-[0.4cm]" style={{display:"inline-block"}}>
                <div className="font-[500] text-[110%]">Total Staking Reward</div>
                {totalStakingReward ? (<div className="text-[#aaa]">{Intl.NumberFormat().format(totalStakingReward)} ULT</div>) : (<span></span>)}
            </div>
            <div className="text-center m-[0.4cm]" style={{display:"inline-block"}}>
                <div className="font-[500] text-[110%]">Last active time on DAO</div>
                {userLastActiveTime ? (<div className="text-[#aaa]">{userLastActiveTime}</div>) : (<span></span>)}
            </div>
        </div>
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 mt-[1cm]">
            <div className="grid-cols-1 bg-[#000] p-[0.5cm] rounded-xl" style={{boxShadow:"2px 2px 2px 2px #333"}}>
                <div className="font-[500] text-[#fff] bg-[#502] px-[0.4cm] py-[0.1cm] rounded-md mb-[0.2cm]" style={{display:"inline-block"}}>$ULT</div>
               <div className="text-[#ccc] font-[500] underline">What is ULT?</div>
               <div className="text-[#aaa] text-[90%]">
                ULT is the native token of the Ultimum Protocol. ULT is given as rewards for staking and lending. ULT is also used to reward members of the Ultimum DAO for 
                participating in governance. ULT shall also be used to reward community members in potential airdrops organised by the protocol in the future.
                ULT is backed by the Ultimum treasury. 
               </div>
               <button onClick={(e) => setDisplayComponent("daogovernance") & changeBg3(e)} className="text-center px-[0.4cm] py-[0.2cm] bg-[#502] w-[100%] mt-[0.3cm] generalbutton text-[#fff] rounded-md">Buy ULT</button>
            </div>
            <div className="grid-cols-1 bg-[#000] p-[0.5cm] rounded-xl" style={{boxShadow:"2px 2px 2px 2px #333"}}>
                <div className="font-[500] text-[#fff] bg-[#502] px-[0.4cm] py-[0.1cm] rounded-md mb-[0.2cm]" style={{display:"inline-block"}}>Stake (Time-frame)</div>
                <div className="text-[#ccc] font-[500] underline">What is time-framing?</div>
                <div className="text-[#aaa] text-[90%]">
                    The Ultimum Protocol utilizes a modern technology known as the time-framing method of staking with huge APY. It's a never-before-seen technology only available on the Ultimum 
                    Protocol. Time-framing offers a more flexible approach to staking as users can stake available tokens at their own chosen duration and get rewarded instantly. 
                    Users can stake and unstake at any time. It's best to unstake after the chosen duration to be fully rewarded. Unstaking before the chosen duration incurs a penalty.
                </div>
                <button onClick={(e) => setDisplayComponent("stake") & changeBg5(e)} className="text-center px-[0.4cm] py-[0.2cm] bg-[#502] w-[100%] mt-[0.3cm] generalbutton text-[#fff] rounded-md">Stake Tokens</button>
            </div>
            <div className="grid-cols-1 lg:col-span-2 bg-[#000] p-[0.5cm] rounded-xl" style={{boxShadow:"2px 2px 2px 2px #333"}}>
                <div className="font-[500] text-[#fff] bg-[#502] px-[0.4cm] py-[0.1cm] rounded-md mb-[0.2cm]" style={{display:"inline-block"}}>Swap</div>
                <div className="text-[#ccc] font-[500] underline">What is swapping?</div>
                <div className="text-[#aaa] text-[90%]">
                With a ChainLink Oracle integration and user-first approach, our users experience decentralized finance and can therefore use the Ultimum Protocol swap 
                dApp to swap a variety of supported tokens with low gas fees (100x lower than Ethereum). Our swap dApp is designed to provide the best user experience and interface to our users. 
                Ensure you have set network to the Scroll Sepolia network on your wallet and enjoy a seamsless swap experience.
                </div>
                <button onClick={(e) => setDisplayComponent("swaptokens") & changeBg4(e)} className="text-center px-[0.4cm] py-[0.2cm] bg-[#502] w-[100%] mt-[0.3cm] generalbutton text-[#fff] rounded-md">Swap Now</button>
            </div>
        </div>
        </div>
    )
}