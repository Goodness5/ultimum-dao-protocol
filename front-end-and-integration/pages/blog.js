import Head from 'next/head';
import { useState, useEffect } from "react";
import Link from 'next/link';
import AOS from 'aos';
import 'aos/dist/aos.css';
import axios from 'axios';
import SinglePosts from '@/components/singleposts';

export default function Blog(){
  useEffect(() => {
    AOS.init();
  }, [])

  const [loading, setLoading] = useState(); 
  const [showSinglePost, setshowSinglePost] = useState()
  const [blurPage, setBlurPage] = useState("none")

      //get all blog posts
      const [allBlogPosts, setAllBlogPosts] = useState([])
      useEffect(()=>{
          const getAllBlogData = async () => {
            setLoading(true)
              try {
                  const response = await axios.get("/api/allblogpostsapi");
                  setAllBlogPosts(response.data)
                  setLoading(false)
              } catch (error) {
                  console.log(error)
              }
          }
          getAllBlogData();
      }, [])

            //send search request and get search posts
            const [searchQuery, setSearchQuery] = useState(""); // State to hold the search query
            const [allSearchPosts, setAllSearchPosts] = useState([])
                const handleSearch = async () => {
                  setLoading(true)
                    try {
                        const response = await axios.get(`/api/searchpostsapi?query=${searchQuery}`);
                        setAllSearchPosts(response.data)
                        setLoading(false)
                    } catch (error) {
                        console.log(error)
                        setLoading(false)
                    }
                }

            // pagination
            const [currentPage, setCurrentPage] = useState(1);
            const postsPerPage = 12;
            const indexOfLastPost = currentPage * postsPerPage;
            const indexOfFirstPost = indexOfLastPost - postsPerPage;
            const currentPosts = allBlogPosts.slice(indexOfFirstPost, indexOfLastPost);
            const searchPosts = allSearchPosts.slice(indexOfFirstPost, indexOfLastPost);
            const paginate = (pageNumber) => {
            setCurrentPage(pageNumber);
            };

  //get trending blog post
  const [trendingBlogData, setTrendingBlogData] = useState([])
  useEffect(()=>{
      const getTrendingBlogData = async () => {
          try {
              const response = await axios.get("/api/trendingblogpostapi");
              setTrendingBlogData(response.data)
          } catch (error) {
              console.log(error)
          }
      }
      getTrendingBlogData();
  }, [])

        //get single blog post
        const [image_link, setimage_link] = useState("images/blogdefaultbg.jpg");
        const [video_link, setvideo_link] = useState();
        const [title, settitle] = useState();
        const [date, setdate] = useState();
        const [description, setdescription] = useState();
        const [category, setcategory] = useState();
            const getSingleBlogData = async (initial) => {
              setLoading(true)
                try {
                    const response = await axios.post("/api/singlepostapi", {id:initial});
                    console.log(response.data[0])
                    setimage_link(response.data[0].image_link)
                    setvideo_link(response.data[0].video_link)
                    settitle(response.data[0].title)
                    setdate(response.data[0].date)
                    setdescription(response.data[0].description)
                    setcategory(response.data[0].category)
                    setLoading(false)
                } catch (error) {
                    console.log(error)
                }
            }

  return (
    <>
    <Head>
   <title>Ultimum Blog</title>
   <link rel="shortcut icon" href="/favicon.ico" />
   </Head>
   <div>


    <div className='lg:py-[0.4cm] py-[0.2cm] lg:px-[1cm] px-[5%] bg-[#111] fixed w-[100%]' style={{zIndex:"9999"}}>
     <Link href="/">
      <img src="images/back.png" width="40" style={{display:"inline-block"}}/> 
      <span className='ml-[0.5cm] text-[150%] font-[500] text-[#fff]'>Home</span>
     </Link>
     <span className='text-[150%] font-[500] text-[#502]'> / Blog</span>
    </div>

    <div className='lg:pt-[3cm] pt-[2.5cm]' style={{filter:blurPage}}>
    <div className='text-center'>
        <span className='bg-[#000] text-[#fff] px-[0.5cm] py-[0.2cm] rounded-full' style={{border:"2px solid #502"}}>
        <form onSubmit={(e) => {e.preventDefault(); handleSearch(searchQuery)}} style={{display:"inline-block"}}>
        <input type="text" placeholder="Search blog...." onChange={(e) => setSearchQuery(e.target.value)} className='bg-[#000] w-[5cm] placeholder-[#fff] text-[#fff] text-[90%] outline-none' /><img src="images/search.png" width="20" className='ml-[0.2cm] cursor-pointer' onClick={(e) => {e.preventDefault(); handleSearch(searchQuery)}} style={{display:"inline-block"}}/>
        </form>
        </span>
    </div>

    <div className='grid lg:grid-cols-4 grid-cols-1 gap-8 mx-[5%] mb-[2cm] pt-[1cm]'>
    <div data-aos="zoom-in" className='mainbar grid-cols-1 lg:col-span-3'>
   <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
    {allSearchPosts.length > 0 ? searchPosts.map((posts)=> (
            <div key={posts.id} data-aos="zoom-in" className="grid-cols-1 rounded-xl bg-[#111]" style={{border:"2px solid #502"}}>
            {posts.image_link ? (<img src={posts.image_link} className="w-[100%] lg:h-[6cm] md:h-[6cm] h-[5.7cm] rounded-t-xl" />) : 
            (<video src={posts.video_link } control="controls" className='rounded-md w-[100%]' />)
              }
            <div className="px-[0.5cm] mt-[0.3cm] text-right"><button className='px-[0.3cm] py-[0.1cm] bg-[#000] text-[80%] rounded-md text-[#fff] cursor-default' style={{boxShadow:"1px 1px 2px 2px #502"}}>{posts.category}</button></div>
            <div className="px-[0.5cm] mt-[0.3cm]" style={{display:"block"}}>
            <img src="images/calendar.png" width="20" style={{display:"inline-block"}}/>
            <div className='text-[90%] text-[#ccc] ml-[0.2cm]' style={{display:"inline-block"}}>{(new Date(posts.date).toDateString())}</div>
            <div className='mt-[0.1cm] text-[95%] text-[#aaa] font-[500]'>Post ID: {posts.id}</div>
            </div>
            <div className='text-[130%] font-[600] text-[#fff] px-[0.5cm] mt-[0.2cm] overflow-auto'>{(posts.title.length > 100) ? (<span>{posts.title.substring(0, 100)} ...</span>) : (<span>{posts.title}</span>)}</div>
            <div className="mt-[0.2cm] px-[0.5cm] text-[#ccc] overflow-auto">
            {(posts.description.length > 500) ? (<span>{posts.description.substring(0, 500)} .....</span>) : (<span>{posts.description}</span>)}
            </div>
            <div className='px-[0.5cm] my-[0.5cm]'>
            <button className='generalbutton px-[0.5cm] py-[0.2cm] bg-[#502] text-[80%] text-[#fff] rounded-tr-full' onClick={(e) => setBlurPage("blur(10px)") & getSingleBlogData(posts.id) & setshowSinglePost(true)}  style={{border:"2px solid #502"}}>View full post</button>
            </div>
              </div>))
    :
    currentPosts.map((posts) => ( 
      <div key={posts.id} data-aos="zoom-in" className="grid-cols-1 rounded-xl bg-[#111]" style={{border:"2px solid #502"}}>
{posts.image_link ? (<img src={posts.image_link} className="w-[100%] lg:h-[6cm] md:h-[6cm] h-[5.7cm] rounded-t-xl" />) : 
(<video src={posts.video_link } control="controls" className='rounded-md w-[100%]' />)
  }
<div className="px-[0.5cm] mt-[0.3cm] text-right"><button className='px-[0.3cm] py-[0.1cm] bg-[#000] text-[80%] rounded-md text-[#fff] cursor-default' style={{boxShadow:"1px 1px 2px 2px #502"}}>{posts.category}</button></div>
<div className="px-[0.5cm] mt-[0.3cm]" style={{display:"block"}}>
<img src="images/calendar.png" width="20" style={{display:"inline-block"}}/>
<div className='text-[90%] text-[#ccc] ml-[0.2cm]' style={{display:"inline-block"}}>{(new Date(posts.date).toDateString())}</div>
<div className='mt-[0.1cm] text-[95%] text-[#aaa] font-[500]'>Post ID: {posts.id}</div>
</div>
<div className='text-[130%] font-[600] text-[#fff] px-[0.5cm] mt-[0.2cm] overflow-auto'>{(posts.title.length > 100) ? (<span>{posts.title.substring(0, 100)} ...</span>) : (<span>{posts.title}</span>)}</div>
<div className="mt-[0.2cm] px-[0.5cm] text-[#ccc] overflow-auto">
{(posts.description.length > 500) ? (<span>{posts.description.substring(0, 500)} .....</span>) : (<span>{posts.description}</span>)}
</div>
<div className='px-[0.5cm] my-[0.5cm]'>
<button className='generalbutton px-[0.5cm] py-[0.2cm] bg-[#502] text-[80%] text-[#fff] rounded-tr-full' onClick={(e) => setBlurPage("blur(10px)") & getSingleBlogData(posts.id) & setshowSinglePost(true)}  style={{border:"2px solid #502"}}>View full post</button>
</div>
  </div>
    ))}
</div>
{allSearchPosts.length > 0 ? 
     (<div className='mt-[1cm] mb-[0.5cm]'>
        {Array.from({ length: Math.ceil(allSearchPosts.length / postsPerPage) }, (_, index) => (
          <button className='generalbutton bg-[#502] rounded-md px-[0.3cm] py-[0.1cm] mx-[0.2cm] text-[#fff]' key={index} onClick={() => paginate(index + 1)}>
            {index + 1}
          </button>
        ))}
     </div>) : 
          (<div className='mt-[1cm] mb-[0.5cm]'>
          {Array.from({ length: Math.ceil(allBlogPosts.length / postsPerPage) }, (_, index) => (
            <button className='generalbutton bg-[#502] rounded-md px-[0.3cm] py-[0.1cm] mx-[0.2cm] text-[#fff]' key={index} onClick={() => paginate(index + 1)}>
              {index + 1}
            </button>
          ))}
       </div>)
    }
</div>

<div data-aos="zoom-in" className='sidebar grid-cols-1'>
<div className='tagsdiv p-[0.5cm] pb-[1.5cm] rounded-md mb-[1cm]' style={{boxShadow:"1px 1px 2px 2px #502"}}>
<div className='text-center' style={{display:"block"}}>
<span className='text-[150%] font-[500] text-[#fff]'>Tags</span>
<img src="images/minus.png" width="50" className='ml-[0.3cm]' style={{display:"inline-block"}} />
</div>
<div className='mt-[0.5cm]'>
<button className='px-[0.3cm] py-[0.1cm] bg-[#000] text-[80%] rounded-md text-[#fff] m-[0.2cm] cursor-default' style={{boxShadow:"1px 1px 2px 2px #502"}}>Blockchain</button>
<button className='px-[0.3cm] py-[0.1cm] bg-[#000] text-[80%] rounded-md text-[#fff] m-[0.2cm] cursor-default' style={{boxShadow:"1px 1px 2px 2px #502"}}>Scroll</button>
<button className='px-[0.3cm] py-[0.1cm] bg-[#000] text-[80%] rounded-md text-[#fff] m-[0.2cm] cursor-default' style={{boxShadow:"1px 1px 2px 2px #502"}}>DeFi</button>
<button className='px-[0.3cm] py-[0.1cm] bg-[#000] text-[80%] rounded-md text-[#fff] m-[0.2cm] cursor-default' style={{boxShadow:"1px 1px 2px 2px #502"}}>dApp</button>
<button className='px-[0.3cm] py-[0.1cm] bg-[#000] text-[80%] rounded-md text-[#fff] m-[0.2cm] cursor-default' style={{boxShadow:"1px 1px 2px 2px #502"}}>Time-frame</button>
<button className='px-[0.3cm] py-[0.1cm] bg-[#000] text-[80%] rounded-md text-[#fff] m-[0.2cm] cursor-default' style={{boxShadow:"1px 1px 2px 2px #502"}}>DAO</button>
<button className='px-[0.3cm] py-[0.1cm] bg-[#000] text-[80%] rounded-md text-[#fff] m-[0.2cm] cursor-default' style={{boxShadow:"1px 1px 2px 2px #502"}}>Ultimum</button>
<button className='px-[0.3cm] py-[0.1cm] bg-[#000] text-[80%] rounded-md text-[#fff] m-[0.2cm] cursor-default' style={{boxShadow:"1px 1px 2px 2px #502"}}>Cryptocurrency</button>
<button className='px-[0.3cm] py-[0.1cm] bg-[#000] text-[80%] rounded-md text-[#fff] m-[0.2cm] cursor-default' style={{boxShadow:"1px 1px 2px 2px #502"}}>Swap</button>
<button className='px-[0.3cm] py-[0.1cm] bg-[#000] text-[80%] rounded-md text-[#fff] m-[0.2cm] cursor-default' style={{boxShadow:"1px 1px 2px 2px #502"}}>Web 3</button>
<button className='px-[0.3cm] py-[0.1cm] bg-[#000] text-[80%] rounded-md text-[#fff] m-[0.2cm] cursor-default' style={{boxShadow:"1px 1px 2px 2px #502"}}>Smart contract</button>
<button className='px-[0.3cm] py-[0.1cm] bg-[#000] text-[80%] rounded-md text-[#fff] m-[0.2cm] cursor-default' style={{boxShadow:"1px 1px 2px 2px #502"}}>Ethereum</button>
<button className='px-[0.3cm] py-[0.1cm] bg-[#000] text-[80%] rounded-md text-[#fff] m-[0.2cm] cursor-default' style={{boxShadow:"1px 1px 2px 2px #502"}}>Layer 2</button>
<button className='px-[0.3cm] py-[0.1cm] bg-[#000] text-[80%] rounded-md text-[#fff] m-[0.2cm] cursor-default' style={{boxShadow:"1px 1px 2px 2px #502"}}>Lending</button>
<button className='px-[0.3cm] py-[0.1cm] bg-[#000] text-[80%] rounded-md text-[#fff] m-[0.2cm] cursor-default' style={{boxShadow:"1px 1px 2px 2px #502"}}>Borrowing</button>
<button className='px-[0.3cm] py-[0.1cm] bg-[#000] text-[80%] rounded-md text-[#fff] m-[0.2cm] cursor-default' style={{boxShadow:"1px 1px 2px 2px #502"}}>ULT</button>
</div>
</div>
<div className='socialdiv bg-[#111] p-[0.5cm] pb-[1.5cm] rounded-md mb-[1cm]' style={{boxShadow:"1px 1px 2px 2px #502"}}>
<div className='text-center' style={{display:"block"}}>
<span className='text-[150%] font-[500] text-[#fff]'>Social</span>
<img src="images/minus.png" width="50" className='ml-[0.3cm]' style={{display:"inline-block"}} />
</div>
<div className='mt-[0.5cm] text-center'>
<Link href="https://linkedin.com"><img src="images/linkedin.png" width="40" className='m-[0.2cm]' style={{display:"inline-block"}} /></Link>
<Link href="https://x.com"><img src="images/twitter.png" width="40" className='m-[0.2cm]' style={{display:"inline-block"}} /></Link>
<Link href="https://telegram.org"><img src="images/telegram.png" width="40" className='m-[0.2cm]' style={{display:"inline-block"}} /></Link>
<Link href="https://discord.com"><img src="images/discord.png" width="40" className='m-[0.2cm]' style={{display:"inline-block"}} /></Link>
</div>
</div>
<div className='trendingdiv bg-[#111] p-[0.5cm] pb-[1.5cm] rounded-md mb-[1cm]' style={{boxShadow:"1px 1px 2px 2px #502"}}>
<div className='text-center' style={{display:"block"}}>
<span className='text-[150%] font-[500] text-[#fff]'>Trending</span>
<img src="images/minus.png" width="50" className='ml-[0.3cm]' style={{display:"inline-block"}} />
</div>
{trendingBlogData.map((post)=>( 
<div key={post.id} className='mt-[0.5cm]'>
 <div className='grid grid-cols-3 gap-4 mb-[0.8cm]'>
  <div className='grid-cols-1'>
   {post.image_link ? (<img src={post.image_link} className='rounded-md w-[100%] h-[2cm]' />) :
    (<video src={post.video_link } control="controls" className='rounded-md w-[100%]' />)
    }
  </div>
  <div className='grid-cols-1 col-span-2'>
  <button className='px-[0.3cm] py-[0.1cm] bg-[#000] text-[80%] rounded-md text-[#fff] mb-[0.2cm] cursor-default' style={{boxShadow:"1px 1px 2px 2px #502"}}>{post.category}</button>
  <div className='text-[90%] font-[600] text-[#fff] mb-[0.2cm]'>{(post.title.length > 40) ? (<span>{post.title.substring(0, 40)} ...</span>) : (<span>{post.title}</span>)}</div>
  <div style={{display:"block"}}>
<img src="images/calendar.png" width="20" style={{display:"inline-block"}}/>
<div className='text-[85%] text-[#ccc] ml-[0.2cm]' style={{display:"inline-block"}}>{(new Date(post.date).toDateString())}</div>
</div>
  </div>
 </div>
</div>
 ))}
</div>
</div>
</div>
</div>

    {showSinglePost && (
    <div data-aos="zoom-in" className='top-0 w-[100%] h-[100%] lg:px-[20%] px-[5%] lg:pt-[2cm] pt-[1.5cm] fixed overflow-auto'>
        <img src="images/cancel.png" onClick={(e) => setshowSinglePost(false) & setBlurPage(false) & setimage_link("images/blogdefaultbg.jpg")} width="40" className='cancelbutton cursor-pointer rounded-[100%] m-[auto] my-[1cm]' />
        <SinglePosts image_link={image_link} video_link={video_link} title={title} date={date} description={description} category={category} />
    </div>
    )}

   {loading ? 
     (<div className='bg-[rgba(0,0,0,0.8)] text-[#000] text-center w-[100%] h-[100%] top-0 right-0' style={{position:"fixed", zIndex:"9999"}}>
      <div className='loader mx-[auto] lg:mt-[20%] md:mt-[40%] mt-[50%]'></div>
      </div>) : (<span></span>)  
     }

   </div>
  </>
  );
};

