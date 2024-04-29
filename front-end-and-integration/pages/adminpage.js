import Head from 'next/head';
import { useState, useEffect } from "react";
import Link from 'next/link';
import AOS from 'aos';
import 'aos/dist/aos.css';
import axios from 'axios';
import { useRouter } from 'next/router';


export default function AdminDashboard(){
    // Front end layout section
    useEffect(() => {
        AOS.init();
      }, [])
    
    const [addPostColor, setaddPostColor] = useState("#fff")
    const [addPostBg, setaddPostBg] = useState("#502")
    const [updatePostColor, setupdatePostColor] = useState("#000")
    const [updatePostBg, setupdatePostBg] = useState("#fff")
    const [deletePostColor, setdeletePostColor] = useState("#000")
    const [deletePostBg, setdeletePostBg] = useState("#fff")

    const changeAddPost = () => {
        setaddPostColor("#fff")
        setaddPostBg("#502")
        setupdatePostColor("#000")
        setupdatePostBg("#fff")
        setdeletePostColor("#000")
        setdeletePostBg("#fff")
    }

    const changeUpdatePost = () => {
        setaddPostColor("#000")
        setaddPostBg("#fff")
        setupdatePostColor("#fff")
        setupdatePostBg("#502")
        setdeletePostColor("#000")
        setdeletePostBg("#fff")
    }

    const changeDeletePost = () => {
        setaddPostColor("#000")
        setaddPostBg("#fff")
        setupdatePostColor("#000")
        setupdatePostBg("#fff")
        setdeletePostColor("#fff")
        setdeletePostBg("#502")
    }


    const [displayComponent, setDisplayComponent] = useState("addPostDisplayComponent")
    const changeDisplayComponent = (initial) => {
        setDisplayComponent(initial)
    }


    // confirm cookies to enter admin page and logout section
    const [loading, setLoading] = useState();
    const [auth, setAuth] = useState();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [gender, setgender] = useState('');

    const router = useRouter();
    axios.defaults.withCredentials = true;
    useEffect(() => {
      setLoading(true)
    const confirmAdminCookieData = async () => {
      await axios.get('/api/adminconfirmcookies')
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            setAuth(true);
            setUsername(res.data.admin.username);
            setEmail(res.data.admin.email);
            setgender(res.data.admin.gender);
            setLoading(false)
          } else {
            setAuth(false);
            setLoading(false)
            router.push('/adminsignin')
          }
        })
        .catch((err) => {
          console.log(err);
          setAuth(false);
          setLoading(false)
          router.push('/adminsignin')
        });
      }
      confirmAdminCookieData();
     }, [])
     

      const AdminLogout = async(e) => {
        setLoading(true)
        e.preventDefault();
        await axios.get('/api/adminlogoutbyclearingcookiesapi')
        .then ((res) => {
          if (res.status === 200) {
            router.push('/adminsignin')
          }
          else {
            setLoading(false)
          }
        })
        .catch ((err) => {
          console.log(err)
          setLoading(false)
        })
      }



   // Admin tasks section
    const [values, setValues] = useState({
        id:"",
        image_link:"",
        video_link:"",
        title:"",
        date:"",
        description:"",
        category:"",
    })
    
    const handleInput = (event) => {
        const cleanedValue = event.target.value.replace(/["{}]/g, ''); // Remove curly braces and double quotes
        setValues((prev) => ({ ...prev, [event.target.name]: cleanedValue }));
      };
    
    const [success, setSuccess] = useState()
    const [errorMessage, setErrorMessage] = useState()
    const [fileLinkError, setFileLinkError] = useState()
      const handleSubmitforAddingBlogPost = async (e) => {
      setLoading(true);
      e.preventDefault();
      try {
        if (values.image_link != "" || values.video_link != ""){
        const request = await axios.post("/api/addblogpostdatabyadmin", values)
        if (request.status === 200){
          setLoading(false)
          setSuccess(true)
          setTimeout(()=>{
            setSuccess(false)
          }, 5000)
        }
        else {
          setLoading(false)
          setErrorMessage(true)
          setTimeout(()=>{
            setErrorMessage(false)
          }, 5000)
        }
      } else {
        setLoading(false)
        setFileLinkError(true)
        setTimeout(()=>{
          setFileLinkError(false)
        }, 3000)
      }
      } catch (error) {
        console.log(error)
        setLoading(false)
        setErrorMessage(true)
        setTimeout(()=>{
          setErrorMessage(false)
        }, 5000)
      }
    }
        
    const [success2, setSuccess2] = useState()
    const [errorMessage2, setErrorMessage2] = useState()
      const handleSubmitforUpdatingBlogPost = async (e) => {
        setLoading(true);
        e.preventDefault();
        try {
          const request = await axios.post("/api/updateblogpostdatabyadmin", values)
          if (request.status === 200){
            setLoading(false)
            setSuccess2(true)
            setTimeout(()=>{
              setSuccess2(false)
            }, 5000)
          }
          else {
            setLoading(false)
            setErrorMessage2(true)
            setTimeout(()=>{
              setErrorMessage2(false)
            }, 5000)
          }   
        } catch (error) {
          console.log(error)
          setLoading(false)
          setErrorMessage2(true)
          setTimeout(()=>{
            setErrorMessage2(false)
          }, 5000)
        }
        }

        const [success3, setSuccess3] = useState()
        const [errorMessage3, setErrorMessage3] = useState()
        const handleSubmitforDeletingBlogPost = async (e) => {
            setLoading(true);
            e.preventDefault();
            try {
              const request = await axios.post("/api/deleteblogpostdatabyadmin", values)
              if (request.status === 200){
                setLoading(false)
                setSuccess3(true)
                setTimeout(()=>{
                  setSuccess3(false)
                }, 5000)
              }
              else {
                setLoading(false)
                setErrorMessage3(true)
                setTimeout(()=>{
                  setErrorMessage3(false)
                }, 5000)
              }   
            } catch (error) {
              console.log(error)
              setLoading(false)
              setErrorMessage3(true)
              setTimeout(()=>{
                setErrorMessage3(false)
              }, 5000)
            }
            }
 
  if (auth){
  return (
    <>
    <Head>
   <title>Ultimum Admin Dashboard</title>
   <link rel="shortcut icon" href="/favicon.ico" />
   </Head>
   <div className='p-[5%] admindashboard' style={{backgroundImage:"url(images/adminbg.jpg)"}}>
    <div className='py-[0.3cm]'>
     <span className='cursor-pointer' onClick={(e) => AdminLogout(e)}>
      <img src="images/switch.png" width="50" style={{display:"inline-block"}}/>
      <span className='ml-[0.5cm] lg:text-[180%] md:text-[180%] text-[150%] font-[500] text-[#fff]'>Logout</span>
     </span>
    </div>

        <div data-aos="fade-out" className='text-center mt-[1cm]' style={{display:"block", transition:"0.5s ease-in-out"}}>
            {gender === "male" && (<img src="images/admin.png" width="60" style={{display:"inline-block"}} />)}
            {gender === "female" && (<img src="images/womanadmin.png" width="60" style={{display:"inline-block"}} />)}
            <span className='lg:text-[200%] md:text-[180%] text-[150%] font-[500] ml-[0.5cm] text-[#fff]'>Welcome {username}!</span>
        </div>

        { gender === "male" && 
        (<div className='text-center mt-[0.5cm] lg:text-[150%] text-[120%] font-[500] text-[#ccc]'>
        {new Date().getUTCHours() >= 0 && new Date().getUTCHours() < 11 && (<div><span>Good morning sir!</span><img className='ml-[0.3cm]' src="images/dawn.png" width="30" style={{display:"inline-block"}}/></div>)}
        {new Date().getUTCHours() >= 11 && new Date().getUTCHours() < 15 && (<div><span>Good afternoon sir!</span><img className='ml-[0.3cm]' src="images/sun.png" width="30" style={{display:"inline-block"}}/></div>)}
        {new Date().getUTCHours() >= 15 && new Date().getUTCHours() < 23 && (<div><span>Good evening sir!</span><img className='ml-[0.3cm]' src="images/night.png" width="25" style={{display:"inline-block"}}/></div>)}
        </div>)
        }

       { gender === "female" && 
        (<div className='text-center mt-[0.5cm] lg:text-[150%] text-[120%] font-[500] text-[#ccc]'>
        {new Date().getUTCHours() >= 0 && new Date().getUTCHours() < 11 && (<div><span>Good morning ma'am!</span><img className='ml-[0.3cm]' src="images/dawn.png" width="30" style={{display:"inline-block"}}/></div>)}
        {new Date().getUTCHours() >= 11 && new Date().getUTCHours() < 15 && (<div><span>Good afternoon ma'am!</span><img className='ml-[0.3cm]' src="images/sun.png" width="30" style={{display:"inline-block"}}/></div>)}
        {new Date().getUTCHours() >= 15 && new Date().getUTCHours() < 23 && (<div><span>Good evening ma'am!</span><img className='ml-[0.3cm]' src="images/night.png" width="25" style={{display:"inline-block"}}/></div>)}
        </div>)
        }
        
        <div data-aos="zoom-in" className='mt-[1cm] lg:mx-[15%] md:mx-[5%]' style={{border:"4px solid #502", transition:"0.5s ease-in-out"}}>
        <div className='py-[0.3cm] text-center text-[#fff] font-[500] lg:text-[150%] md:text-[130%] text-[120%] bg-[#502] px-[5%]'>
            <img src="images/panel.png" width="40" style={{display:"inline-block"}}/>
            <span className='ml-[0.4cm]'>Admin Control Panel</span>
        </div>
        <div className='py-[0.3cm] bg-[#001] text-center px-[0.2cm]'>
            <button className='px-[0.4cm] py-[0.2cm] rounded-md font-[500] m-[0.2cm]' onClick={(e) => changeAddPost(e) & changeDisplayComponent("addPostDisplayComponent")} style={{background:addPostBg, color:addPostColor}}>Add Post</button>
            <button className='px-[0.4cm] py-[0.2cm] rounded-md font-[500] m-[0.2cm]' onClick={(e) => changeUpdatePost(e) & changeDisplayComponent("updatePostDisplayComponent")} style={{background:updatePostBg, color:updatePostColor}}>Update Post</button>
            <button className='px-[0.4cm] py-[0.2cm] rounded-md font-[500] m-[0.2cm]' onClick={(e) => changeDeletePost(e) & changeDisplayComponent("deletePostDisplayComponent")} style={{background:deletePostBg, color:deletePostColor}}>Delete Post</button>
        </div>
        <div className='p-[5%] bg-[rgba(0,0,0,0.9)] text-[#000]'>
            {displayComponent === "addPostDisplayComponent" &&
            <form onSubmit={(e) => handleSubmitforAddingBlogPost(e)} data-aos="fade-in" style={{transition:"0.5s ease-in-out"}}>
            <input type="url" className='px-[0.2cm] py-[0.3cm] bg-[#fff] outline-[#224] w-[100%] placeholder-[#555] mb-[0.5cm]' style={{border:"2px solid #ccf"}} id="image_link" name="image_link" value={values.image_link} onChange={handleInput} placeholder="Type the link to a related image" />
            <input type="url" className='px-[0.2cm] py-[0.3cm] bg-[#fff] outline-[#224] w-[100%] placeholder-[#555] mb-[0.5cm]' style={{border:"2px solid #ccf"}} id="video_link" name="video_link" value={values.video_link} onChange={handleInput} placeholder="Or type the link to a related video" />
            {fileLinkError && (<div className='mb-[0.5cm] text-[#702] font-[500]'>Input image or video link!</div>)}
            <input type="text" className='px-[0.2cm] py-[0.3cm] bg-[#fff] outline-[#224] w-[100%] placeholder-[#555] mb-[0.5cm]' style={{border:"2px solid #ccf"}} required id="title" name="title" value={values.title} onChange={handleInput} placeholder="Type the title of your post" />
            <input type="date" className='px-[0.2cm] py-[0.3cm] bg-[#fff] outline-[#224] w-[100%] placeholder-[#555] mb-[0.5cm]' style={{border:"2px solid #ccf"}} required id="date" name="date" value={values.date} onChange={handleInput} placeholder="Type the date of your post" />
            <input type="text" className='px-[0.2cm] py-[0.3cm] bg-[#fff] outline-[#224] w-[100%] placeholder-[#555] mb-[0.5cm]' style={{border:"2px solid #ccf"}} required id="category" name="category" value={values.category} onChange={handleInput} placeholder="Choose a category for your post" />
            <textarea className='px-[0.2cm] py-[0.3cm] h-[5cm] bg-[#fff] outline-[#224] w-[100%] placeholder-[#555] mb-[0.5cm]' style={{border:"2px solid #ccf"}} required id="description" name="description" value={values.description} onChange={handleInput} placeholder="Give your post a description" />
            {!success ? (<button type="submit" className='generalbutton px-[0.2cm] py-[0.3cm] rounded-md bg-[#502] w-[100%] text-[110%] font-[500] text-[#fff] mb-[0.5cm] text-center'>Add blog post</button>) :
            (<button className="px-[0.2cm] py-[0.3cm] bg-[#040] rounded-md w-[100%] text-[110%] font-[500] text-[#fff] mb-[0.5cm] text-center">Success! <img src="images/check.png" width="25" className='ml-[0.2cm]' style={{display:"inline-block"}} /></button>)
            }
             {errorMessage && (<div className='text-center text-[#702] text-[120%] font-[500]'>Error!</div>)}
            </form>
           }

           {displayComponent === "updatePostDisplayComponent" &&
            <form onSubmit={(e) => handleSubmitforUpdatingBlogPost(e)} data-aos="fade-in" style={{transition:"0.5s ease-in-out"}}>
            <input type="number" className='px-[0.2cm] py-[0.3cm] bg-[#fff] outline-[#224] w-[100%] placeholder-[#555] mb-[0.5cm]' style={{border:"2px solid #ccf"}} required id="id" name="id" value={values.id} onChange={handleInput} placeholder="Input id of post to update" />
            <input type="url" className='px-[0.2cm] py-[0.3cm] bg-[#fff] outline-[#224] w-[100%] placeholder-[#555] mb-[0.5cm]' style={{border:"2px solid #ccf"}} id="image_link" name="image_link" value={values.image_link} onChange={handleInput} placeholder="Update image link" />
            <input type="url" className='px-[0.2cm] py-[0.3cm] bg-[#fff] outline-[#224] w-[100%] placeholder-[#555] mb-[0.5cm]' style={{border:"2px solid #ccf"}} id="video_link" name="video_link" value={values.video_link} onChange={handleInput} placeholder="Update video link" />
            <input type="text" className='px-[0.2cm] py-[0.3cm] bg-[#fff] outline-[#224] w-[100%] placeholder-[#555] mb-[0.5cm]' style={{border:"2px solid #ccf"}} id="title" name="title" value={values.title} onChange={handleInput} placeholder="Update post title" />
            <input type="date" className='px-[0.2cm] py-[0.3cm] bg-[#fff] outline-[#224] w-[100%] placeholder-[#555] mb-[0.5cm]' style={{border:"2px solid #ccf"}} id="date" name="date" value={values.date} onChange={handleInput} placeholder="Update the date of your post" />
            <input type="text" className='px-[0.2cm] py-[0.3cm] bg-[#fff] outline-[#224] w-[100%] placeholder-[#555] mb-[0.5cm]' style={{border:"2px solid #ccf"}} id="category" name="category" value={values.category} onChange={handleInput} placeholder="Update post category" />
            <textarea className='px-[0.2cm] py-[0.3cm] h-[5cm] bg-[#fff] outline-[#224] w-[100%] placeholder-[#555] mb-[0.5cm]' style={{border:"2px solid #ccf"}} id="description" name="description" value={values.description} onChange={handleInput} placeholder="Update post description" />
            {!success2 ? (<button type="submit" className='generalbutton px-[0.2cm] py-[0.3cm] rounded-md bg-[#502] w-[100%] text-[110%] font-[500] text-[#fff] mb-[0.5cm] text-center'>Update blog post</button>) :
            (<button className="px-[0.2cm] py-[0.3cm] bg-[#040] rounded-md w-[100%] text-[110%] font-[500] text-[#fff] mb-[0.5cm] text-center">Success! <img src="images/check.png" width="25" className='ml-[0.2cm]' style={{display:"inline-block"}} /></button>)
            }
             {errorMessage2 && (<div className='text-center text-[#702] text-[120%] font-[500]'>Error!</div>)}
            </form>
           }

           {displayComponent === "deletePostDisplayComponent" &&
            <form onSubmit={(e) => handleSubmitforDeletingBlogPost(e)} data-aos="fade-in" style={{transition:"0.5s ease-in-out"}}>
            <input type="number" className='px-[0.2cm] py-[0.3cm] bg-[#fff] outline-[#224] w-[100%] placeholder-[#555] mb-[0.5cm]' style={{border:"2px solid #ccf"}} required id="id" name="id" value={values.id} onChange={handleInput} placeholder="Input id of post to delete" />
            {!success3 ? (<button type="submit" className='generalbutton4 px-[0.2cm] py-[0.3cm] rounded-md bg-[#500] w-[100%] text-[110%] font-[500] text-[#fff] mb-[0.5cm] text-center'>Delete blog post</button>) :
            (<button className="px-[0.2cm] py-[0.3cm] bg-[#040] rounded-md w-[100%] text-[110%] font-[500] text-[#fff] mb-[0.5cm] text-center">Success! <img src="images/check.png" width="25" className='ml-[0.2cm]' style={{display:"inline-block"}} /></button>)
            }
             {errorMessage3 && (<div className='text-center text-[#702] text-[120%] font-[500]'>Error!</div>)}
            </form>
           }

        </div>
        </div>

      {loading ? 
     (<div className='bg-[rgba(0,0,0,0.6)] text-[#000] text-center w-[100%] h-[100%] top-0 right-0' style={{position:"fixed"}}>
      <div className='loader mx-[auto] lg:mt-[20%] md:mt-[40%] mt-[70%]'></div>
      </div>) : (<span></span>)  
      }
   </div>
  </>
  )}
};

