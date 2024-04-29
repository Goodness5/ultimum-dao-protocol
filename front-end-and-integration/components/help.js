import Head from 'next/head';
import { useState, useEffect, useRef } from "react";
import Link from 'next/link';

export default function Help({setHelp, instruction1, instruction2, instruction3, instruction4, instruction5, setInstruction1, setInstruction2, setInstruction3, setInstruction4, setInstruction5}) {
 
    return (
        <div className='mt-[1cm] bg-[#fff]' style={{border:"3px solid #502"}}>
        <div className='text-center bg-[#111] p-[0.3cm] text-[110%] font-[500]'>What you need to know about the Ultimum DAO <img src="images/dao.png" width="30" className='ml-[0.3cm]' style={{display:"inline-block"}} /></div>
        <div className='text-[#fff] p-[0.5cm] helpinnerdiv'>
         <div className='mb-[0.5cm]'>
         {instruction1 ? 
         (<div className='pb-[0.5cm]' style={{borderBottom:"2px ridge #502"}}>
         <div onClick={(e) => setInstruction1(false)} className='lg:text-[110%] md:text-[110%] font-[500] cursor-pointer'><img src="images/dot.png" width="20" className='mr-[0.2cm]' style={{display:"inline-block"}} /><span>The Ultimum DAO</span><img src="images/crossed.png" width="25" className='float-right' style={{display:"inline-block"}} /></div>
         <div data-aos="fade-down" className='text-[#eee] ml-[1cm] mt-[0.3cm] text-[90%]'>
         Using the DAO as a powerful tool, Ultimum protocol users are able to engage in governance and that includes but not limited to decision making, 
         creation of proposals, view proposal details and voting activities to steer the ecosystem forward. This democratic approach ensures transparency and decentralisation
          in the protocol. The DAO decides tokens used in the Swap, Staking and Lend and Borrow dApps. 
         </div>
         </div>) :
         (<div onClick={(e) => setInstruction1(true)} className='lg:text-[110%] md:text-[110%] font-[500] cursor-pointer'><img src="images/dot.png" width="20" className='mr-[0.2cm]' style={{display:"inline-block"}} /><span>The Ultimum DAO</span><img src="images/add.png" width="20" className='float-right' style={{display:"inline-block"}} /></div>)
         }
         </div>
         <div className='mb-[0.5cm]'>
         {instruction2 ? 
         (<div className='pb-[0.5cm]' style={{borderBottom:"2px ridge #502"}}>
         <div onClick={(e) => setInstruction2(false)} className='lg:text-[110%] md:text-[110%] font-[500] cursor-pointer'><img src="images/dot.png" width="20" className='mr-[0.2cm]' style={{display:"inline-block"}} /><span>Join DAO</span><img src="images/crossed.png" width="25" className='float-right' style={{display:"inline-block"}} /></div>
         <div data-aos="fade-down" className='text-[#eee] ml-[1cm] mt-[0.3cm] text-[90%]'>
          To join the DAO, firstly, a user has to obtain at least 2,000 ULT tokens and stake 1,000 ULT to obtain the Ultimum Soulbound NFT which is sent to your wallet automatically.
          The NFT gives you access to the DAO. Only Ultimum NFT and at least 1,000 ULT holders can join DAO. For non-members, the process of obtaining the NFT is the page you will see in the DAO section. After obtaining the NFT, 
          the system automatically redirects you to the governance of the DAO. On the Join DAO tab, you will be required to register a username, then you can click on the "Click to Join DAO" 
          button. Your wallet address will be associated with your chosen username. The Join DAO tab will disappear after your registration is successful.
         </div>
         </div>) :
         (<div onClick={(e) => setInstruction2(true)} className='lg:text-[110%] md:text-[110%] font-[500] cursor-pointer'><img src="images/dot.png" width="20" className='mr-[0.2cm]' style={{display:"inline-block"}} /><span>Join DAO</span><img src="images/add.png" width="20" className='float-right' style={{display:"inline-block"}} /></div>)
         }
         </div>
         <div className='mb-[0.5cm]'>
         {instruction3 ? 
         (<div className='pb-[0.5cm]' style={{borderBottom:"2px ridge #502"}}>
         <div onClick={(e) => setInstruction3(false)} className='lg:text-[110%] md:text-[110%] font-[500] cursor-pointer'><img src="images/dot.png" width="20" className='mr-[0.2cm]' style={{display:"inline-block"}} /><span>View Proposals</span><img src="images/crossed.png" width="25" className='float-right' style={{display:"inline-block"}} /></div>
         <div data-aos="fade-down" className='text-[#eee] ml-[1cm] mt-[0.3cm] text-[90%]'>
          This is the part of the DAO where all proposals made in the DAO are being displayed for all members to see and vote for. A proposal can be anything ranging from decisions 
          in the DAO, tokens to add to any of the dApps (Swap, Staking, Lend, Borrow) and which service should be added/removed from the protocol. Only the DAO decides which token to add to any of the dApps.
          The View Proposals section shows the proposal description, the proposer, ID of proposal, number of upvotes, number of downvotes and a "Close Proposal" button which is only visible to 
          the proposer of a particular proposal. Typically, a proposal runs for at least 7 days and can only be closed after 7 days by the proposer (the proposal can be left open for as long
          as the proposer wants). The system uses the difference in upvotes and downvotes to determine if a proposal will be approved by the community. Obviously, higher number of upvotes 
          means a proposal will be approved. For a seamless user experience, a search functionality and pagination have been integrated into the view proposals section.
         </div>
         </div>) :
         (<div onClick={(e) => setInstruction3(true)} className='lg:text-[110%] md:text-[110%] font-[500] cursor-pointer'><img src="images/dot.png" width="20" className='mr-[0.2cm]' style={{display:"inline-block"}} /><span>View Proposals</span><img src="images/add.png" width="20" className='float-right' style={{display:"inline-block"}} /></div>)
         }
         </div>
         <div className='mb-[0.5cm]'>
         {instruction4 ? 
         (<div className='pb-[0.5cm]' style={{borderBottom:"2px ridge #502"}}>
         <div onClick={(e) => setInstruction4(false)} className='lg:text-[110%] md:text-[110%] font-[500] cursor-pointer'><img src="images/dot.png" width="20" className='mr-[0.2cm]' style={{display:"inline-block"}} /><span>Create a Proposal</span><img src="images/crossed.png" width="25" className='float-right' style={{display:"inline-block"}} /></div>
         <div data-aos="fade-down" className='text-[#eee] ml-[1cm] mt-[0.3cm] text-[90%]'>
         Creation of proposals requires you to input a proposal description. Clearly describe your proposal for all members to understand. A proposal can be anything ranging from decisions 
         in the DAO, tokens to add to any of the dApps (Swap, Staking, Lend, Borrow) and which service should be added/removed from the protocol. Then click on the "Click to Create a Proposal" button to 
         submit your proposal. The system automatically associates your proposal with your wallet address, and as such, you are the only one with the right to close that proposal. 
         </div>
         </div>) : 
         (<div onClick={(e) => setInstruction4(true)} className='lg:text-[110%] md:text-[110%] font-[500] cursor-pointer'><img src="images/dot.png" width="20" className='mr-[0.2cm]' style={{display:"inline-block"}} /><span>Create a Proposal</span><img src="images/add.png" width="20" className='float-right' style={{display:"inline-block"}} /></div>)
         }
         </div>
         <div className='mb-[0.5cm]'>
         {instruction5 ? 
         (<div className='pb-[0.5cm]' style={{borderBottom:"2px ridge #502"}}>
         <div onClick={(e) => setInstruction5(false)} className='lg:text-[110%] md:text-[110%] font-[500] cursor-pointer'><img src="images/dot.png" width="20" className='mr-[0.2cm]' style={{display:"inline-block"}} /><span>Vote for a Proposal</span><img src="images/crossed.png" width="25" className='float-right' style={{display:"inline-block"}} /></div>
         <div data-aos="fade-down" className='text-[#eee] ml-[1cm] mt-[0.3cm] text-[90%]'>
         Voting is being done to determine if a proposal will be accepted or not. Members of the DAO can upvote or downvote a proposal. To vote for a proposal, click on the "Vote for a Proposal" tab, 
         and input ID of proposal and click on either upvote or downvote, then submit vote. Your vote will be associated with your wallet address and it will count on the "View Proposals" page. 
         For transparency in the governance of the DAO, the number of upvotes and downvotes are being displayed. If there is a higher number of upvotes, a proposal will be approved. But if there 
         is a higher number of downvotes, the proposal will not be approved and as such will not be implemented.
         </div>
         </div>) : 
         (<div onClick={(e) => setInstruction5(true)} className='lg:text-[110%] md:text-[110%] font-[500] cursor-pointer'><img src="images/dot.png" width="20" className='mr-[0.2cm]' style={{display:"inline-block"}} /><span>Vote for a Proposal</span><img src="images/add.png" width="20" className='float-right' style={{display:"inline-block"}} /></div>)
         }
         </div>

         <div className='mt-[2cm]'>
         <Link href="https://github.com/Goodness5/ultimum-dao-protocol"><button onClick={(e) => setHelp(false)} className='m-[0.2cm] bg-[#502] px-[0.3cm] py-[0.15cm] text-[#fff]'>Docs <img src="images/documentation.png" width="17" className='ml-[0.2cm]' style={{display:"inline-block"}}/></button></Link>
         <Link href="https://discord.com"><img src="images/discord.png" className='m-[0.2cm]' width="35" onClick={(e) => setHelp(false)} style={{display:"inline-block"}} /></Link>
         <Link href="https://x.com"><img src="images/twitter.png" className='m-[0.2cm]' width="35" onClick={(e) => setHelp(false)} style={{display:"inline-block"}} /></Link>
         </div>
        </div>
      </div>
    )
}