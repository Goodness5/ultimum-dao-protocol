import Head from 'next/head';
import { useState, useEffect } from "react";
import Link from 'next/link';
import AOS from 'aos';
import 'aos/dist/aos.css';
import axios from 'axios';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { useRouter } from 'next/router';
import SlidingCryptoData from '@/components/slidingcryptodata';
import CryptoChart from '@/components/cryptochart';
import BlockchainInsights from '@/components/blockchaininsights';
import UltimumHomeBlog from '@/components/homeblog';

export default function Home(){
  useEffect(() => {
    AOS.init();
  }, [])

  // create countdown for dashboard navigation
  const [count, setCount] = useState(120);
  useEffect(() => {
    const countdownInterval = setInterval(() => {
      setCount((prevCount) => prevCount - 1);
    }, 1000);

    // Clear the interval when the component is unmounted
    return () => clearInterval(countdownInterval);
  }, []);

  //navigate to dashboard page
  const [allowAutoNav, setAllowAutoNav] = useState(true);
  const router = useRouter();
  useEffect(() => {
    const autoNav = allowAutoNav && setTimeout(() => {
      router.push("/dashboard");
    }, 120000);

    // Cleanup function to clear the timeout when the component is unmounted or auto navigation is stopped
    return () => clearTimeout(autoNav);
}, [allowAutoNav, router])

  //stop navigation to dashboard page
  const stopNav = () => {
    setAllowAutoNav(false)
  }

  return (
    <>
    <Head>
   <title>Ultimum Protocol - The most efficient protocol on Polygon featuring a DAO, swap dApp, Staking dApp, token, treasury, lending/borrowing</title>
   <link rel="shortcut icon" href="/favicon.ico" />
   </Head>
   <div>
   <Header />
   <div className='lg:mx-[8%] mx-[5%] pt-[3cm]'>


   <div className='lg:mx-[-8%] mx-[-5%] pb-[2cm] firstsectiondiv' style={{backgroundImage:"url(images/bg.jpg)", transition:"0.3s ease-in-out"}}>
   <div className='text-center text-[180%] lg:text-[250%] md:text-[200%] pt-[1.5cm] font-[500]'>Mass Adoption of DAO-governed Technologies on Scroll</div>
   <div className='mt-[1cm] text-center lg:text-[140%] text-[120%] lg:mx-[20%] md:mx-[10%] mx-[5%] p-[1cm] lg:px-[2cm] text-[#ccc] bg-[rgba(0,0,0,0.9)]' style={{border:"1px solid #502"}}>
    <div data-aos="fade-in" className='info1' style={{transition:"0.5s ease-in-out"}}>
     Ultimum DAO - Using the DAO as a powerful tool, Ultimum protocol users are able to engage in governance and that includes but not limited to decision making, 
     creation of proposals, view proposal details and voting activities to steer the ecosystem forward. This democratic approach ensures transparency and decentralisation in the ecosystem.
     Become an active member of the DAO to enjoy full Ultimum benefits. To join DAO, please ensure to obtain the Ultimum NFT which symbolizes your membership of the DAO. 
    </div>
    <div data-aos="fade-in" className='info2' style={{transition:"0.5s ease-in-out"}}>
     Time-framing (Staking) - Ultimum Protocol is driving the blockchain sector into the self-banking age with actual advancements, and thus lets you earn smart money in a variety of ways.
     Among them is the time-framing method of staking where you experience full flexibility of your tokens without fear of money being locked up or fear of assets being lost.
      Time-frame your Ultimum tokens (ULT) over a set period chosen by you to gain instant huge rewards from the ecosystem. Ultimum Protocol will use this new technology to more 
      properly communicate value, allowing you to better control your financial future and capitalize on the value of your money over time.
    </div>
    <div data-aos="fade-in" className='info3' style={{transition:"0.5s ease-in-out"}}>
      Swap dApp - With a ChainLink Oracle integration and user-first approach, our users experience decentralized finance and can therefore use the Ultimum Protocol swap dApp to swap a variety of 
      supported tokens with low gas fees. New tokens are added upon approval by the DAO. Our swap dApp is DAO-governed and designed to provide the best user experience and interface to our users.
    </div>
    <div data-aos="fade-in" className='info4' style={{transition:"0.5s ease-in-out"}}>
      P2P Lending/Borrowing - Our users can participate in lending/borrowing activities of supported tokens. When you lend to Ultimum, you get rewarded hugely from the 
      Ultimum pool (your funds are secured with our well audited security algorithm). When you borrow from Ultimum, ensure to present a collateral and pay back with interest. 
      Participate in Ultimum DAO governance to determine the next supported token.
    </div>
    <div data-aos="fade-in" className='info5' style={{transition:"0.5s ease-in-out"}}>
    Treasury/Token - The Ultimum token (ULT) is the native token of the Ultimum Protocol and is backed by the Ultimum treasury. With a clear go-to-market strategy, the Ultimum 
    treasury ensures effective management of the Ultimum token (ULT) and liquidity and minimize risks. 
    This treasury will also optimize financial operations that support product development. If per adventure, ULT goes below 100% of its initial value during the bear market, the treasury 
    acts as a liquidity provider to manage the token price and ensure its stability across all platforms. All trading fees from the Ultimum dApps also go to the treasury.
    </div>
   </div>
   <div className='mt-[1cm] text-center' style={{transition:"0.3s ease-in-out"}}>
    <Link href="/dashboard"><button className='m-[0.2cm] rounded-md bg-[#502] px-[0.3cm] py-[0.2cm] text-[#fff] generalbutton ecobutton' style={{border:"2px solid #502"}}>Explore Ecosystem <img src="images/blockchain.png" width="25" className='ml-[0.2cm]' style={{display:"inline-block"}}/></button></Link>
    <Link href="https://github.com/Goodness5/ultimum-protocol"><button className='m-[0.2cm] rounded-md bg-[#111] px-[0.3cm] py-[0.2cm] text-[#fff] generalbutton docbutton' style={{border:"2px solid #502"}}>Documentation <img src="images/documentation.png" width="25" className='ml-[0.2cm]' style={{display:"inline-block"}}/></button></Link>
    <Link href="/dashboard"><button className='m-[0.2cm] rounded-md bg-[#111] px-[0.3cm] py-[0.2cm] text-[#fff] generalbutton daobutton' style={{border:"2px solid #502"}}>Ultimum DAO <img src="images/dao.png" width="25" className='ml-[0.2cm]' style={{display:"inline-block"}}/></button></Link>
   </div>
   {allowAutoNav ? (<div className='text-center mt-[1cm]'>You will be automatically navigated to the dashboard in {count} seconds....</div>) : 
   (<div className='text-center mt-[1cm]'>Automatic navigation cancelled....</div>)}
   <div className='text-center'>
    {allowAutoNav ? (<button onClick={(e) => stopNav(e)} className='fa-fade mt-[0.5cm] rounded-md bg-[#fff] px-[0.3cm] py-[0.2cm] text-[#001]' style={{boxShadow:"2px 2px 2px 2px #502", animationDuration:"5s"}}>Cancel auto navigation</button>) : (<div></div>)}
   </div>
   </div>


   <div className='slidingcryptodatadiv lg:mx-[-8%] mx-[-5%]'>
    <SlidingCryptoData />
   </div>


   <div id="ultimumcomponents" className='mt-[2cm]'>
    <div className='grid lg:grid-cols-3 grid-cols-1 gap-4'>
      <div className='grid-cols-1 lg:col-span-2 col-span-3'>
      <div className='lg:h-[15.85cm] h-[7cm] rounded-xl lg:p-[1cm] p-[0.5cm] homepageswapdiv' style={{backgroundImage:"url(images/ultimumswap.jpg)", boxShadow:"2px 2px 10px 1px #502"}}>
        <div className='lg:text-[200%] text-[150%] lg:mt-[10%] mt-[3%] text-[#fff] font-[500]'>Best Swap on Ethereum Layer 2<br /><span className='lg:text-[70%] text-[60%] text-[#ccc]'>(ChainLink Oracles integrated)</span></div>
        <div className='lg:text-[250%] md:text-[200%] text-[160%] mt-[3%] text-[#eee] font-[500]'>Live Now</div>
        <Link href="/dashboard"><button className='lg:mt-[10%] mt-[3%] rounded-md bg-[#111] px-[0.3cm] py-[0.2cm] text-[#fff] generalbutton2' style={{border:"2px solid #502"}}>Swap tokens</button></Link>
      </div>
      </div>
      <div className='grid-cols-1 lg:col-span-1 col-span-3'>
        <div className='grid grid-cols-1 gap-4'>
        <div className='grid-cols-1 h-[5cm] rounded-xl p-[0.5cm]' style={{backgroundImage:"url(images/ultimumdao.jpg)", backgroundPositionY:"25%", backgroundSize:"120%", boxShadow:"2px 2px 10px 1px #502"}}>
        <div className='text-[120%] text-[#fff] font-[600]'>Ultimum DAO</div>
        <div className='text-[130%] mt-[3%] text-[#fff] font-[500]'>Engage in decentralised democratic governance</div>
        <Link href="/dashboard"><button className='mt-[3%] rounded-md bg-[#111] px-[0.3cm] py-[0.2cm] text-[#fff] generalbutton2' style={{border:"2px solid #502"}}>Enter DAO</button></Link>
        </div>
        <div className='grid-cols-1 h-[5cm] rounded-xl p-[0.5cm]' style={{backgroundImage:"url(images/ultimumstake.jpg)",  backgroundPositionY:"5%", backgroundSize:"120%", boxShadow:"2px 2px 10px 1px #502"}}>
        <div className='text-[120%] text-[#fff] font-[600]'>Time-frame (stake)</div>
        <div className='text-[130%] mt-[3%] text-[#eee] font-[500]'>Earn smart money while having full flexibility for your tokens</div>
        <Link href="/dashboard"><button className='mt-[3%] rounded-md bg-[#111] px-[0.3cm] py-[0.2cm] text-[#fff] generalbutton2' style={{border:"2px solid #502"}}>Stake tokens</button></Link>
        </div>
        <div className='grid-cols-1 h-[5cm] rounded-xl p-[0.5cm]' style={{backgroundImage:"url(images/ultimum-lend-borrow.jpg)", backgroundPositionY:"20%", backgroundSize:"120%", boxShadow:"2px 2px 10px 1px #502"}}>
        <div className='text-[120%] text-[#fff] font-[600]'>P2P Lending/Borrowing</div>
        <div className='text-[130%] mt-[3%] text-[#eee] font-[500]'>Gain huge bonuses for lending to Ultimum</div>
        <Link href="/dashboard"><button className='mt-[3%] rounded-md bg-[#111] px-[0.3cm] py-[0.2cm] text-[#fff] generalbutton2' style={{border:"2px solid #502"}}>Lend/borrow</button></Link>
        </div>
        </div>
      </div>
    </div>
   </div>


      <div id="forum" className='mt-[2cm]'>
       <div className="text-[180%] lg:text-[300%] md:text-[250%] text-center font-[600] mb-[5%]">Ultimum Forum</div>
       <div className="grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-8">
        <div className="grid grid-cols-1 px-[5%] py-[10%] rounded-xl bg-[#111]" data-aos="flip-down" style={{border:"2px solid #502"}}>
            <div><img src="images/digital.png" width="70" className="m-[auto]" /></div>
        <div className="lg:text-[200%] md:text-[180%] text-[150%] font-[600] mt-[10%]">Reward system</div>
        <div className="lg:text-[120%] md:text-[110%] text-[105%] mt-[5%]"> 
        With a robust reward system, Ultimum aims to reward users according to their usage of the platform. $ULT is rewarded for staking, lending and contribution to the governance 
        of the Ultimum DAO. Users can aslo earn $ULT in potential airdrops organised by the protocol in the future. To learn more about the reward system, visit Ultimum forum below.
        </div>
        <div className="mt-[5%]">
          <Link href="https://discord.com"><button className='rounded-md bg-[#000] px-[0.3cm] py-[0.2cm] text-[#fff] generalbutton'>Forum discussion</button></Link>
          <Link href="/dashboard"><button className='rounded-md bg-[#000] px-[0.3cm] py-[0.2cm] text-[#fff] generalbutton ml-[0.5cm]'>Go to dApp</button></Link>
        </div>
        </div>
        <div className="grid grid-cols-1 px-[5%] py-[10%] rounded-xl bg-[#010]" data-aos="flip-down" style={{border:"2px solid #502"}}>
        <div className="m-[auto]"><img src="images/ethresource.png" width="70"/></div>
        <div className="lg:text-[200%] md:text-[180%] text-[150%] font-[600] mt-[10%]">Resource Management</div>
        <div className="lg:text-[120%] md:text-[110%] text-[105%] mt-[5%]">
        We place a high priority on responsibility, transparency, decentralisation and a value-oriented approach because we are stewards of an important protocol and have the capacity to influence 
        the financial results of many products on Scroll.
        </div>
        <div className="mt-[5%]"><Link href="https://discord.com"><button className='rounded-md bg-[#000] px-[0.3cm] py-[0.2cm] text-[#fff] generalbutton'>Visit forum</button></Link></div>
        </div>
       </div>
      </div>


      <div id="marketdata" className='mt-[2cm]'>
       <div className="text-[180%] lg:text-[300%] md:text-[250%] text-center font-[600] mb-[5%]">Real-time Market Chart</div>
       <CryptoChart />
      </div>


        <div id="insights" className="mt-[2cm]">
            <div className="text-[180%] lg:text-[300%] md:text-[250%] text-center font-[600] mb-[5%]">Blockchain Insights</div>
            <BlockchainInsights />
        </div>


        <div id="blog" className="mt-[2cm]">
            <div className="text-[180%] lg:text-[300%] md:text-[250%] text-center font-[600] mb-[5%]">Recent Ultimum Blog</div>
            <UltimumHomeBlog />
        </div>


        <div id="community" className="mt-[2cm]">
            <div className="text-[180%] lg:text-[300%] md:text-[250%] text-center font-[600] mb-[5%]">Join the Ultimum Community</div>
            <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4">
            <div data-aos="fade-up" className="grid-cols-1 px-[8%] pt-[10%] lg:pb-[25%] pb-[20%] rounded-xl socialcols1">
             <div><span className="px-[0.5cm] py-[0.3cm] bg-[rgba(0,0,0,0.8)] rounded-md">X (Twitter)</span></div>
             <div className="mt-[0.5cm] text-center"><Link href="https://x.com"><img src="images/twitter.png" width="50" className='m-[0.2cm]' style={{display:"inline-block"}} /></Link></div>
            </div>
            <div data-aos="fade-up" className="grid-cols-1 px-[8%] pt-[10%] lg:pb-[25%] pb-[20%] rounded-xl socialcols2">
             <div><span className="px-[0.5cm] py-[0.3cm] bg-[rgba(0,0,0,0.8)] rounded-md">Telegram</span></div>
             <div className="mt-[0.5cm] text-center"><Link href="https://telegram.org"><img src="images/telegram.png" width="50" className='m-[0.2cm]' style={{display:"inline-block"}} /></Link></div>
            </div>
            <div data-aos="fade-up" className="grid-cols-1 px-[8%] pt-[10%] lg:pb-[25%] pb-[20%] rounded-xl socialcols3">
             <div><span className="px-[0.5cm] py-[0.3cm] bg-[rgba(0,0,0,0.8)] rounded-md">Discord</span></div>
             <div className="mt-[0.5cm] text-center"><Link href="https://discord.com"><img src="images/discord.png" width="50" className='m-[0.2cm]' style={{display:"inline-block"}} /></Link></div>
            </div>
            <div data-aos="fade-up" className="grid-cols-1 px-[8%] pt-[10%] lg:pb-[25%] pb-[20%] rounded-xl socialcols4">
             <div><span className="px-[0.5cm] py-[0.3cm] bg-[rgba(0,0,0,0.8)] rounded-md">LinkedIn</span></div>
             <div className="mt-[0.5cm] text-center"><Link href="https://linkedin.com"><img src="images/linkedin.png" width="50" className='m-[0.2cm]' style={{display:"inline-block"}} /></Link></div>
            </div>
            </div>
        </div>


       <div id="developers" className="mt-[2cm]">
            <div className="text-[180%] lg:text-[300%] md:text-[250%] text-center font-[600] mb-[5%]">Meet our Team of Developers</div>
       <div className="grid md:grid-cols-2 lg:grid-cols-2 grid-cols-1 gap-8 mb-[1%] lg:mx-[25%]" style={{transition:"0.5s ease-in-out"}}>
       <div data-aos="zoom-in" className="grid-cols-1 mb-[5%] rounded-xl text-center teamcols1">
            <img src="images/mrpatrick030.jpg" className='w-[100%] rounded-xl developersimages' />
            <div className="text-center mx-[5%] mt-[0.2cm] py-[0.2cm] bg-[rgba(20,20,20,0.8)] rounded-xl teaminfo" style={{transition:"0.5s ease-in-out"}}>
            <div className="text-md">PATRICK OMINISAN</div>
            <div>
              <i class="fa fa-chevron-circle-down text-[#fff] developerdirect"></i>
              <span className='developerdetails'>
              <i class="fa fa-chevron-circle-up text-[#fff]"></i> &nbsp; 
              <Link href="https://x.com/mrpatrick030"><i class="fa-brands fa-square-x-twitter"></i></Link> &nbsp; 
              <Link href="https://linkedin.com/in/mrpatrick030"><i class="fa-brands fa-linkedin"></i></Link> &nbsp; 
              <Link href="https://github.com/mrpatrick030"><i class="fa-brands fa-square-github"></i></Link> &nbsp; 
              <Link href="https://t.me/mrpatrick030"><i class="fa-brands fa-telegram"></i></Link>
              </span>
            </div>
            <div className="font-[600]">Blockchain developer (Web3Bridge)</div>
            </div>
           </div>
       <div data-aos="zoom-in" className="grid-cols-1 mb-[5%] rounded-xl text-center teamcols1">
            <img src="images/goodness.jpg" className='w-[100%] rounded-xl developersimages' />
            <div className="text-center mx-[5%] mt-[0.2cm] py-[0.2cm] bg-[rgba(20,20,20,0.8)] rounded-xl teaminfo" style={{transition:"0.5s ease-in-out"}}>
            <div className="text-md">GOODNESS KOLAPO</div>
            <div>
              <i class="fa fa-chevron-circle-down text-[#fff] developerdirect"></i>
              <span className='developerdetails'>
              <i class="fa fa-chevron-circle-up text-[#fff]"></i> &nbsp; 
              <Link href="https://x.com/goodnesskolapo"><i class="fa-brands fa-square-x-twitter"></i></Link> &nbsp; 
              <Link href="https://linkedin.com/in/goodness-temilorun"><i class="fa-brands fa-linkedin"></i></Link> &nbsp; 
              <Link href="https://github.com/goodness5"><i class="fa-brands fa-square-github"></i></Link> &nbsp; 
              <Link href="https://t.me/goodnesskolapo"><i class="fa-brands fa-telegram"></i></Link>
              </span>
            </div>
            <div className="font-[600]">Smart contract developer (Web3Bridge)</div>
            </div>
           </div>
         </div>
        </div>


   </div>

   <div className='mt-[2cm] bg-[#000012] p-[1cm] text-center'>
    <Footer />
   </div>

   </div>
  </>
  );
};

