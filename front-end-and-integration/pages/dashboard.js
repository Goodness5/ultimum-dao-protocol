import Head from 'next/head';
import { useState, useEffect } from "react";
import Link from 'next/link';
import AOS from 'aos';
import 'aos/dist/aos.css';
import axios from 'axios';
import { useRouter } from 'next/router';
import ConnectDisconnectWallet from '@/components/connect-disconnect-wallet';

export default function Dashboard(){
  //initialize the AOS library
  useEffect(() => {
    AOS.init();
  }, [])

  //mount ecosystem components upon button clicks and change menu items background
  const [displayComponent, setDisplayComponent] = useState("mybalances")
  const [bgColor1, setBgColor1] = useState("#502")
  const [bgColor2, setBgColor2] = useState("#111")
  const [bgColor3, setBgColor3] = useState("#111")
  const [bgColor4, setBgColor4] = useState("#111")
  const [bgColor5, setBgColor5] = useState("#111")
  const [bgColor6, setBgColor6] = useState("#111")
  const [bgColor7, setBgColor7] = useState("#111")
  const changeBg1 = () => {
    setBgColor1("#502")
    setBgColor2("#111")
    setBgColor3("#111") 
    setBgColor4("#111") 
    setBgColor5("#111") 
    setBgColor6("#111")
    setBgColor7("#111") 
      }
      const changeBg2 = () => {
        setBgColor1("#111")
        setBgColor2("#502")
        setBgColor3("#111") 
        setBgColor4("#111") 
        setBgColor5("#111") 
        setBgColor6("#111")
        setBgColor7("#111") 
          }
          const changeBg3 = () => {
            setBgColor1("#111")
            setBgColor2("#111")
            setBgColor3("#502") 
            setBgColor4("#111") 
            setBgColor5("#111") 
            setBgColor6("#111")
            setBgColor7("#111") 
              }
              const changeBg4 = () => {
                setBgColor1("#111")
                setBgColor2("#111")
                setBgColor3("#111") 
                setBgColor4("#502") 
                setBgColor5("#111") 
                setBgColor6("#111")
                setBgColor7("#111") 
                  }
                  const changeBg5 = () => {
                    setBgColor1("#111")
                    setBgColor2("#111")
                    setBgColor3("#111") 
                    setBgColor4("#111") 
                    setBgColor5("#502") 
                    setBgColor6("#111")
                    setBgColor7("#111") 
                      }
                      const changeBg6 = () => {
                        setBgColor1("#111")
                        setBgColor2("#111")
                        setBgColor3("#111") 
                        setBgColor4("#111") 
                        setBgColor5("#111") 
                        setBgColor6("#502")
                        setBgColor7("#111") 
                          }
                          const changeBg7 = () => {
                            setBgColor1("#111")
                            setBgColor2("#111")
                            setBgColor3("#111") 
                            setBgColor4("#111") 
                            setBgColor5("#111") 
                            setBgColor6("#111")
                            setBgColor7("#502") 
                              }

    //useState to mount and unmount small device dashboard menu
    const [mountSmallMenu, setMountSmallMenu] = useState()
 


  return (
    <>
    <Head>
   <title>Ultimum Protocol Dashboard - Acess to Ultimum's Ecosystem (DAO, Swap, Staking, Token, Treasury, Lending/Borrowing)</title>
   <link rel="shortcut icon" href="/favicon.ico" />
   </Head>
   <div>

    <div className='dashboardmenulg h-[100%] bg-[#111] text-[#fff]' style={{zIndex:"999", position:"fixed", boxShadow:"2px 2px 2px 2px #502", overflow:"auto"}}> 
     <div className='px-[0.5cm] py-[0.6cm] text-center' style={{display:"block"}}>
       <Link href="/"><img src="images/logo.png" width="170" style={{display:"inline-block"}}/></Link>
       <Link href="https://base.org"><img src="images/base.png" width="25" className='ml-[0.5cm]' style={{display:"inline-block"}}/></Link>
     </div>
      <div>
      <div className='p-[0.4cm] menuitems4' onClick={(e) => setDisplayComponent("mybalances") & changeBg1(e)} style={{background:bgColor1}}>My Balances <img src="images/balances.png" width="25" className='ml-[0.2cm]' style={{display:"inline-block"}}/></div>
      <div className='p-[0.4cm] menuitems4' onClick={(e) => setDisplayComponent("protocolmetrics") & changeBg2(e)} style={{background:bgColor2}}>Protocol Metrics <img src="images/metrics.png" width="25" className='ml-[0.2cm]' style={{display:"inline-block"}}/></div>
      <div className='p-[0.4cm] menuitems4' onClick={(e) => setDisplayComponent("daogovernance") & changeBg3(e)} style={{background:bgColor3}}>DAO Governance <img src="images/dao.png" width="25" className='ml-[0.2cm]' style={{display:"inline-block"}}/></div>
      <div className='p-[0.4cm] menuitems4' onClick={(e) => setDisplayComponent("swaptokens") & changeBg4(e)} style={{background:bgColor4}}>Swap tokens <img src="images/swap.png" width="25" className='ml-[0.2cm]' style={{display:"inline-block"}}/></div>
      <div className='p-[0.4cm] menuitems4' onClick={(e) => setDisplayComponent("stake") & changeBg5(e)} style={{background:bgColor5}}>Stake (Time-frame) <img src="images/dapp.png" width="25" className='ml-[0.2cm]' style={{display:"inline-block"}}/></div>
      <div className='p-[0.4cm] menuitems4' onClick={(e) => setDisplayComponent("lend") & changeBg6(e)} style={{background:bgColor6}}>Lend <img src="images/lending.png" width="25" className='ml-[0.2cm]' style={{display:"inline-block"}}/></div>
      <div className='p-[0.4cm] menuitems4' onClick={(e) => setDisplayComponent("borrow") & changeBg7(e)} style={{background:bgColor7}}>Borrow <img src="images/borrowing.png" width="25" className='ml-[0.2cm]' style={{display:"inline-block"}}/></div>
      </div>
      <div className='mt-[30%] p-[0.5cm]' style={{display:"block"}}>
       <div><Link href="https://github.com/icemedia001/Ultimum-Protocol"><button className='m-[0.2cm] rounded-md bg-[#502] px-[0.3cm] py-[0.15cm] text-[#fff]'>Docs <img src="images/documentation.png" width="17" className='ml-[0.2cm]' style={{display:"inline-block"}}/></button></Link></div>
       <Link href="https://discord.com"><img src="images/discord.png" width="35" className='m-[0.2cm]' style={{display:"inline-block"}}/></Link>
       <Link href="https://twitter.com"><img src="images/twitter.png" width="35" className='m-[0.2cm]' style={{display:"inline-block"}}/></Link>
      </div>
   </div>

   {mountSmallMenu ? (<div className='dashboardmenusm w-[100%] h-[100%] bg-[rgba(0,0,0,0.6)]' style={{zIndex:"9999", position:"fixed", overflow:"auto"}}>
   <div className='w-[70%] h-[100%] bg-[#111] text-[#fff]' data-aos="fade-right" style={{boxShadow:"2px 2px 2px 2px #502", overflow:"auto"}}> 
     <div className='px-[0.5cm] py-[0.6cm] text-center' style={{display:"block"}}>
       <Link href="/"><img src="images/logo.png" width="170" onClick={(e) => setMountSmallMenu(false)} style={{display:"inline-block"}}/></Link>
       <Link href="https://base.org"><img src="images/base.png" width="25" className='ml-[0.5cm]' onClick={(e) => setMountSmallMenu(false)} style={{display:"inline-block"}}/></Link>
     </div>
      <div>
      <div className='p-[0.4cm] menuitems4' onClick={(e) => setDisplayComponent("mybalances") & changeBg1(e) & setMountSmallMenu(false)} style={{background:bgColor1}}>My Balances <img src="images/balances.png" width="25" className='ml-[0.2cm]' style={{display:"inline-block"}}/></div>
      <div className='p-[0.4cm] menuitems4' onClick={(e) => setDisplayComponent("protocolmetrics") & changeBg2(e) & setMountSmallMenu(false)} style={{background:bgColor2}}>Protocol Metrics <img src="images/metrics.png" width="25" className='ml-[0.2cm]' style={{display:"inline-block"}}/></div>
      <div className='p-[0.4cm] menuitems4' onClick={(e) => setDisplayComponent("daogovernance") & changeBg3(e) & setMountSmallMenu(false)} style={{background:bgColor3}}>DAO Governance <img src="images/dao.png" width="25" className='ml-[0.2cm]' style={{display:"inline-block"}}/></div>
      <div className='p-[0.4cm] menuitems4' onClick={(e) => setDisplayComponent("swaptokens") & changeBg4(e) & setMountSmallMenu(false)} style={{background:bgColor4}}>Swap tokens <img src="images/swap.png" width="25" className='ml-[0.2cm]' style={{display:"inline-block"}}/></div>
      <div className='p-[0.4cm] menuitems4' onClick={(e) => setDisplayComponent("stake") & changeBg5(e) & setMountSmallMenu(false)} style={{background:bgColor5}}>Stake (Time-frame) <img src="images/dapp.png" width="25" className='ml-[0.2cm]' style={{display:"inline-block"}}/></div>
      <div className='p-[0.4cm] menuitems4' onClick={(e) => setDisplayComponent("lend") & changeBg6(e) & setMountSmallMenu(false)} style={{background:bgColor6}}>Lend <img src="images/lending.png" width="25" className='ml-[0.2cm]' style={{display:"inline-block"}}/></div>
      <div className='p-[0.4cm] menuitems4' onClick={(e) => setDisplayComponent("borrow") & changeBg7(e) & setMountSmallMenu(false)} style={{background:bgColor7}}>Borrow <img src="images/borrowing.png" width="25" className='ml-[0.2cm]' style={{display:"inline-block"}}/></div>
      </div>
      <div className='my-[1cm]'><img src="images/arrow.png" onClick={(e) => setMountSmallMenu(false)} className='closedashboardsmallmenu mx-[auto] cursor-pointer' width="50" /></div>
      <div className='mt-[20%] p-[0.5cm]' style={{display:"block"}}>
       <div><Link href="https://github.com/icemedia001/Ultimum-Protocol"><button onClick={(e) => setMountSmallMenu(false)} className='m-[0.2cm] rounded-md bg-[#502] px-[0.3cm] py-[0.15cm] text-[#fff]'>Docs <img src="images/documentation.png" width="17" className='ml-[0.2cm]' style={{display:"inline-block"}}/></button></Link></div>
       <Link href="https://discord.com"><img src="images/discord.png" width="35" className='m-[0.2cm]' onClick={(e) => setMountSmallMenu(false)} style={{display:"inline-block"}}/></Link>
       <Link href="https://twitter.com"><img src="images/twitter.png" width="35" className='m-[0.2cm]' onClick={(e) => setMountSmallMenu(false)} style={{display:"inline-block"}}/></Link>
      </div>
   </div>
   </div>) : (<span></span>)}

   <div className='ecosystemcomponentsarea bg-[#000] h-[100%]' style={{position:"fixed", overflow:"auto"}}>
   <div className='text-right w-[100%] p-[0.5cm]'><ConnectDisconnectWallet /></div>
   {mountSmallMenu ? (<span></span>) : (<div className='dashboardsmallmenubar text-right w-[100%] px-[1cm]'><img src="images/menu-bar.png" className='cursor-pointer' onClick={(e) => setMountSmallMenu(true)} width="30" style={{display:"inline-block"}}/></div>)}
   <div className='w-[100%]'>
   <img src="images/base.png" width="100" className='lg:mt-[10%] mt-[20%] ml-[5%] blurimage1' style={{position:"absolute"}} />
   <img src="images/base.png" width="100" className='lg:mt-[15%] mt-[25%] lg:ml-[85%] ml-[60%] blurimage2' style={{position:"absolute"}} />
   <img src="images/logo.png" width="200" className='lg:mt-[35%] mt-[100%] ml-[8%] blurimage2' style={{position:"absolute"}} />
   <img src="images/logo.png" width="200" className='lg:mt-[45%] mt-[105%] lg:ml-[80%] ml-[40%] blurimage1' style={{position:"absolute"}} />
   </div>
   <div className='w-[100%] p-[0.5cm] mt-[1cm]' style={{position:"absolute"}}>
    {displayComponent === "mybalances" && (<div id="mybalances" data-aos="zoom-in" className='bg-[#111] lg:mx-[2cm] md:mx-[1cm] mx-[0.5cm] p-[0.5cm] rounded-xl mb-[1cm]' style={{boxShadow:"2px 2px 2px 2px #502", zIndex:"9999"}}>
      <div>my balances section</div>
      <button>go</button>
    </div>)} 
    {displayComponent === "protocolmetrics" && (<div id="protocolmetrics" data-aos="zoom-in" className='bg-[#111] lg:mx-[2cm] md:mx-[1cm] mx-[0.5cm] p-[0.5cm] rounded-xl mb-[1cm]' style={{boxShadow:"2px 2px 2px 2px #502", zIndex:"9999"}}>
      <div>protocol metrics section</div>
      <button>go</button>
    </div>)} 
    {displayComponent === "daogovernance" && (<div id="daogovernance" data-aos="zoom-in" className='bg-[#111] lg:mx-[2cm] md:mx-[1cm] mx-[0.5cm] p-[0.5cm] rounded-xl mb-[1cm]' style={{boxShadow:"2px 2px 2px 2px #502", zIndex:"9999"}}>
      <div>DAO governance section</div>
      <button>go</button>
    </div>)} 
    {displayComponent === "swaptokens" && (<div id="swaptokens" data-aos="zoom-in" className='bg-[#111] lg:mx-[2cm] md:mx-[1cm] mx-[0.5cm] p-[0.5cm] rounded-xl mb-[1cm]' style={{boxShadow:"2px 2px 2px 2px #502", zIndex:"9999"}}>
      <div>swap tokens section</div>
      <button>go</button>
    </div>)} 
    {displayComponent === "stake" && (<div id="stake" data-aos="zoom-in" className='bg-[#111] lg:mx-[2cm] md:mx-[1cm] mx-[0.5cm] p-[0.5cm] rounded-xl mb-[1cm]' style={{boxShadow:"2px 2px 2px 2px #502", zIndex:"9999"}}>
      <div>stake (time-frame) section</div>
      <button>go</button>
    </div>)} 
    {displayComponent === "lend" && (<div id="lend" data-aos="zoom-in" className='bg-[#111] lg:mx-[2cm] md:mx-[1cm] mx-[0.5cm] p-[0.5cm] rounded-xl mb-[1cm]' style={{boxShadow:"2px 2px 2px 2px #502", zIndex:"9999"}}>
      <div>lending section</div>
      <button>go</button>
    </div>)} 
    {displayComponent === "borrow" && (<div id="borrow" data-aos="zoom-in" className='bg-[#111] lg:mx-[2cm] md:mx-[1cm] mx-[0.5cm] p-[0.5cm] rounded-xl mb-[1cm]' style={{boxShadow:"2px 2px 2px 2px #502", zIndex:"9999"}}>
      <div>borrowing section</div>
      <button>go</button>
    </div>)} 
   </div>
   </div>
   
  </div>
  </>
  );
};

