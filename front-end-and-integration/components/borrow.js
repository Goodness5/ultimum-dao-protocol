import { useState, useEffect } from "react";
import LoanSection from "./loan";
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

export default function BorrowSection({theWalletAddress}) {
  
    const [token, setToken] = useState("0")
    const [bal, setBal] = useState()
    const [loanID, setLoanID] = useState()
    const [loading, setLoading] = useState()
    const { ethers } = require("ethers"); 


       const borrowToken = () => {
      // firstly approve for other tokens
      setLoading(true)
      setTimeout(()=> {
          setLoading(false)
      }, 5000)
      }

      const repayBorrowedToken = () => {
        // firstly approve for other tokens
        setLoading(true)
        setTimeout(()=> {
            setLoading(false)
        }, 5000)
        }

      useEffect(()=>{
        const readTokensBal = async() => {
          const getBal = (token)
          setBal(getBal)
        }
        readTokensBal();
    }, [token, setBal])

    const [borrowOption, setBorrowOption] = useState(true)

    const [showLoanSection, setshowLoanSection] = useState(false)

    const [tokenA, setTokenA] = useState("0")
    const [tokenB, setTokenB] = useState("2")
    const [tokenAamount, setTokenAamount] = useState()

     //read current timestamp
     useEffect(()=>{
      const readCurrentTimestamp = async() => {

      }
      readCurrentTimestamp();
     })


    //Now we are going to create the loan
    const [ETHAmountToBorrow, setETHAmountToBorrow] = useState()
    const [interestRate, setInterestRate] = useState()
    const [duration, setDuration] = useState()
    const [collateralAmount, setCollateralAmount] = useState()
    const [collateralAddress, setCollateralAddress] = useState()
    const [isERC20, setIsERC20] = useState(true)
    const createTheLoan = async () => {
      setLoading(true)
      const ethereum = (window).ethereum;
      const accounts = await ethereum.request({
           method: "eth_requestAccounts",
       })
        // first account in MetaMask
       const walletAddress = accounts[0]; 
       const provider = new ethers.providers.Web3Provider(ethereum);
       const signer = provider.getSigner(walletAddress);
       const lendBorrowContractWriteSettings = new ethers.Contract(lendBorrowContractAddress, lendBorrowContractABI, signer)
       const usdtContractWriteSettings = new ethers.Contract(usdtContractAddress, usdtContractABI, signer)
       const daiContractWriteSettings = new ethers.Contract(daiContractAddress, daiContractABI, signer)
       try {
          const blockNumber = await scrollTestnetRPC.getBlockNumber();
          const block = await scrollTestnetRPC.getBlock(blockNumber);
          const currentTimestamp = block.timestamp;
          console.log("Current block timestamp:", currentTimestamp);
          const totalDuration = currentTimestamp + (duration * 3600);
          console.log(totalDuration)
          console.log("fulltimestamp:" + totalDuration + (new Date(totalDuration * 1000).toUTCString()))
          const createLoan = await lendBorrowContractWriteSettings.connect(signer).createLoan(ethers.utils.parseUnits(ETHAmountToBorrow, 18), interestRate, totalDuration, ethers.utils.parseUnits(collateralAmount, 18), collateralAddress, isERC20)
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
        <div className="font-[500] bg-[#502] px-[0.4cm] py-[0.15cm] rounded-md mb-[0.2cm]" style={{display:"inline-block", boxShadow:"2px 2px 2px 2px #333"}}>Borrow</div>
        <div className="text-[#ccc] text-[90%]">Borrow from Ultimum Protocol (P2P)</div>
        
        {borrowOption ?
        (<div className="my-[1cm] bg-[#000] p-[0.5cm] rounded-xl lg:mx-[20%] md:mx-[10%]" style={{boxShadow:"2px 2px 2px 2px #d7b644"}}>
          <div className="mb-[0.5cm] text-center">To borrow ETH, create a loan. Another Ultimum user will fund your loan. (P2P)</div>
        <div className=" bg-[#111] p-[0.5cm] rounded-xl " style={{boxShadow:"2px 2px 2px 2px #d7b644"}}>
        <form>
         <div className='p-[0.5cm] pb-[1cm] bg-[#eee] rounded-md'>
         <div className='text-[#222] font-[500] clear-both'>
          <span className="float-left">Duration (hr)</span>
          <span className='float-right'>ETH amount</span>
         </div>
         <div className='mt-[1.5cm] clear-both font-[500]' style={{display:"block"}}>
         <input style={{display:"inline-block"}} className="w-[30%] float-left text-[120%] bg-[#eee] outline-none text-[#000] placeholder-[#000]" type="number" id="duration" name="duration" onChange={(e) => setDuration(e.target.value)} placeholder='0' />
         <input style={{display:"inline-block"}} className="w-[30%] float-right text-[120%] text-right bg-[#eee] outline-none text-[#000] placeholder-[#000]" type="number" id="ETHAmountToBorrow" name="ETHAmountToBorrow" onChange={(e) => setETHAmountToBorrow(e.target.value)} placeholder='0' />
         </div>
         </div>
        </form>
        </div>
          <div className="mt-[0.5cm]"><img src="images/borrowswitch.png" onClick={(e) => setBorrowOption(false)} className="m-[auto] cursor-pointer switchbutton" width="35" /></div>
          <div className="mt-[0.5cm] bg-[#111] p-[0.5cm] rounded-xl " style={{boxShadow:"2px 2px 2px 2px #d7b644"}}>
          <div className='p-[0.5cm] pb-[1cm] bg-[#eee] rounded-md'>
         <div>
          <label className="text-[#000] bg-[#d7b644] rounded-md px-[0.3cm] py-[0.2cm]" style={{boxShadow:"2px 2px 2px 2px #000"}}>Collateral</label> <br />
          <input style={{borderBottom:"2px solid #000"}} className="mt-[0.3cm] w-[100%] px-[0.2cm] py-[0.2cm] bg-[rgba(0,0,0,0)] rounded-md outline-none text-[#000] placeholder-[#333]" type="text" id="collateralAddress" name="collateralAddress" onChange={(e) => setCollateralAddress(e.target.value)} placeholder='Input contract address' />
         </div>
         <div className="mt-[1cm]">
          <label className="text-[#000] bg-[#d7b644] rounded-md px-[0.3cm] py-[0.2cm]" style={{boxShadow:"2px 2px 2px 2px #000"}}>Collateral amount</label> <br />
          <input style={{borderBottom:"2px solid #000"}} className="mt-[0.3cm] w-[100%] px-[0.2cm] py-[0.2cm] bg-[rgba(0,0,0,0)] rounded-md outline-none text-[#000] placeholder-[#333]" type="number" id="collateralAmount" name="collateralAmount" onChange={(e) => setCollateralAmount(e.target.value)} placeholder='Input collateral amount' />
         </div>
         <div className="mt-[1cm]">
          <label className="text-[#000] bg-[#d7b644] rounded-md px-[0.3cm] py-[0.2cm]" style={{boxShadow:"2px 2px 2px 2px #000"}}>Is collateral ERC20?</label> <br />
          <div className="px-[0.3cm] text-[#000]">
          <div className="mt-[0.8cm]"><input type="radio" id="true" name="isERC20" value="true" onChange={(e) => setIsERC20(e.target.value)} /><span className="ml-[0.3cm]">yes</span></div>
          <div className="mt-[0.3cm]" ><input type="radio"id="false" name="isERC20" value="false" onChange={(e) => setIsERC20(e.target.value)} /><span className="ml-[0.3cm]">no</span></div>
          </div>
         </div>
         <div className="mt-[1cm]">
          <label className="text-[#000] bg-[#d7b644] rounded-md px-[0.3cm] py-[0.2cm]" style={{boxShadow:"2px 2px 2px 2px #000"}}>Interest rate (%)</label> <br />
          <input style={{borderBottom:"2px solid #000"}} className="mt-[0.3cm] w-[100%] px-[0.2cm] py-[0.2cm] bg-[rgba(0,0,0,0)] rounded-md outline-none text-[#000] placeholder-[#333]" type="number" id="interestRate" name="interestRate" onChange={(e) => setInterestRate(e.target.value)} placeholder='Input interest rate e.g 5%' />
         </div>
         </div> 
         </div>
        <button type="submit" className='text-center py-[0.3cm] bg-[#502] font-[500] text-[#fff] w-[100%] mt-[0.5cm] rounded-md generalbutton cursor-pointer' onClick={(e) => {e.preventDefault();createTheLoan(duration, ETHAmountToBorrow, collateralAddress, collateralAmount, isERC20, interestRate)}}>Create Loan</button>
        </div>) :
        (<div className="my-[1cm] bg-[#000] p-[0.5cm] rounded-xl lg:mx-[20%] md:mx-[10%]" style={{boxShadow:"2px 2px 2px 2px #d7b644"}}>
        <div className=" bg-[#111] p-[0.5cm] rounded-xl " style={{boxShadow:"2px 2px 2px 2px #333"}}>
        <form>
         <div className='p-[0.5cm] pb-[1cm] bg-[#eee] rounded-md'>
         <div className='text-[#222] font-[500] clear-both'>
          <select className="float-left outline-none bg-[#502] text-[#fff] p-[0.1cm]" onChange={(e) => setToken(e.target.value)}>
            <option value="0">USDT</option>
            <option value="1">ULT</option>
            <option value="2">ETH</option>
            <option value="3">DAI</option>
          </select>
          <span className='float-right'>Loan ID</span>
         </div>
         <div className='mt-[1.5cm] clear-both font-[500]'>
         <span className='text-[#000] float-left'>Bal: ≈ {parseFloat(193.021676543).toFixed(2)}</span>
         <input style={{display:"inline-block"}} className="w-[30%] float-right text-[120%] text-right bg-[#eee] outline-none text-[#000] placeholder-[#000]" type="text" id="loanID" name="loanID" onChange={(e) => setLoanID(e.target.value)} placeholder='0' />
         </div>
         </div>
        </form>
        </div>
         <div className="mt-[0.5cm]"><img src="images/borrow.png" onClick={(e) => setBorrowOption(true)} className="m-[auto] cursor-pointer switchbutton2" width="35" /></div>
         <button type="submit" className='text-center py-[0.3cm] bg-[#009] font-[500] text-[#fff] w-[100%] mt-[0.5cm] rounded-md generalbutton3 cursor-pointer' onClick={(e) => {e.preventDefault();repayBorrowedToken(token, loanID)}}>Repay Borrowed Amount</button>
         </div>
        )
        }

    {loading ? 
     (<div className='bg-[rgba(0,0,0,0.8)] text-[#000] text-center w-[100%] h-[100%] top-0 right-0' style={{position:"fixed", zIndex:"9999"}}>
      <div className='loader mx-[auto] lg:mt-[20%] md:mt-[40%] mt-[50%]'></div>
      </div>) : (<span></span>)  
     }

        </div>
    )
}