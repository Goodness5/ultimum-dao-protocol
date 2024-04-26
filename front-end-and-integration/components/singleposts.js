import Head from 'next/head';
import { useState, useEffect } from "react";
import Link from 'next/link';
import AOS from 'aos';
import 'aos/dist/aos.css';
import axios from 'axios';

export default function SinglePosts({image_link, video_link, title, date, description, category}){
  const copyURL = () => {
    navigator.clipboard.writeText(window.location.href)
  }
  const shareToLinkedIn = () => {
    const urlToShare = encodeURIComponent(window.location.href);
    const linkedInShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${urlToShare}`;
    window.open(linkedInShareUrl, '_blank');
  };
  const shareToTwitter = () => {
    const urlToShare = encodeURIComponent(window.location.href);
    const twitterShareUrl = `https://www.twitter.com/sharing/share-offsite/?url=${urlToShare}`;
    window.open(twitterShareUrl, '_blank');
  };
  const shareToTelegram = () => {
    const urlToShare = encodeURIComponent(window.location.href);
    const telegramShareUrl = `https://www.telegram.org/sharing/share-offsite/?url=${urlToShare}`;
    window.open(telegramShareUrl, '_blank');
  };
  const shareToDiscord = () => {
    const urlToShare = encodeURIComponent(window.location.href);
    const discordShareUrl = `https://www.discord.com/sharing/share-offsite/?url=${urlToShare}`;
    window.open(discordShareUrl, '_blank');
  };
                
  return (
   <div>

        <div className='bg-[#111] p-[0.5cm] pb-[1.5cm] rounded-md mb-[1.5cm]' style={{boxShadow:"1px 1px 2px 2px #502"}}>
          <div>
          <div className='text-[150%] font-[600] text-[#fff]'>{title}</div>
          <div style={{display:"block"}}>
          <img src="images/calendar.png" width="20" style={{display:"inline-block"}}/>
          <div className='text-[85%] text-[#ccc] ml-[0.2cm]' style={{display:"inline-block"}}>{new Date(date).toDateString()}</div>
          </div>
          {image_link ? (<img src={image_link} className='mt-[0.5cm] w-[100%]' />) :
          (<video src={video_link} control="controls" className='mt-[0.5cm] w-[100%]' />)
           }
         <div className='text-[#ccc] mt-[0.5cm]'>
          {description}
         </div>
        <div className='mt-[0.5cm]'>
          <button className='px-[0.3cm] py-[0.1cm] bg-[#002] text-[80%] rounded-md text-[#fff] m-[0.2cm]' style={{boxShadow:"1px 1px 2px 2px #502"}}>Tags:</button>
          <button className='px-[0.3cm] py-[0.1cm] bg-[#000] text-[80%] rounded-md text-[#fff] m-[0.2cm]' style={{boxShadow:"1px 1px 2px 2px #502"}}>{category}</button>
        </div>
        </div>
      <div className='mt-[0.5cm]' style={{display:"block"}}>
        <img src="images/sharing.png" width="30" className='m-[0.2cm] cursor-pointer' onClick={(e) => copyURL()} style={{display:"inline-block"}} />
        <img src="images/linkedin.png" width="30" className='m-[0.2cm] cursor-pointer' onClick={(e) => shareToLinkedIn(e)} style={{display:"inline-block"}} />
        <img src="images/twitter.png" width="30" className='m-[0.2cm] cursor-pointer' onClick={(e) => shareToTwitter(e)}  style={{display:"inline-block"}} />
        <img src="images/telegram.png" width="30" className='m-[0.2cm] cursor-pointer' onClick={(e) => shareToTelegram(e)}  style={{display:"inline-block"}} />
        <img src="images/discord.png" width="30" className='m-[0.2cm] cursor-pointer' onClick={(e) => shareToDiscord(e)}  style={{display:"inline-block"}} />
      </div>
    </div>

   </div>
  )
};

