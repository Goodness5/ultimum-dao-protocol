import Head from 'next/head';
import { useState, useEffect } from "react";
import Link from 'next/link';
import AOS from 'aos';
import 'aos/dist/aos.css';
import axios from 'axios';
import { useRouter } from 'next/router';


export default function AdminSignup(){
  useEffect(() => {
    AOS.init();
  }, [])

  const [values, setValues] = useState({
    email:"",
    password:"",
    secretkey:""
 })

const handleInput = (event) => {
    const cleanedValue = event.target.value.replace(/["{}]/g, ''); // Remove curly braces and double quotes
    setValues((prev) => ({ ...prev, [event.target.name]: cleanedValue }));
  };

  const router = useRouter();
  const [loading, setLoading] = useState(); 
  const [success, setSuccess] = useState()
  const [errorMessage, setErrorMessage] = useState()
  const handleSubmitforAdminSignin = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const request =  await axios.post("/api/adminsigninapi", values)
      if (request.status === 200){
        setSuccess(true)
        setTimeout(() => {
          setSuccess(false)
          router.push('/adminpage');
        }, 2000)
      }
      else {
        setLoading(false)
        setErrorMessage(true)
        setTimeout(()=>{
          setErrorMessage(false)
        }, 5000)
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
 
 
  return (
    <>
    <Head>
   <title>Ultimum Blog - Admin Sign in Page</title>
   <link rel="shortcut icon" href="/favicon.ico" />
   </Head>
   <div className='adminsignin' style={{backgroundImage:"url(images/signupbg.jpg)"}}>
   <div className='lg:py-[0.4cm] py-[0.2cm] lg:px-[1cm] px-[5%] bg-[#111] fixed w-[100%]' style={{zIndex:"9999"}}>
     <Link href="/">
      <img src="images/back.png" width="40" style={{display:"inline-block"}}/> 
      <span className='ml-[0.5cm] text-[150%] font-[500] text-[#fff]'>Home</span>
     </Link>
     <span className='text-[150%] font-[500] text-[#502]'> / Admin sign in</span>
    </div>


        <div className='lg:pt-[5cm] pt-[3cm]'>
        <div data-aos="zoom-out" className='lg:mx-[25%] md:mx-[10%] mx-[5%]' style={{border:"4px solid #502", transition:"0.5s ease-in-out"}}>
        <div className='lg:text-[150%] text-[120%] font-[500] text-[#fff] bg-[#002] px-[0.2cm] text-center py-[0.4cm]'>
            <img src="images/shield.png" width="40" style={{display:"inline-block"}}/>
            <span className='ml-[0.3cm]'>This page is accessible to only the admin</span>
        </div>
        <div className='p-[5%] bg-[rgba(0,0,0,0.9)] text-[#000]'>
          <form onSubmit={(e) => handleSubmitforAdminSignin(e)}>
            <input type="email" className='px-[0.2cm] py-[0.3cm] bg-[#fff] outline-[#224] w-[100%] placeholder-[#555] mb-[0.5cm]' required id="email" name="email" value={values.email} onChange={handleInput} style={{border:"2px solid #ccf"}} placeholder="Type your email" />
            <input type="password" className='px-[0.2cm] py-[0.3cm] bg-[#fff] outline-[#224] w-[100%] placeholder-[#555] mb-[0.5cm]' required id="password" name="password" value={values.password} onChange={handleInput} style={{border:"2px solid #ccf"}} placeholder="Input a password" />
            <input type="password" className='px-[0.2cm] py-[0.3cm] bg-[#fff] outline-[#224] w-[100%] placeholder-[#555] mb-[0.5cm]' required id="secretkey" name="secretkey" value={values.secretkey} onChange={handleInput} style={{border:"2px solid #ccf"}} placeholder="Input admin key" />
            {success ? (<button className="px-[0.2cm] py-[0.3cm] bg-[#040] rounded-md w-[100%] text-[110%] font-[500] text-[#fff] mb-[0.5cm] text-center">Success! <img src="images/check.png" width="25" className='ml-[0.2cm]' style={{display:"inline-block"}} /></button>) :
            (<button type="submit" className='generalbutton px-[0.2cm] py-[0.3cm] rounded-md bg-[#502] w-[100%] text-[110%] font-[500] text-[#fff] mb-[0.5cm] text-center'>Sign in to admin dashboard</button>)}
             {errorMessage && (<div className='text-center text-[#702] text-[120%] font-[500]'>Error!</div>)}
          </form>
        </div>
        </div>
        </div>

      {loading ? 
     (<div className='bg-[rgba(0,0,0,0.8)] text-[#000] text-center w-[100%] h-[100%] top-0 right-0' style={{position:"fixed", zIndex:"9999"}}>
      <div className='loader mx-[auto] lg:mt-[20%] md:mt-[40%] mt-[50%]'></div>
      </div>) : (<span></span>)  
     }
   </div>
  </>
  );
};

