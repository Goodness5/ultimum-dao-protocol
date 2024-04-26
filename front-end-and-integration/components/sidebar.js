import Head from 'next/head';
import { useState, useEffect } from "react";
import Link from 'next/link';
import AOS from 'aos';
import 'aos/dist/aos.css';
import axios from 'axios';
 
export default function Sidebar () {
    // show two approved posts
    const [approvedPosts, setapprovedPosts] = useState([]);
    const getSidebarPostsData = async () => {
      try {
        const response = await axios.get('/api/showsidebarposts'); 
        setapprovedPosts(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    useEffect(() => {
      getSidebarPostsData();
    }, []); 

    useEffect(() => {
      AOS.init();
      }, [])
   

    return (
        <div data-aos="zoom-in" style={{transition:"0.5s ease-in-out"}} className='lg:pt-[1.2cm] md:pt-[1.2cm]'>


        <div className='bg-[#fff] p-[0.5cm] pb-[1.5cm] rounded-md mb-[1cm]' style={{boxShadow:"1px 1px 2px 2px #ddd"}}>
        <div className='text-center' style={{display:"block"}}>
        <span className='text-[150%] font-[500] text-[#445]'>Tags</span>
        <img src="images/minus2.png" width="50" className='ml-[0.3cm]' style={{display:"inline-block"}} />
        </div>
        <div className='mt-[0.5cm]'>
        <button className='px-[0.3cm] py-[0.1cm] bg-[#fff] text-[80%] rounded-md text-[#445] m-[0.2cm] cursor-default' style={{boxShadow:"1px 1px 2px 2px #ccc"}}>Blockchain</button>
        <button className='px-[0.3cm] py-[0.1cm] bg-[#fff] text-[80%] rounded-md text-[#445] m-[0.2cm] cursor-default' style={{boxShadow:"1px 1px 2px 2px #ccc"}}>NFT</button>
        <button className='px-[0.3cm] py-[0.1cm] bg-[#fff] text-[80%] rounded-md text-[#445] m-[0.2cm] cursor-default' style={{boxShadow:"1px 1px 2px 2px #ccc"}}>dApp</button>
        <button className='px-[0.3cm] py-[0.1cm] bg-[#fff] text-[80%] rounded-md text-[#445] m-[0.2cm] cursor-default' style={{boxShadow:"1px 1px 2px 2px #ccc"}}>DEX</button>
        <button className='px-[0.3cm] py-[0.1cm] bg-[#fff] text-[80%] rounded-md text-[#445] m-[0.2cm] cursor-default' style={{boxShadow:"1px 1px 2px 2px #ccc"}}>DAO</button>
        <button className='px-[0.3cm] py-[0.1cm] bg-[#fff] text-[80%] rounded-md text-[#445] m-[0.2cm] cursor-default' style={{boxShadow:"1px 1px 2px 2px #ccc"}}>Cryptocurrency</button>
        <button className='px-[0.3cm] py-[0.1cm] bg-[#fff] text-[80%] rounded-md text-[#445] m-[0.2cm] cursor-default' style={{boxShadow:"1px 1px 2px 2px #ccc"}}>Leverage</button>
        <button className='px-[0.3cm] py-[0.1cm] bg-[#fff] text-[80%] rounded-md text-[#445] m-[0.2cm] cursor-default' style={{boxShadow:"1px 1px 2px 2px #ccc"}}>Web 3</button>
        <button className='px-[0.3cm] py-[0.1cm] bg-[#fff] text-[80%] rounded-md text-[#445] m-[0.2cm] cursor-default' style={{boxShadow:"1px 1px 2px 2px #ccc"}}>Smart contract</button>
        <button className='px-[0.3cm] py-[0.1cm] bg-[#fff] text-[80%] rounded-md text-[#445] m-[0.2cm] cursor-default' style={{boxShadow:"1px 1px 2px 2px #ccc"}}>Ethereum</button>
        <button className='px-[0.3cm] py-[0.1cm] bg-[#fff] text-[80%] rounded-md text-[#445] m-[0.2cm] cursor-default' style={{boxShadow:"1px 1px 2px 2px #ccc"}}>Layer 2</button>
        <button className='px-[0.3cm] py-[0.1cm] bg-[#fff] text-[80%] rounded-md text-[#445] m-[0.2cm] cursor-default' style={{boxShadow:"1px 1px 2px 2px #ccc"}}>StarkNet</button>
        </div>
        </div>

    <div className='socialdiv bg-[#fff] p-[0.5cm] pb-[1.5cm] rounded-md mb-[1cm]' style={{boxShadow:"1px 1px 2px 2px #ddd"}}>
      <div className='text-center' style={{display:"block"}}>
        <span className='text-[150%] font-[500] text-[#445]'>Social</span>
        <img src="images/minus2.png" width="50" className='ml-[0.3cm]' style={{display:"inline-block"}} />
        </div>
        <div className='mt-[0.5cm] text-center'>
        <Link href="https://linkedin.com"><img src="images/linkedin.png" width="40" className='m-[0.2cm]' style={{display:"inline-block"}} /></Link>
        <Link href="https://twitter.com"><img src="images/twitter.png" width="40" className='m-[0.2cm]' style={{display:"inline-block"}} /></Link>
        <Link href="https://telegram.org"><img src="images/telegram.png" width="40" className='m-[0.2cm]' style={{display:"inline-block"}} /></Link>
        <Link href="https://youtube.com"><img src="images/youtube.png" width="40" className='m-[0.2cm]' style={{display:"inline-block"}} /></Link>
        </div>
    </div>

    <div className='bg-[#fff] p-[0.5cm] pb-[1.5cm] rounded-md mb-[1cm]' style={{boxShadow:"1px 1px 2px 2px #ddd"}}>
      <div className='text-center' style={{display:"block"}}>
        <span className='text-[150%] font-[500] text-[#445]'>Trending</span>
        <img src="images/minus2.png" width="50" className='ml-[0.3cm]' style={{display:"inline-block"}} />
        </div>
        <div className='mt-[0.5cm]'>
          {approvedPosts.map((posts) => ( 
         <div className='grid grid-cols-3 gap-4 mb-[0.8cm]'>
          <div className='grid-cols-1'>
            {posts.image_link ? (<img src={posts.image_link} className='rounded-md w-[100%]' />) : 
            (<video src={posts.video_link}  control="controls" className='rounded-md w-[100%]' />)
            }
          </div>
          <div className='grid-cols-1 col-span-2'>
          <button className='px-[0.3cm] py-[0.05cm] bg-[#fff] text-[80%] rounded-md text-[#445] mb-[0.2cm] cursor-default' style={{boxShadow:"1px 1px 2px 2px #ccc"}}>{posts.category}</button>
          <div className='text-[90%] font-[600] text-[#446] mb-[0.2cm]'>{posts.title.length > 30 ? (<span>{posts.title.substring(0, 30)}...</span>) : (<span>{posts.title}</span>)}</div>
          <div style={{display:"block"}}>
        <img src="images/calendar.png" width="20" style={{display:"inline-block"}}/>
        <div className='text-[85%] text-[#445] ml-[0.2cm]' style={{display:"inline-block"}}>{posts.date}</div>
        </div>
          </div>
         </div>
         ))}
        </div>
    </div>

        </div>
    )
}