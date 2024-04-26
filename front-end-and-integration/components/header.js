import Head from 'next/head';
import { useState, useEffect } from "react";
import Link from 'next/link';
import AOS from 'aos';
import 'aos/dist/aos.css';
import axios from 'axios';
import ConnectDisconnectWallet from './connect-disconnect-wallet';

export default function Header(){
  //control menu display for small device
  const [menu, setmenu] = useState(true)
  const changemenubehaviour1 = () => {
    setmenu(false)
  }
  const changemenubehaviour2 = () => {
    setmenu(true)
  }

  //control ecosystem button for large device
  const [EcosystemButton, setEcosystemButton] = useState(true)
  const changeEcosystemButton = () => {
    setEcosystemButton(false)
  }
  const returnEcosystemButton = () => {
    setEcosystemButton(true)
  }

   //control ecosystem button for small device
  const [smallMenuEcosystemButton, setsmallMenuEcosystemButton] = useState(true)
  const changesmallMenuEcosystemButton = () => {
    setsmallMenuEcosystemButton(false)
  }
  const returnsmallMenuEcosystemButton = () => {
    setsmallMenuEcosystemButton(true)
  }

  //mount the AOS library
  useEffect(() => {
    AOS.init();
  }, [])

  
    return (
      <div>

       {/* header for large devices */}
      <div className='text-center w-[100%] py-[0.1cm] text-[#fff] bg-[rgba(0,0,0,0.95)] headerdivforlarge' style={{boxShadow:"-1px 1px 1px 1px rgba(0,0,0,0.2)", zIndex:"999", position:"fixed", transition:"0.3s ease-in-out"}}>
      <Link href="/"><img src="images/logo.png" width="140" style={{display:"inline-block"}} alt="logo" /></Link>
      <div className='ml-[1cm]' style={{display:"inline-block"}}>
      {EcosystemButton ? (<button onClick={(e) => changeEcosystemButton(e)} className='ml-[1.5cm] menuitems'><span>Ecosystem</span><i className='fa fa-caret-down ml-[0.2cm] text-[120%] text-[#502]'></i></button>) : 
      (<div style={{display:"inline-block"}}>
      <button onClick={(e) => returnEcosystemButton(e)} className='ml-[1.5cm] menuitems'><span>Ecosystem</span><i className='fa fa-caret-up ml-[0.2cm] text-[120%] text-[#502]'></i></button>
      <div data-aos="fade-down" className='w-[6.5cm] mt-[0.2cm] bg-[rgba(0,0,50,0.97)] p-[0.4cm] pb-[0cm]' style={{position:"absolute", transition:"0.3s ease-in-out", border:"1px solid #502"}}>
      <Link href="/dashboard"> <button onClick={(e) => returnEcosystemButton(e)} className='menuitems2 p-[0.2cm] w-[95%] rounded-md bg-[#000] mb-[0.3cm]'>Ultimum DAO <img src="images/dao.png" width="20" className='ml-[0.2cm]' style={{display:"inline-block"}}/></button></Link>
      <Link href="/dashboard"> <button onClick={(e) => returnEcosystemButton(e)} className='menuitems2 p-[0.2cm] w-[95%] rounded-md bg-[#000] mb-[0.3cm]'>Staking dApp <img src="images/dapp.png" width="20" className='ml-[0.2cm]' style={{display:"inline-block"}}/></button></Link>
      <Link href="/dashboard"><button onClick={(e) => returnEcosystemButton(e)} className='menuitems2 p-[0.2cm] w-[95%] rounded-md bg-[#000] mb-[0.3cm]'>Swap <img src="images/swap.png" width="20" className='ml-[0.2cm]' style={{display:"inline-block"}}/></button></Link>
      <div className='mb-[0.5cm]' style={{borderBottom:"2px solid #aaa"}}></div>
      <Link href="/dashboard"><div onClick={(e) => returnEcosystemButton(e)} className='menuitems3 mb-[0.2cm] bg-[#502] py-[0.2cm] mx-[-0.4cm]'>Lending <img src="images/lending.png" width="20" className='ml-[0.2cm]' style={{display:"inline-block"}}/></div></Link>
      <Link href="/dashboard"><div onClick={(e) => returnEcosystemButton(e)} className='menuitems3 bg-[#001] py-[0.2cm] mx-[-0.4cm]'>Borrowing <img src="images/borrowing.png" width="20" className='ml-[0.2cm]' style={{display:"inline-block"}}/></div></Link>
      </div>
      </div>)
      }
      <Link href="/#forum"><button className='ml-[1cm] menuitems'>Forum</button><img src="images/discussion.png" width="18" className='ml-[0.2cm]' style={{display:"inline-block"}}/></Link>
      <Link href="/#community"><button className='ml-[1cm] menuitems'>Community</button><img src="images/users.png" width="25" className='ml-[0.2cm]' style={{display:"inline-block"}}/></Link>
      <Link href="/#insights"><button className='ml-[1cm] menuitems'>Insights</button><img src="images/insights.png" width="25" className='ml-[0.2cm]' style={{display:"inline-block"}}/></Link>
      <Link href="/#developers"><button className='ml-[1cm] menuitems'>Developers</button><img src="images/programmer.png" width="25" className='ml-[0.2cm]' style={{display:"inline-block"}}/></Link>
      </div>
      <Link href="/#ultimumcomponents">
      <div className='ml-[1.2cm]' style={{display:"inline-block"}}>
      <span className='text-[#fff] font-[600]'>Most efficient DAO, swap, stake, token, lend/borrow platform on Base</span>
      <img src="images/base.png" width="25" className='ml-[0.2cm]' style={{display:"inline-block"}} />
      </div>
      </Link>
      <div className="ml-[1cm] mb-[0.2cm]" style={{display:"inline-block"}}>
      <ConnectDisconnectWallet />
      </div>
      </div>


      {/* header for small devices */}
      <div className='w-[100%] headerdivforsmallandmedium' style={{position:"fixed", zIndex:"999"}}>
      {menu ? 
      (<div className='px-[0.3cm] pb-[0.3cm] bg-[rgba(0,0,0,0.95)]' style={{display:"block"}}>
      <img src="images/menu.png" width="40" onClick={(e) => changemenubehaviour1(e)} className='cursor-pointer my-[auto] pt-[0.3cm]' style={{display:"inline-block"}}/>
      <Link href="/"><img src="images/logo.png" width="120" className='float-right mt-[-0.2cm]' style={{display:"inline-block"}}/></Link>
      </div>) : 
 
      (<div className='bg-[rgba(0,0,0,0.85)] pb-[100%]'>
      <div data-aos="fade-right" className='bg-[#111] text-[#fff] w-[90%] pb-[15%]' style={{boxShadow:"2px 2px 4px 2px #502"}}>
      <div className='py-[0.3cm] px-[0.2cm] text-right' style={{boxShadow:"-2px 0px 5px 2px #000", display:"block"}}><img src="images/cancel.png" width="40" onClick={(e) => changemenubehaviour2(e)} className='cursor-pointer' style={{display:"inline-block"}} /></div>
      <div className='px-[0.5cm]'>
       <Link href="/" onClick={(e) => changemenubehaviour2(e)}><div className='py-[0.5cm] menuitems4' style={{borderBottom:"3px solid #000"}}>Home <img src="images/home.png" width="20" className='ml-[0.2cm]' style={{display:"inline-block"}}/></div></Link>
       {smallMenuEcosystemButton ? (<div className='py-[0.5cm] menuitems4' onClick={(e) =>changesmallMenuEcosystemButton(e)} style={{borderBottom:"3px solid #000"}}>Ecosystem <i className='fa fa-caret-down ml-[0.2cm] text-[120%] text-[#502]'></i></div>) : 
       (<div>
       <div className='py-[0.5cm] menuitems4' onClick={(e) => returnsmallMenuEcosystemButton(e)}>Ecosystem <i className='fa fa-caret-up ml-[0.2cm] text-[120%] text-[#502]'></i></div>
       <div data-aos="fade-down" className='ml-[0.3cm] bg-[rgba(0,0,60,0.6)]' style={{border:"1px solid #502"}}>
       <Link href="/dashboard" onClick={(e) => changemenubehaviour2(e) & returnsmallMenuEcosystemButton(e)}><div className='p-[0.3cm] menuitems3' style={{borderBottom:"2px solid #000"}}>Ultimum DAO <img src="images/dao.png" width="20" className='ml-[0.2cm]' style={{display:"inline-block"}}/></div></Link>
       <Link href="/dashboard" onClick={(e) => changemenubehaviour2(e) & returnsmallMenuEcosystemButton(e)}><div className='p-[0.3cm] menuitems3' style={{borderBottom:"2px solid #000"}}>Staking dApp <img src="images/dapp.png" width="20" className='ml-[0.2cm]' style={{display:"inline-block"}}/></div></Link>
       <Link href="/dashboard" onClick={(e) => changemenubehaviour2(e) & returnsmallMenuEcosystemButton(e)}><div className='p-[0.3cm] menuitems3' style={{borderBottom:"2px solid #000"}}>Swap <img src="images/swap.png" width="20" className='ml-[0.2cm]' style={{display:"inline-block"}}/></div></Link>
       <Link href="/dashboard" onClick={(e) => changemenubehaviour2(e) & returnsmallMenuEcosystemButton(e)}><div className='p-[0.3cm] menuitems3 bg-[#502]' style={{borderBottom:"2px solid #000"}}>Lending <img src="images/lending.png" width="20" className='ml-[0.2cm]' style={{display:"inline-block"}}/></div></Link>
       <Link href="/dashboard" onClick={(e) => changemenubehaviour2(e) & returnsmallMenuEcosystemButton(e)}><div className='p-[0.3cm] menuitems3 bg-[#001]' style={{borderBottom:"2px solid #000"}}>Borrowing <img src="images/borrowing.png" width="20" className='ml-[0.2cm]' style={{display:"inline-block"}}/></div></Link>
       </div>
       </div>)
      }
       <Link href="/#forum" onClick={(e) => changemenubehaviour2(e)}><div className='py-[0.5cm] menuitems4' style={{borderBottom:"3px solid #000"}}>Forum <img src="images/discussion.png" width="18" className='ml-[0.2cm]' style={{display:"inline-block"}}/></div></Link>
       <Link href="/#community" onClick={(e) => changemenubehaviour2(e)}><div className='py-[0.5cm] menuitems4' style={{borderBottom:"3px solid #000"}}>Community <img src="images/users.png" width="25" className='ml-[0.2cm]' style={{display:"inline-block"}}/></div></Link>
       <Link href="/#insights" onClick={(e) => changemenubehaviour2(e)}><div className='py-[0.5cm] menuitems4' style={{borderBottom:"3px solid #000"}}>Insights <img src="images/insights.png" width="25" className='ml-[0.2cm]' style={{display:"inline-block"}}/></div></Link>
       <Link href="/#developers" onClick={(e) => changemenubehaviour2(e)}><div className='py-[0.5cm] menuitems4' style={{borderBottom:"3px solid #000"}}>Developers <img src="images/programmer.png" width="25" className='ml-[0.2cm]' style={{display:"inline-block"}}/></div></Link>
       
       <div className="text-center pt-[1cm]" style={{zIndex:"9999"}}>
        <ConnectDisconnectWallet />
       </div>
       <div className='mt-[1cm]' style={{display:"block"}}>
       <Link href="/" onClick={(e) => changemenubehaviour2(e)}><img src="images/logo.png" width="140" style={{display:"inline-block"}}/></Link>
       <Link href="https://base.org" onClick={(e) => changemenubehaviour2(e)}><img src="images/base.png" width="30" className='ml-[0.5cm]' style={{display:"inline-block"}}/></Link>
       </div>
      </div>
      </div>
      </div>)
       }
      </div> 

      </div>
    )
}