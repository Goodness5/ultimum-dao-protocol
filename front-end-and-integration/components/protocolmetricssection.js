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
    usdtContractAddress,
    daiContractAddress,
  } from "@/abiAndContractSettings";
import ETHChart from "./ethchart";

export default function ProtocolMetricsSection({theWalletAddress, displayComponent}) {
          //first require ethers to connect
          const { ethers } = require("ethers"); 

          // lets read data for the Protocol Metrics section using inbuilt functions and abi related read functions
           const [totalTokenSupply, settotalTokenSupply] = useState()
           const [tokenPrice, setTokenPrice] = useState()
           const [stakeableTokens, setstakeableTokens] = useState()
           const [ETHamountInTreasury, setETHamountInTreasury] = useState()
           const [numberOfLoans, setnumberOfLoans] = useState()
           const [maxLoanAmount, setmaxLoanAmount] = useState()
           const [minLoanAmount, setminLoanAmount] = useState()
           const [ETHAmountInSwap, setETHAmountInSwap] = useState()
           const [numberOfDaoMembers, setnumberOfDaoMembers] = useState()
           const [numberOfProposals, setnumberOfProposals] = useState()
    
           useEffect(()=>{
            const getProtocolData = async() => {
              try {
                const getTotalTokenSupply = await tokenContractReadSettings.totalSupply()
                console.log((getTotalTokenSupply * 10**-18).toString())
                settotalTokenSupply((getTotalTokenSupply * 10**-18).toString())
                setTokenPrice(parseFloat(0.001).toFixed(10))
                const stakeableTokensArray = []
                const getStakeableTokens = await stakeContractReadSettings.getStakableTokens()
                const stakeableTokensLength = (getStakeableTokens.length)
                for (let i=0; i < stakeableTokensLength; i++){
                    const eachStakeableToken = getStakeableTokens[i].substring(0, 10) + "..." + getStakeableTokens[i].substring(32, 42) + ", ";
                    stakeableTokensArray.push(eachStakeableToken)
                }
                console.log(stakeableTokensArray)
                setstakeableTokens(stakeableTokensArray)
                const getETHamountInTreasury = await treasuryContractReadSettings.getBalance()
                console.log((getETHamountInTreasury * 10**-18).toString())
                setETHamountInTreasury((parseFloat(getETHamountInTreasury * 10**-18).toFixed(10)).toString())
                const getNumberOfLoans = await lendBorrowContractReadSettings.loanCount()
                console.log(getNumberOfLoans.toString())
                setnumberOfLoans(getNumberOfLoans.toString())
                const getMaxLoanAmount = await lendBorrowContractReadSettings.MAX_LOAN_AMOUNT()
                console.log((getMaxLoanAmount * 10**-18).toString())
                setmaxLoanAmount((getMaxLoanAmount * 10**-18).toString())
                const getMinLoanAmount = await lendBorrowContractReadSettings.MIN_LOAN_AMOUNT()
                console.log((getMinLoanAmount * 10**-18).toString())
                setminLoanAmount((getMinLoanAmount * 10**-18).toString())
                const getETHAmountInSwap = await scrollTestnetRPC.getBalance(swapContractAddress)
                console.log((getETHAmountInSwap * 10**-18).toString())
                setETHAmountInSwap((parseFloat(getETHAmountInSwap * 10**-18).toFixed(10)).toString())
                const getNumberOfDaoMembers = await daoContractReadSettings.memberCount()
                console.log(getNumberOfDaoMembers.toString())
                setnumberOfDaoMembers(getNumberOfDaoMembers.toString())
                const getNumberOfProposals = await daoContractReadSettings.proposalCount()
                console.log(getNumberOfProposals.toString())
                setnumberOfProposals(getNumberOfProposals.toString())
              } catch (error) {
                console.log(error)
              }
            }
            getProtocolData();  
           }, [displayComponent, totalTokenSupply, numberOfLoans, numberOfDaoMembers, numberOfProposals, theWalletAddress, stakeableTokens, ETHamountInTreasury, tokenPrice, ETHAmountInSwap])

    return (
        <div>
        <div className="font-[500] bg-[#502] px-[0.4cm] py-[0.15cm] rounded-md mb-[0.2cm]" style={{display:"inline-block", boxShadow:"2px 2px 2px 2px #333"}}>Protocol Metrics</div>
        <div className="text-[#ccc] text-[90%]">View status of protocol</div>

        <div className="text-center mt-[0.7cm] bg-[#000] p-[0.5cm] rounded-xl" style={{boxShadow:"2px 2px 2px 2px #333"}}>
            <div className="m-[0.4cm]" style={{display:"inline-block"}}>
                <div className="font-[500] text-[110%]">ULT Total Supply</div>
                {totalTokenSupply ? (<div className="text-[#aaa] lg:w-[100%] md:w-[100%] w-[7cm] overflow-auto">{Intl.NumberFormat().format(totalTokenSupply)} ULT</div>) : (<span></span>)}
            </div>
            <div className="m-[0.4cm]" style={{display:"inline-block"}}>
                <div className="font-[500] text-[110%]">ULT Price</div>
                {tokenPrice ? (<div className="text-[#aaa]">≈ ${tokenPrice}</div>) : (<span></span>)}
            </div>
            <div className="text-center m-[0.4cm]" style={{display:"inline-block"}}>
                <div className="font-[500] text-[110%]">Protocol Deployment Blockchain</div>
                <div className="text-[#aaa]">Scroll Sepolia</div>
            </div>
            <div className="text-center m-[0.4cm]" style={{display:"inline-block"}}>
                <div className="font-[500] text-[110%]">Stakeable Tokens (By Contract Address)</div>
                {stakeableTokens ? (<div className="text-[#aaa]">{stakeableTokens}</div>) : (<span></span>)}
            </div>
            <div className="text-center m-[0.4cm]" style={{display:"inline-block"}}>
                <div className="font-[500] text-[110%]">Amount of ETH in Treasury</div>
                {ETHamountInTreasury ? (<div className="text-[#aaa]">{ETHamountInTreasury} ETH</div>) : (<span></span>)}
            </div>
            <div className="text-center m-[0.4cm]" style={{display:"inline-block"}}>
                <div className="font-[500] text-[110%]">Number of Loans</div>
                {numberOfLoans ? (<div className="text-[#aaa]">{Intl.NumberFormat().format(numberOfLoans)}</div>) : (<span></span>)}
            </div>
            <div className="text-center m-[0.4cm]" style={{display:"inline-block"}}>
                <div className="font-[500] text-[110%]">Max Loan Amount</div>
                {maxLoanAmount ? (<div className="text-[#aaa]">{Intl.NumberFormat().format(maxLoanAmount)} ETH</div>) : (<span></span>)}
            </div>
            <div className="text-center m-[0.4cm]" style={{display:"inline-block"}}>
                <div className="font-[500] text-[110%]">Min Loan Amount</div>
                {minLoanAmount ? (<div className="text-[#aaa]">{Intl.NumberFormat().format(minLoanAmount)} ETH</div>) : (<span></span>)}
            </div>
            <div className="text-center m-[0.4cm]" style={{display:"inline-block"}}> 
                <div className="font-[500] text-[110%]">Amount of ETH in Swap</div>
                {ETHAmountInSwap ? (<div className="text-[#aaa]">{ETHAmountInSwap} ETH</div>) : (<span></span>)}
            </div>
            <div className="text-center m-[0.4cm]" style={{display:"inline-block"}}>
                <div className="font-[500] text-[110%]">Number of DAO Members</div>
                {numberOfDaoMembers ? (<div className="text-[#aaa]">{Intl.NumberFormat().format(numberOfDaoMembers)}</div>) : (<span></span>)}
            </div>
            <div className="text-center m-[0.4cm]" style={{display:"inline-block"}}>
                <div className="font-[500] text-[110%]">Number of DAO Proposals</div>
                {numberOfProposals ? (<div className="text-[#aaa]">{Intl.NumberFormat().format(numberOfProposals)}</div>) : (<span></span>)}
            </div>
        </div>

        <div className="mt-[0.5cm] bg-[#000] p-[0.5cm] rounded-xl" style={{boxShadow:"2px 2px 2px 2px #333"}}>
            <div className="grid lg:grid-cols-2 grid-cols-1 gap-4">
            <div className="grid-cols-1">
            <div className="m-[0.4cm]">
             <div className="font-[500] text-[#fff] bg-[#00f] px-[0.4cm] py-[0.1cm] rounded-md mb-[0.2cm]" style={{display:"inline-block"}}>ULT Contract Address</div>
             <div className="text-[#aaa]" style={{overflow:"auto"}}>{tokenContractAddress}</div>
            </div>
            </div>
            <div className="grid-cols-1">
            <div className="m-[0.4cm]">
             <div className="font-[500] text-[#fff] bg-[#00f] px-[0.4cm] py-[0.1cm] rounded-md mb-[0.2cm]" style={{display:"inline-block"}}>DAO Contract Address</div>
             <div className="text-[#aaa]" style={{overflow:"auto"}}>{daoContractAddress}</div>
            </div>
            </div>
            <div className="grid-cols-1">
            <div className="m-[0.4cm]">
             <div className="font-[500] text-[#fff] bg-[#00f] px-[0.4cm] py-[0.1cm] rounded-md mb-[0.2cm]" style={{display:"inline-block"}}>Swap Contract Address</div>
             <div className="text-[#aaa]" style={{overflow:"auto"}}>{swapContractAddress}</div>
            </div>
            </div>
            <div className="grid-cols-1">
            <div className="m-[0.4cm]">
             <div className="font-[500] text-[#fff] bg-[#00f] px-[0.4cm] py-[0.1cm] rounded-md mb-[0.2cm]" style={{display:"inline-block"}}>Stake (Time-frame) Contract Address</div>
             <div className="text-[#aaa]" style={{overflow:"auto"}}>{stakeContractAddress}</div>
            </div>
            </div>
            <div className="grid-cols-1">
            <div className="m-[0.4cm]">
             <div className="font-[500] text-[#fff] bg-[#00f] px-[0.4cm] py-[0.1cm] rounded-md mb-[0.2cm]" style={{display:"inline-block"}}>Lend/Borrow Contract Address</div>
             <div className="text-[#aaa]" style={{overflow:"auto"}}>{lendBorrowContractAddress}</div>
            </div>
            </div>
            <div className="grid-cols-1">
            <div className="m-[0.4cm]">
             <div className="font-[500] text-[#fff] bg-[#00f] px-[0.4cm] py-[0.1cm] rounded-md mb-[0.2cm]" style={{display:"inline-block"}}>Treasury Contract Address</div>
             <div className="text-[#aaa]" style={{overflow:"auto"}}>{treasuryContractAddress}</div>
            </div>
            </div>
            <div className="grid-cols-1">
            <div className="m-[0.4cm]">
             <div className="font-[500] text-[#fff] bg-[#00f] px-[0.4cm] py-[0.1cm] rounded-md mb-[0.2cm]" style={{display:"inline-block"}}>NFT Contract Address</div>
             <div className="text-[#aaa]" style={{overflow:"auto"}}>{nftContractAddress}</div>
            </div>
            </div>
            <div className="grid-cols-1">
            <div className="m-[0.4cm]">
             <div className="font-[500] text-[#fff] bg-[#00f] px-[0.4cm] py-[0.1cm] rounded-md mb-[0.2cm]" style={{display:"inline-block"}}>USDT Contract Address</div>
             <div className="text-[#aaa]" style={{overflow:"auto"}}>{usdtContractAddress}</div>
            </div>
            </div>
            <div className="grid-cols-1">
            <div className="m-[0.4cm]">
             <div className="font-[500] text-[#fff] bg-[#00f] px-[0.4cm] py-[0.1cm] rounded-md mb-[0.2cm]" style={{display:"inline-block"}}>DAI Contract Address</div>
             <div className="text-[#aaa]" style={{overflow:"auto"}}>{daiContractAddress}</div>
            </div>
            </div>
            </div>
        </div>

        <div className="mt-[0.5cm]">
          <ETHChart />
        </div>

        </div>
    )
}