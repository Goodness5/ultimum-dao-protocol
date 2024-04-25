import Link from "next/link";
import { useEffect, useState } from "react";
import axios from 'axios';

export default function UltimumHomeBlog() {
    const [homeBlogData, setHomeBlogData] = useState([])

    useEffect(()=>{
        const getBlogData = async () => {
            try {
                const response = await axios.get("/api/homeblogapi");
                setHomeBlogData(response.data)
            } catch (error) {
                console.log(error)
            }
        }
        getBlogData();
    }, [])

    return (
        <div>
            <div className="grid lg:grid-cols-3 grid-cols-1 gap-4">

                {homeBlogData.map((posts)=> (
              <div key={posts.id} data-aos="zoom-in" className="grid-cols-1 rounded-xl" style={{border:"2px solid #502"}}>
              {posts.image_link ? (<img src={posts.image_link} className="w-[100%] lg:h-[7.5cm] md:h-[10cm] h-[7cm] rounded-t-xl" />) : 
              (<video src={posts.video_link } control="controls" className='rounded-md w-[100%]' />)
               }
              <div className="px-[0.5cm] mt-[0.3cm] text-right"><button className='px-[0.3cm] py-[0.1cm] bg-[#111] text-[80%] rounded-md text-[#fff] cursor-default' style={{boxShadow:"1px 1px 2px 2px #502"}}>{posts.category}</button></div>
              <div className="px-[0.5cm] mt-[0.3cm]" style={{display:"block"}}>
              <img src="images/calendar.png" width="20" style={{display:"inline-block"}}/>
              <div className='text-[90%] text-[#ccc] ml-[0.2cm]' style={{display:"inline-block"}}>{(new Date(posts.date).toDateString())}</div>
              <div className='mt-[0.1cm] text-[95%] text-[#aaa] font-[500]'>Post ID: {posts.id}</div>
              </div>
              <div className='text-[150%] font-[600] text-[#fff] px-[0.5cm] mt-[0.2cm]'>{(posts.title.length > 100) ? (<span>{posts.title.substring(0, 100)} ...</span>) : (<span>{posts.title}</span>)}</div>
              <div className="mt-[0.2cm] px-[0.5cm] text-[#ccc] lg:text-[110%]">
              {(posts.description.length > 500) ? (<span>{posts.description.substring(0, 500)} .....</span>) : (<span>{posts.description}</span>)}
              </div>
              <div className='px-[0.5cm] my-[0.5cm]'>
              <Link href="/blog"><button className='generalbutton px-[0.5cm] py-[0.2cm] bg-[#502] text-[80%] text-[#fff] rounded-tr-full' style={{border:"2px solid #502"}}>Continue Reading</button></Link>
              </div>
               </div>
                ))}

            </div>
        </div>
    )
}