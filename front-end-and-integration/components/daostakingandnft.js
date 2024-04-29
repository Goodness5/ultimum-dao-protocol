import { useState, useEffect } from "react";
export default function DaoStakingAndNFT ({stakedTokenCapital, ETHamount, setETHamount, buyULT, showApproveStakeButton, showStakeButton, approveStakingContractFromTokenContract, stakeULTtokensToMint, mintNFT, userULTBalance, userNFTBalance, userETHBalance}) {
    return (
       <div>
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-4">
        <div className="grid-cols-1 bg-[#111] p-[0.5cm] rounded-xl" style={{boxShadow:"2px 2px 2px 2px #333"}}>
         <div className='mb-[1cm] text-center lg:font-[500]'>To become a member of the Ultimum DAO, first buy 2,000 ULT and stake 1,000 ULT to be able to mint the Ultimum NFT which gives you access to the DAO.</div>
         <form>
         <div className='p-[0.5cm] pb-[1cm] bg-[#eee] rounded-md'>
         <div className='text-[#222] font-[500] clear-both'><span className="float-left">ULT bal</span><span className='float-right'>ETH amount</span></div>
         <div className='mt-[1.5cm] clear-both font-[500]'>
         <span className='text-[#000] w-[70%] overflow-auto float-left'>{userULTBalance ? (<span>≈ {Intl.NumberFormat().format(userULTBalance)}</span>) : (<span></span>)}</span>
         <input style={{display:"inline-block"}} className="w-[30%] float-right text-[120%] text-right bg-[#eee] outline-none text-[#000] placeholder-[#000]" type="text" id="ETHamount" name="ETHamount" onChange={(e) => setETHamount(e.target.value)} placeholder='0' />
         </div>
         </div>
         <button type="submit" className='text-center py-[0.3cm] bg-[#502] font-[500] text-[#fff] w-[100%] mt-[0.5cm] rounded-md generalbutton cursor-pointer' onClick={(e) => {e.preventDefault();buyULT(ETHamount)}}>Buy ULT with ETH</button>
         {userETHBalance == 0 && (<div className='text-center my-[0.5cm] lg:font-[500]'>You don't have enough ETH for gas fees! <span><img src="images/disappointment.png" width="20" className='ml-[0.2cm]' style={{display:"inline-block"}} /></span></div>)}
         {userULTBalance >= 1000 && (<div className='text-center my-[0.5cm] lg:font-[500]'>You already have enough ULT to stake. Please proceed to mint NFT! <span><img src="images/happy.png" width="20" className='ml-[0.2cm]' style={{display:"inline-block"}} /></span></div>)}
         </form>
        </div>
        <div className="grid-cols-1 bg-[#005] p-[0.5cm] rounded-xl" style={{boxShadow:"2px 2px 2px 2px #333"}}>
         <div className='mb-[1cm] text-center lg:font-[500]'>Approve and stake 1,000 ULT to mint Ultimum NFT. Only Ultimum NFT and at least 1,000 ULT holders can join DAO.</div>
         <form>
         <div className='p-[0.5cm] pb-[1cm] bg-[#eee] rounded-md'>
         <div className='text-[#222] font-[500] clear-both'><span className="float-left">Required ULT</span><span className='float-right'>NFTs</span></div>
         <div className='mt-[1.5cm] clear-both font-[500]'>
         <span className='text-[#000] overflow-auto float-left'>1,000</span>
         {userNFTBalance ? (<span className="float-right text-[120%] bg-[#eee] outline-none text-[#000] placeholder-[#000]">{userNFTBalance}</span>) : (<span></span>)}
         </div>
         </div>
         {showApproveStakeButton && (<button type="submit" className='text-center py-[0.3cm] bg-[#111] font-[500] text-[#fff] w-[100%] mt-[0.5cm] rounded-md generalbutton4 cursor-pointer' onClick={(e) => {e.preventDefault();approveStakingContractFromTokenContract()}}>Approve</button>)}
         {showStakeButton && (<button type="submit" className='text-center py-[0.3cm] bg-[#000] font-[500] text-[#fff] w-[100%] mt-[0.5cm] rounded-md generalbutton4 cursor-pointer' onClick={(e) => {e.preventDefault();stakeULTtokensToMint()}}>Stake ULT</button>)}
         <button type="submit" className='text-center py-[0.3cm] bg-[#502] font-[500] text-[#fff] w-[100%] mt-[0.5cm] rounded-md generalbutton cursor-pointer' onClick={(e) => {e.preventDefault();mintNFT()}}>Mint Ultimum NFT</button>
         {stakedTokenCapital < 1000  && (<div className='text-center my-[0.5cm] lg:font-[500]'>You don't have enough staked ULT to mint NFT! <span><img src="images/disappointment.png" width="20" className='ml-[0.2cm]' style={{display:"inline-block"}} /></span></div>)}
         </form>
        </div>
        </div>
       </div>
    )
}