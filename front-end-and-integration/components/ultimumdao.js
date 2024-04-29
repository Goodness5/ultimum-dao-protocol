import { useState, useEffect } from "react";
import DaoStakingAndNFT from "./daostakingandnft";
import DAOgovernance from "./daogovernance";
import Help from "./help";
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

export default function UltimumDAOSection({theWalletAddress, displayComponent}) {
      //help section
      const [help, setHelp] = useState()
      const [instruction1, setInstruction1] = useState()
      const [instruction2, setInstruction2] = useState()
      const [instruction3, setInstruction3] = useState()
      const [instruction4, setInstruction4] = useState()
      const [instruction5, setInstruction5] = useState()

      //loading state
      const [loading, setLoading] = useState()

      //first require ethers to connect
      const { ethers } = require("ethers"); 

      // lets read data for the DAO section using inbuilt functions and abi related read functions
       const [userETHBalance, setuserETHBalance] = useState()
       const [userULTBalance, setUserULTBalance] = useState()
       const [userNFTBalance, setUserNFTBalance] = useState()
       const [stakedTokenCapital, setStakedTokenCapital] = useState()
       const [showDAO, setShowDAO] = useState(true)

       useEffect(()=>{
        const getTheData = async() => {
          try {
            const ETHbalance = await scrollTestnetRPC.getBalance(theWalletAddress)
            const parseETHbalance = ethers.utils.formatEther(ETHbalance);
            console.log(parseETHbalance)
            setuserETHBalance(parseETHbalance)
            const ULTbalance = await tokenContractReadSettings.balanceOf(theWalletAddress)
            const parseULTbalance = ethers.utils.formatEther(ULTbalance);
            console.log(parseULTbalance)
            setUserULTBalance(parseULTbalance)
            const NFTbalance = await nftContractReadSettings.balanceOf(theWalletAddress)
            console.log(NFTbalance)
            setUserNFTBalance(NFTbalance.toString())
            if (userNFTBalance < 1){
              setShowDAO(false)
            }
            else if (userNFTBalance > 1){
              setShowDAO(true)
            }
            const getStakedTokenDetails = await stakeContractReadSettings.stakeassets(theWalletAddress, tokenContractAddress)
            const tokencapital = (getStakedTokenDetails.capital.toString()) *10 **-18
            setStakedTokenCapital(tokencapital)
          } catch (error) {
            console.log(error)
          }
        }
        getTheData();  
       }, [displayComponent, userETHBalance, userULTBalance, userNFTBalance, stakedTokenCapital, theWalletAddress, showDAO, loading])



    //Now we are going to write to Treasury contract to buy ULT before we mint NFT
    const [ETHamount, setETHamount] = useState()
    const buyULT = async () => {
      setLoading(true)
      const ethereum = (window).ethereum;
      const accounts = await ethereum.request({
           method: "eth_requestAccounts",
       })
        // first account in MetaMask
       const walletAddress = accounts[0]; 
       const provider = new ethers.providers.Web3Provider(ethereum);
       const signer = provider.getSigner(walletAddress);
       const treasuryContractWriteSettings = new ethers.Contract(treasuryContractAddress, treasuryContractABI, signer)
       try {
        const buyult = await treasuryContractWriteSettings.connect(signer).buyTokens({value:ethers.utils.parseUnits(ETHamount, 18)})
       } catch (error) {
        console.log(error)
        setLoading(false)
       }
       finally {
        setLoading(false)
       }
    }

    // consecutive functions to mint nft
    const uri = 'https://ipfs.filebase.io/ipfs/QmbtQv3yoefpiNPsu38FXKstoFF82v1N2bcsQRphqcje4g'
    const [showApproveStakeButton, setshowApproveStakeButton] = useState(true)
    const [showStakeButton, setshowStakeButton] = useState(true)
    const approveStakingContractFromTokenContract = async () => {
      setLoading(true)
      const ethereum = (window).ethereum;
      const accounts = await ethereum.request({
           method: "eth_requestAccounts",
       })
        // first account in MetaMask
       const walletAddress = accounts[0]; 
       const provider = new ethers.providers.Web3Provider(ethereum);
       const signer = provider.getSigner(walletAddress);
       const tokenContractWriteSettings = new ethers.Contract(tokenContractAddress, tokenContractABI, signer)
       try {
        const approveStakeContract = await tokenContractWriteSettings.connect(signer).approve(stakeContractAddress, ethers.utils.parseUnits('1000', 18));
        setshowApproveStakeButton(false)
       } catch (error) {
        console.log(error)
        setLoading(false)
       }
       finally {
        setLoading(false)
       }
    }

    const stakeULTtokensToMint = async () => {
      setLoading(true)
      const ethereum = (window).ethereum;
      const accounts = await ethereum.request({
           method: "eth_requestAccounts",
       })
        // first account in MetaMask
       const walletAddress = accounts[0]; 
       const provider = new ethers.providers.Web3Provider(ethereum);
       const signer = provider.getSigner(walletAddress);
       const stakeContractWriteSettings = new ethers.Contract(stakeContractAddress, stakeContractABI, signer)
       try {
        if(stakedTokenCapital == "0"){const stakeULTtokens = await stakeContractWriteSettings.connect(signer).stake(tokenContractAddress, ethers.utils.parseUnits('1000', 18), "300680000");}
        else {const increaseULTstake = await stakeContractWriteSettings.connect(signer).increaseStake(tokenContractAddress, ethers.utils.parseUnits('1000', 18))}
        setshowStakeButton(false)
       } catch (error) {
        console.log(error)
        setLoading(false)
       }
       finally {
        setLoading(false)
       }
    }

    const mintNFT = async () => {
      setLoading(true)
      const ethereum = (window).ethereum;
      const accounts = await ethereum.request({
           method: "eth_requestAccounts",
       })
        // first account in MetaMask
       const walletAddress = accounts[0]; 
       const provider = new ethers.providers.Web3Provider(ethereum);
       const signer = provider.getSigner(walletAddress);
       const daoContractWriteSettings = new ethers.Contract(daoContractAddress, daoContractABI, signer)
       try {
        const mintnft = await daoContractWriteSettings.connect(signer).mintNft(uri);
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
        <div className="font-[500] bg-[#502] px-[0.4cm] py-[0.15cm] rounded-md mb-[0.2cm]" style={{display:"inline-block", boxShadow:"2px 2px 2px 2px #333"}}>DAO Governance</div>
        <div className="text-[#ccc] text-[90%]">Participate in the governance of Ultimum DAO</div>
        
        {help ? 
        ( <div className='Help bg-[rgba(0,0,0,1)] rounded-xl w-[100%] h-[100%] top-0 left-0 right-0' style={{position:"absolute", zIndex:"9999"}}>
          <div data-aos="zoom-out" className='lg:mx-[20%] md:mx-[10%] mx-[5%]'>
          <img src="images/cancel.png" width="40" className='m-[auto] mt-[10%] cursor-pointer cancelbutton rounded-[100%]' onClick={(e) => setHelp(false)} />
          <Help setHelp={setHelp} instruction1={instruction1} instruction2={instruction2} setInstruction1={setInstruction1} setInstruction2={setInstruction2} instruction3={instruction3} instruction4={instruction4} setInstruction3={setInstruction3} setInstruction4={setInstruction4} instruction5={instruction5} setInstruction5={setInstruction5}/>
         </div>
        </div>) : 
        (<div className="text-right font-[500] mt-[0.5cm]"><span className="cursor-pointer" onClick={(e) => setHelp(true)}>Help <img src="images/add.png" className="ml-[0.2cm]" width="17" style={{display:"inline-block"}} /></span></div>)
        }

          <div>
         {showDAO ?
          (<div className="mt-[0.7cm] bg-[#000] p-[0.5cm] rounded-xl" style={{boxShadow:"2px 2px 2px 2px #333"}}>
            <DAOgovernance daoContractReadSettings={daoContractReadSettings} daoContractAddress={daoContractAddress} daoContractABI={daoContractABI} theWalletAddress={theWalletAddress}/>
          </div>) 
          :
        (<div className="mt-[0.7cm] bg-[#000] p-[0.5cm] rounded-xl" style={{boxShadow:"2px 2px 2px 2px #333"}}>
           <DaoStakingAndNFT theWalletAddress={theWalletAddress} ETHamount={ETHamount} setETHamount={setETHamount} buyULT={buyULT} showApproveStakeButton={showApproveStakeButton} showStakeButton={showStakeButton} approveStakingContractFromTokenContract={approveStakingContractFromTokenContract} stakeULTtokensToMint={stakeULTtokensToMint} mintNFT={mintNFT} userULTBalance={userULTBalance} userNFTBalance={userNFTBalance} userETHBalance={userETHBalance} stakedTokenCapital={stakedTokenCapital} />
        </div>)}
        </div>

    {loading ? 
     (<div className='bg-[rgba(0,0,0,0.8)] text-[#000] text-center w-[100%] h-[100%] top-0 right-0' style={{position:"fixed", zIndex:"9999"}}>
      <div className='loader mx-[auto] lg:mt-[20%] md:mt-[40%] mt-[50%]'></div>
      </div>) : (<span></span>)  
     }

        </div>
    )
}