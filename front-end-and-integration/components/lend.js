import { useState, useEffect } from "react";
import LoanSection from "./viewloans";
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

export default function LendSection({theWalletAddress}) {
    const [loading, setLoading] = useState()
    const { ethers } = require("ethers"); 

 // let's read data for the Lending section using inbuilt functions and abi related read functions
 const [token, setToken] = useState("ETH")
 const [userETHBalance, setuserETHBalance] = useState()
 const [userULTBalance, setUserULTBalance] = useState()
 const [userUSDTBalance, setUserUSDTBalance] = useState()
 const [userDAIBalance, setUserDAIBalance] = useState()

 useEffect(()=>{
  const getTheData = async() => {
    try {
      const ETHbalance = await scrollTestnetRPC.getBalance(theWalletAddress)
      const parseETHbalance = ethers.utils.formatEther(ETHbalance);
      console.log(parseETHbalance)
      setuserETHBalance(parseFloat(parseETHbalance).toFixed(5))
      const ULTbalance = await tokenContractReadSettings.balanceOf(theWalletAddress)
      const parseULTbalance = parseFloat(ethers.utils.formatEther(ULTbalance)).toFixed(5);
      console.log(parseULTbalance.toString())
      setUserULTBalance(parseULTbalance.toString())
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
 }, [userETHBalance, userULTBalance, userUSDTBalance, userDAIBalance, loading])


      //Now let us lend to user by funding the loan
       const [loanID, setLoanID] = useState()
       const [loanAmount, setLoanAmount] = useState()
       const lendToken = async () => {
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
         try {
            const lendtoken = await lendBorrowContractWriteSettings.connect(signer).fundLoan(loanID, {value:ethers.utils.parseUnits(loanAmount, 18)})
        } catch (error) {
          console.log(error)
          setLoading(false)
         }
         finally {
          setLoading(false)
         }
      }

      //this is for user to claim collateral if a borrower fails to pay back loan
        const claimCollateral = async () => {
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
         try {
            const claimcollateral = await lendBorrowContractWriteSettings.connect(signer).claimCollateral(loanID)
        } catch (error) {
          console.log(error)
          setLoading(false)
         }
         finally {
          setLoading(false)
         }
      }

    const [showLoanSection, setshowLoanSection] = useState(false)
      
    return (
        <div>
        <div className="font-[500] bg-[#502] px-[0.4cm] py-[0.15cm] rounded-md mb-[0.2cm]" style={{display:"inline-block", boxShadow:"2px 2px 2px 2px #333"}}>Lend</div>
        <div className="text-[#ccc] text-[90%]">Lend to Ultimum Protocol to enjoy huge rewards (P2P)</div>
        {showLoanSection === false && (<div className="text-right font-[500] mt-[0.5cm]"><span className="cursor-pointer" onClick={(e) => setshowLoanSection(true)}>View available loans <img src="images/loan.png" className="ml-[0.2cm]" width="30" style={{display:"inline-block"}} /></span></div>)}

        {!showLoanSection ? (<div className="my-[1cm] bg-[#000] p-[0.5cm] rounded-xl lg:mx-[20%] md:mx-[10%]" style={{boxShadow:"2px 2px 2px 2px #fff"}}>
        <div className="mb-[0.5cm] text-center">To lend, view available loans and fund a loan. (P2P)</div>
        <div className=" bg-[#111] p-[0.5cm] rounded-xl " style={{boxShadow:"2px 2px 2px 2px #fff"}}>
        <form>
         <div className='p-[0.5cm] pb-[1cm] bg-[#eee] rounded-md'>
         <div className='text-[#222] font-[500] clear-both'>
         <span className="float-left text-[#000]">Loan ETH Amount</span>
          <span className='float-right'>Loan ID</span>
         </div>
         <div className='mt-[1.5cm] clear-both font-[500]'>
         <input style={{display:"inline-block"}} className="w-[30%] float-left text-[120%] bg-[#eee] outline-none text-[#000] placeholder-[#000]" type="text" id="loanAmount" name="loanAmount" onChange={(e) => setLoanAmount(e.target.value)} placeholder='0' />
         <input style={{display:"inline-block"}} className="w-[30%] float-right text-[120%] text-right bg-[#eee] outline-none text-[#000] placeholder-[#000]" type="text" id="loanID" name="loanID" onChange={(e) => setLoanID(e.target.value)} placeholder='0' />
         </div>
         </div>
        </form>
        </div>
        <button type="submit" className='text-center py-[0.3cm] bg-[#502] font-[500] text-[#fff] w-[100%] mt-[0.5cm] rounded-md generalbutton cursor-pointer' onClick={(e) => {e.preventDefault();lendToken(loanID)}}>Fund Loan</button>
        <div className="mt-[0.5cm] text-center">OR</div>
        <div className=" bg-[#111] p-[0.5cm] rounded-xl mt-[0.5cm]" style={{boxShadow:"2px 2px 2px 2px #fff"}}>
        <form>
         <div className='p-[0.5cm] pb-[1cm] bg-[#eee] rounded-md'>
         <div className='text-[#222] font-[500] clear-both'>
         <span className="float-left text-[#000]">Collateral</span>
          <span className='float-right'>Loan ID</span>
         </div>
         <div className='mt-[1.5cm] clear-both font-[500]'>
         <span className="float-left text-[#000]">Only lender</span>
         <input style={{display:"inline-block"}} className="w-[30%] float-right text-[120%] text-right bg-[#eee] outline-none text-[#000] placeholder-[#000]" type="text" id="loanID" name="loanID" onChange={(e) => setLoanID(e.target.value)} placeholder='0' />
         </div>
         </div>
        </form>
        </div>
        <button type="submit" className='text-center py-[0.3cm] bg-[#222] font-[500] text-[#fff] w-[100%] mt-[0.5cm] rounded-md generalbutton4 cursor-pointer' onClick={(e) => {e.preventDefault();claimCollateral(loanID)}}>Claim Collateral</button>
        <div className="text-[90%] mt-[0.3cm]">You can only claim collateral if your borrower fails to pay within the specified duration of a loan!</div>
        </div>)
           :
        (<LoanSection loading={loading} setLoading={setLoading} showLoanSection={showLoanSection} setshowLoanSection={setshowLoanSection} theWalletAddress={theWalletAddress} lendToken={lendToken} loanID={loanID} setLoanID={setLoanID} loanAmount={loanAmount} setLoanAmount={setLoanAmount} />)}

    {loading ? 
     (<div className='bg-[rgba(0,0,0,0.8)] text-[#000] text-center w-[100%] h-[100%] top-0 right-0 rounded-xl' style={{position:"fixed", zIndex:"9999"}}>
      <div className='loader mx-[auto] lg:mt-[10%] md:mt-[30%] mt-[40%]'></div>
      </div>) : (<span></span>)  
     }
     
        </div>
    )
}