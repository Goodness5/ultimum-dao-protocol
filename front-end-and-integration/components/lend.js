import { useState, useEffect } from "react";
import LoanSection from "./loan";

export default function LendSection() {
    const [token, setToken] = useState("0")
    const [bal, setBal] = useState()
    const [loanID, setLoanID] = useState()
    const [loading, setLoading] = useState()

       const lendToken = () => {
      // firstly approve for other tokens
      setLoading(true)
      setTimeout(()=> {
          setLoading(false)
      }, 5000)
      }

      useEffect(()=>{
        const readTokensBal = async() => {
          const getBal = (token)
          setBal(getBal)
        }
        readTokensBal();
    }, [token])

    const [showLoanSection, setshowLoanSection] = useState(false)
      
    return (
        <div>
        <div className="font-[500] bg-[#502] px-[0.4cm] py-[0.15cm] rounded-md mb-[0.2cm]" style={{display:"inline-block", boxShadow:"2px 2px 2px 2px #333"}}>Lend</div>
        <div className="text-[#ccc] text-[90%]">Lend to Ultimum Protocol to gain huge rewards</div>
        {showLoanSection === false && (<div className="text-right font-[500] mt-[0.5cm]"><span className="cursor-pointer" onClick={(e) => setshowLoanSection(true)}>Create and view available loans <img src="images/profit.png" className="ml-[0.2cm]" width="30" style={{display:"inline-block"}} /></span></div>)}

        {!showLoanSection ? (<div className="my-[1cm] bg-[#000] p-[0.5cm] rounded-xl lg:mx-[20%] md:mx-[10%]" style={{boxShadow:"2px 2px 2px 2px #fff"}}>
        <div className=" bg-[#111] p-[0.5cm] rounded-xl " style={{boxShadow:"2px 2px 2px 2px #fff"}}>
        <form>
         <div className='p-[0.5cm] pb-[1cm] bg-[#eee] rounded-md'>
         <div className='text-[#222] font-[500] clear-both'>
          <select className="float-left outline-none bg-[#502] text-[#fff] p-[0.1cm]" onChange={(e) => setToken(e.target.value)}>
            <option value="0">ULT</option>
            <option value="1">ETH</option>
            <option value="2">USDT</option> 
            <option value="3">DAI</option>
          </select>
          <span className='float-right'>Loan ID</span>
         </div>
         <div className='mt-[1.5cm] clear-both font-[500]'>
         <span className='text-[#000] float-left'>Bal: ≈ {parseFloat(1850.950576543).toFixed(2)}</span>
         <input style={{display:"inline-block"}} className="w-[30%] float-right text-[120%] text-right bg-[#eee] outline-none text-[#000] placeholder-[#000]" type="text" id="loanID" name="loanID" onChange={(e) => setLoanID(e.target.value)} placeholder='0' />
         </div>
         </div>
        </form>
        </div>
        <button type="submit" className='text-center py-[0.3cm] bg-[#502] font-[500] text-[#fff] w-[100%] mt-[0.5cm] rounded-md generalbutton cursor-pointer' onClick={(e) => {e.preventDefault();lendToken(loanID)}}>Lend Tokens</button>
        </div>)
           :
        (<LoanSection loading={loading} setLoading={setLoading} showLoanSection={showLoanSection} setshowLoanSection={setshowLoanSection} />)}

    {loading ? 
     (<div className='bg-[rgba(0,0,0,0.8)] text-[#000] text-center w-[100%] h-[100%] top-0 right-0' style={{position:"fixed", zIndex:"9999"}}>
      <div className='loader mx-[auto] lg:mt-[20%] md:mt-[40%] mt-[50%]'></div>
      </div>) : (<span></span>)  
     }
     
        </div>
    )
}