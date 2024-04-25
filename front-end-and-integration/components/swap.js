import { useState, useEffect } from "react";
import LivePriceTable from "./livepricetable";
import { daoContractReadSettings,
  tokenContractReadSettings,
  treasuryContractReadSettings,
  swapContractReadSettings,
  nftContractReadSettings,
  stakeContractReadSettings,
  lendBorrowContractReadSettings,
  usdtContractReadSettings,
  daiContractReadSettings,
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
  usdtContractABI,
  daiContractAddress,
  daiContractABI,
} from "@/abiAndContractSettings";

export default function SwapSection({theWalletAddress}) {
          const [loading, setLoading] = useState()
          //first require ethers to connect
          const { ethers } = require("ethers"); 

          // lets read data for the Swap section using inbuilt functions and abi related read functions
           const [userETHBalance, setUserETHBalance] = useState()
           const [userUSDTBalance, setUserUSDTBalance] = useState()
           const [userDAIBalance, setUserDAIBalance] = useState()
    
           useEffect(()=>{
            const getTheData = async() => {
              try {
                const ETHbalance = await scrollTestnetRPC.getBalance(theWalletAddress)
                const parseETHbalance = parseFloat(ethers.utils.formatEther(ETHbalance)).toFixed(5);
                console.log(parseETHbalance.toString())
                setUserETHBalance(parseETHbalance.toString())
                const blockNumber = await scrollTestnetRPC.getBlockNumber();
                const block = await scrollTestnetRPC.getBlock(blockNumber);
                console.log("Current block timestamp:", block.timestamp);
                const USDTbalance = await usdtContractReadSettings.balanceOf(theWalletAddress)
                const parseUSDTbalance = parseFloat(ethers.utils.formatEther(USDTbalance)).toFixed(5);
                console.log(parseUSDTbalance.toString())
                setUserUSDTBalance(parseUSDTbalance.toString())
                const DAIbalance = await daiContractReadSettings.balanceOf(theWalletAddress)
                const parseDAIbalance = parseFloat(ethers.utils.formatEther(DAIbalance)).toFixed(5);
                console.log(parseDAIbalance.toString())
                setUserDAIBalance(parseDAIbalance.toString())
              } catch (error) {
                console.log(error)
              }
            }
            getTheData();  
           }, [userETHBalance, userUSDTBalance, userDAIBalance, theWalletAddress, loading])

   
        const [tokenA, setTokenA] = useState("0")
        const [tokenB, setTokenB] = useState("2")
        const [tokenAamount, setTokenAamount] = useState()
        //Now we are going to write the Swap logic
        const SwapTokens = async () => {
          setLoading(true)
          const ethereum = (window).ethereum;
          const accounts = await ethereum.request({
               method: "eth_requestAccounts",
           })
            // first account in MetaMask
           const walletAddress = accounts[0]; 
           const provider = new ethers.providers.Web3Provider(ethereum);
           const signer = provider.getSigner(walletAddress);
           const swapContractWriteSettings = new ethers.Contract(swapContractAddress, swapContractABI, signer)
           const usdtContractWriteSettings = new ethers.Contract(usdtContractAddress, usdtContractABI, signer)
           const daiContractWriteSettings = new ethers.Contract(daiContractAddress, daiContractABI, signer)
           try {
            if (tokenA == "0" && tokenB != "0"){const swapETHForTokens = await swapContractWriteSettings.connect(signer).swapEthForTokens(tokenB, {value:ethers.utils.parseUnits(tokenAamount, 18)})}
            else if (tokenA == "1" && tokenB == "0"){
              const swapUSDTforETH = await swapContractWriteSettings.connect(signer).swapTokensForEth(tokenA, ethers.utils.parseUnits(tokenAamount, 18))
            }
            else if (tokenA == "2" && tokenB == "0"){
              const swapDAIforETH = await swapContractWriteSettings.connect(signer).swapTokensForEth(tokenA, ethers.utils.parseUnits(tokenAamount, 18))
            }
            else if (tokenA == "1" && tokenB == "2"){
              const swapUSDTforDAI = await swapContractWriteSettings.connect(signer).swapTokensForTokens(tokenA, tokenB, ethers.utils.parseUnits(tokenAamount, 18))
            }
            else if (tokenA == "2" && tokenB == "1"){
              const swapDAIforUSDT = await swapContractWriteSettings.connect(signer).swapTokensForTokens(tokenA, tokenB, ethers.utils.parseUnits(tokenAamount, 18))
            }
          } catch (error) {
            console.log(error)
            setLoading(false)
           }
           finally {
            setLoading(false)
           }
        }

        //But we will first approve for tokens other than ETH
        const approveTokens = async () => {
          setLoading(true)
          const ethereum = (window).ethereum;
          const accounts = await ethereum.request({
               method: "eth_requestAccounts",
           })
            // first account in MetaMask
           const walletAddress = accounts[0]; 
           const provider = new ethers.providers.Web3Provider(ethereum);
           const signer = provider.getSigner(walletAddress);
           const swapContractWriteSettings = new ethers.Contract(swapContractAddress, swapContractABI, signer)
           const usdtContractWriteSettings = new ethers.Contract(usdtContractAddress, usdtContractABI, signer)
           const daiContractWriteSettings = new ethers.Contract(daiContractAddress, daiContractABI, signer)
           try {
            if (tokenA == "1" && tokenB == "0"){
              const approveSwapToSpendUSDT = await usdtContractWriteSettings.connect(signer).approve(swapContractAddress, ethers.utils.parseUnits(tokenAamount, 18))
            }
            else if (tokenA == "2" && tokenB == "0"){
              const approveSwapToSpendDAI = await daiContractWriteSettings.connect(signer).approve(swapContractAddress, ethers.utils.parseUnits(tokenAamount, 18))
            }
            else if (tokenA == "1" && tokenB == "2"){
              const approveSwapToSpendUSDT = await usdtContractWriteSettings.connect(signer).approve(swapContractAddress, ethers.utils.parseUnits(tokenAamount, 18))
            }
            else if (tokenA == "2" && tokenB == "1"){
              const approveSwapToSpendDAI = await daiContractWriteSettings.connect(signer).approve(swapContractAddress, ethers.utils.parseUnits(tokenAamount, 18))
            }
          } catch (error) {
            console.log(error)
            setLoading(false)
           }
           finally {
            setLoading(false)
           }
        }
      
    return (
        <div>
        <div className="font-[500] bg-[#502] px-[0.4cm] py-[0.15cm] rounded-md mb-[0.2cm]" style={{display:"inline-block", boxShadow:"2px 2px 2px 2px #333"}}>Swap Tokens</div>
        <div className="text-[#ccc] text-[90%]">Convert your favorite tokens using the Ultimum Swap</div>
      
        <div className="mt-[0.7cm] bg-[#000] p-[0.5cm] rounded-xl" style={{boxShadow:"2px 2px 2px 2px #333"}}>
        <div>
        <form>
        <div className="swapdiv bg-[#111] p-[0.5cm] rounded-xl " style={{boxShadow:"2px 2px 2px 2px #333"}}>
         <div className='p-[0.5cm] pb-[1cm] bg-[#eee] rounded-md'>
         <div className='text-[#222] font-[500] clear-both'>
          <select className="float-left outline-none bg-[#502] text-[#fff] p-[0.1cm]" onChange={(e) => setTokenA(e.target.value)}>
            <option value="0">ETH</option>
            <option value="1">USDT</option>
            <option value="2">DAI</option>
          </select>
          <span className='float-right'>Token amount</span>
         </div>
         <div className='mt-[1.5cm] clear-both font-[500]'>
         <span className='text-[#000] float-left'>Bal: ≈ {tokenA == "0" && (<span>{userETHBalance}</span>)} {tokenA == "1" && (<span>{userUSDTBalance}</span>)} {tokenA == "2" && (<span>{userDAIBalance}</span>)}</span>
         <input style={{display:"inline-block"}} className="w-[30%] float-right text-[120%] text-right bg-[#eee] outline-none text-[#000] placeholder-[#000]" type="text" id="tokenAamount" name="tokenAamount" onChange={(e) => setTokenAamount(e.target.value)} placeholder='0' />
         </div>
         </div>
        </div>
          <div className="switchdiv"><img src="images/swap.png" className="m-[auto] switchimage" width="30" /></div>
        <div className="swapdiv bg-[#111] p-[0.5cm] rounded-xl" style={{boxShadow:"2px 2px 2px 2px #333"}}>
         <div className='p-[0.5cm] pb-[1cm] bg-[#eee] rounded-md'>
         <div className='text-[#222] font-[500] clear-both'>
         <select className="float-left outline-none bg-[#502] text-[#fff] p-[0.1cm]" onChange={(e) => setTokenB(e.target.value)}>
            <option value="2">DAI</option>
            <option value="1">USDT</option>
            <option value="0">ETH</option>
          </select>
          <span className='float-right'>Scroll</span>
         </div>
         <div className='mt-[1.5cm] clear-both font-[500]'>
         <span className='text-[#000] float-left'>Bal: ≈ {tokenB == "0" && (<span>{userETHBalance}</span>)} {tokenB == "1" && (<span>{userUSDTBalance}</span>)} {tokenB == "2" && (<span>{userDAIBalance}</span>)}</span>
         </div>
         </div>
        </div>
        {tokenA != 0 ? (<button type="submit" className='text-center py-[0.3cm] bg-[#002] font-[500] text-[#fff] w-[100%] mt-[0.5cm] rounded-md generalbutton4 cursor-pointer' onClick={(e) => {e.preventDefault();approveTokens(tokenA, tokenAamount, tokenB)}}>Approve Swap</button>) : (<span></span>)}
        <button type="submit" className='text-center py-[0.3cm] bg-[#502] font-[500] text-[#fff] w-[100%] mt-[0.5cm] rounded-md generalbutton cursor-pointer' onClick={(e) => {e.preventDefault();SwapTokens(tokenA, tokenAamount, tokenB)}}>Swap Tokens</button>
        </form>
        </div>
        </div>

    {loading ? 
     (<div className='bg-[rgba(0,0,0,0.8)] text-[#000] text-center w-[100%] h-[100%] top-0 right-0' style={{position:"fixed", zIndex:"9999"}}>
      <div className='loader mx-[auto] lg:mt-[20%] md:mt-[40%] mt-[50%]'></div>
      </div>) : (<span></span>)  
     }
        
        </div>
    )
}