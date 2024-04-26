import Link from "next/link";
import { useState } from "react";

export default function Footer () {
  const [values, setValues] = useState({
    email:""
  })

  const handleInput = (event) => {
    const cleanedValue = event.target.value.replace(/["{}]/g, ''); // Remove curly braces and double quotes
    setValues((prev) => ({ ...prev, [event.target.name]: cleanedValue }));
  };


  const [loading, setLoading] = useState()
  const [success, setSuccess] = useState()
  const onSubmitForm = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
        const res = await fetch(`api/contactapi`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
        })
  
        const { error } = await res.json()
  
        if (error) {
          alert ("Oops! Please check your internet connection.")
          setLoading(false);
            return;
        }
        else {
        setValues({
          email:""
          })
          setLoading(false);
          setSuccess(true)
          setTimeout(()=> {
            setSuccess(false)
          }, 10000)
        }
    } catch (error) {
       console.log(error)
    }
  }
    return (
        <div>
            <div>
             <div className='grid lg:grid-cols-3 grid-cols-1 gap-8 mb-[0.5cm]'>
    <div className='grid-cols-1'>
    <img src="images/logo.png" className='m-[auto]' width="220" />
    </div>
    <div className='grid-cols-1 m-[auto]'>
      <div className='text-[#fff] text-[120%] mb-[0.2cm]'>
        <img src="images/email.png" width="30" style={{display:"inline-block"}} />
        <span className='ml-[0.3cm]'>Subscribe to our newsletter to get latest Ultimum Protocol updates</span>
      </div>
      <form onSubmit={(e) => onSubmitForm(e)}>
      <input type="email" id="email" name="email" value={values.email} onChange={handleInput} required className="outline-none w-[100%] placeholder-[#555] text-[#000] p-[0.3cm] rounded-md" placeholder='Please input your email address' />
      {success ? (<button className="px-[0.4cm] py-[0.2cm] bg-[#040] w-[100%] mt-[0.3cm] text-[#fff] rounded-md">Success! <img src="images/check.png" width="25" className='ml-[0.2cm]' style={{display:"inline-block"}} /></button>) : 
       (<button type="submit" className="px-[0.4cm] py-[0.2cm] bg-[#502] w-[100%] mt-[0.3cm] generalbutton text-[#fff] rounded-md">Subscribe</button>)}
      </form>
    </div>
    <div className='grid-cols-1 m-[auto]'>
      <div className='text-[120%] text-[#fff] mb-[0.2cm] font-[500]'>Our partners</div>
      <Link href="https://braindao.org"><img src="images/brainLogo.svg" width="50" className='m-[0.2cm]' style={{display:"inline-block"}} /></Link>
      <Link href="https://web3bridge.com"><img src="images/web3bridge.png" width="40" className='m-[0.2cm]' style={{display:"inline-block"}} /></Link>
      <Link href="https://uniswap.org"><img src="images/uniswap.png" width="40" className='m-[0.2cm]' style={{display:"inline-block"}} /></Link>
      <Link href="https://chain.link"><img src="images/chainlink.png" width="40" className='m-[0.2cm]' style={{display:"inline-block"}} /></Link>
      <Link href="https://tradingview.com"><img src="images/tradingview.png" width="40" className='m-[0.2cm]' style={{display:"inline-block"}} /></Link>
    </div>
    </div>
    <div className='mb-[1cm]' style={{borderBottom:"2px solid #502"}}></div>
    <div className='text-center'>
        <div className='text-[#fff] text-[120%] mb-[0.2cm]'>
          <span><span className="font-[500]">Ultimum</span> - The most efficient protocol on Base featuring a DAO, swap dApp, staking dApp, token, treasury, lending/borrowing</span>
          <Link href="https://base.org"><img src="images/base.png" width="30" className='ml-[0.3cm]' style={{display:"inline-block"}} /></Link>
        </div>
       <div className='text-[150%] text-[#fff]'>Copyright &copy; {new Date().getFullYear()}</div>
       </div>
         </div>

   {loading ? 
     (<div className='bg-[rgba(0,0,0,0.6)] text-[#000] text-center w-[100%] h-[100%] top-0 right-0' style={{position:"fixed"}}>
      <div className='loader mx-[auto] lg:mt-[20%] md:mt-[40%] mt-[70%]'></div>
      </div>) : (<span></span>)  
    }
        </div>
    )
}