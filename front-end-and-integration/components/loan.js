import { useState, useEffect } from "react";

export default function LoanSection({loading, setLoading, setshowLoanSection}) {
    const [token, setToken] = useState("0")
    const [bal, setBal] = useState()
    const [loanAmount, setLoanAmount] = useState()

       const createLoan = () => {
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
      
    return (
        <div className="my-[1cm] bg-[#000] p-[0.5cm] rounded-xl" style={{boxShadow:"2px 2px 2px 2px #000"}}>
        <div className="m-[-0.5cm] mb-[0.5cm] text-center px-[0.2cm] py-[0.3cm] bg-[#222] font-[500] rounded-t-xl">Create loan and see list of available loans <img src="images/crossed.png" onClick={(e) => setshowLoanSection(false)} className="float-right cursor-pointer" width="30" style={{display:"inline-block"}} /></div>

        <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 rounded-xl">
        <div className="grid-cols-1">
        <div className=" bg-[#111] p-[0.5cm] rounded-xl " style={{boxShadow:"2px 2px 2px 2px #502"}}>
        <form>
         <div className='p-[0.5cm] pb-[1cm] bg-[#eee] rounded-md'>
         <div className='text-[#222] font-[500] clear-both'>
          <select className="float-left outline-none bg-[#111] text-[#fff] p-[0.1cm]" onChange={(e) => setToken(e.target.value)}>
            <option value="0">ULT</option>
            <option value="1">ETH</option>
            <option value="2">USDT</option>
            <option value="3">DAI</option> 
          </select>
          <span className='float-right'>Loan amount</span>
         </div>
         <div className='mt-[1.5cm] clear-both font-[500]'>
         <span className='text-[#000] float-left'>Bal: ≈ {parseFloat(2850.950576543).toFixed(2)}</span>
         <input style={{display:"inline-block"}} className="w-[30%] float-right text-[120%] text-right bg-[#eee] outline-none text-[#000] placeholder-[#000]" type="text" id="loanAmount" name="loanAmount" onChange={(e) => setLoanAmount(e.target.value)} placeholder='0' />
         </div>
         </div>
        </form>
        </div>
        <button type="submit" className='text-center py-[0.3cm] bg-[#502] font-[500] text-[#fff] w-[100%] mt-[0.5cm] rounded-md generalbutton cursor-pointer' onClick={(e) => {e.preventDefault();createLoan(token, loanAmount)}}>Create Loan</button>
        </div>
        <div className="grid-cols-1">
        <div className=" bg-[#111] p-[0.5cm] rounded-xl" style={{boxShadow:"2px 2px 2px 2px #502"}}>
            <div className="lg:max-h-[4.7cm] max-h-[10cm] overflow-auto">
        <div className="p-[0.5cm] bg-[#000] rounded-xl mb-[0.5cm]">
            <div className="m-[0.2cm]" style={{display:"inline-block"}}><span className="bg-[#502] rounded-md px-[0.3cm] py-[0.1cm] text-[80%]" style={{border:"2px solid #333"}}>ID</span> 21</div>    
            <div className="m-[0.2cm]" style={{display:"inline-block"}}><span className="bg-[#502] rounded-md px-[0.3cm] py-[0.1cm] text-[80%]" style={{border:"2px solid #333"}}>Token</span> ETH</div>
            <div className="m-[0.2cm]" style={{display:"inline-block"}}><span className="bg-[#502] rounded-md px-[0.3cm] py-[0.1cm] text-[80%]" style={{border:"2px solid #333"}}>Amount</span> 5</div>
            <div className="m-[0.2cm]" style={{display:"inline-block"}}><span className="bg-[#502] rounded-md px-[0.3cm] py-[0.1cm] text-[80%]" style={{border:"2px solid #333"}}>Loan created by</span> {token.substring(0, 5)}...{token.substring(37, 42)}</div>
        </div>
        <div className="p-[0.5cm] bg-[#000] rounded-xl mb-[0.5cm]">
            <div className="m-[0.2cm]" style={{display:"inline-block"}}><span className="bg-[#502] rounded-md px-[0.3cm] py-[0.1cm] text-[80%]" style={{border:"2px solid #333"}}>ID</span> 21</div>    
            <div className="m-[0.2cm]" style={{display:"inline-block"}}><span className="bg-[#502] rounded-md px-[0.3cm] py-[0.1cm] text-[80%]" style={{border:"2px solid #333"}}>Token</span> ETH</div>
            <div className="m-[0.2cm]" style={{display:"inline-block"}}><span className="bg-[#502] rounded-md px-[0.3cm] py-[0.1cm] text-[80%]" style={{border:"2px solid #333"}}>Amount</span> 5</div>
            <div className="m-[0.2cm]" style={{display:"inline-block"}}><span className="bg-[#502] rounded-md px-[0.3cm] py-[0.1cm] text-[80%]" style={{border:"2px solid #333"}}>Loan created by</span> {token.substring(0, 5)}...{token.substring(37, 42)}</div>
        </div>
        <div className="p-[0.5cm] bg-[#000] rounded-xl mb-[0.5cm]">
            <div className="m-[0.2cm]" style={{display:"inline-block"}}><span className="bg-[#502] rounded-md px-[0.3cm] py-[0.1cm] text-[80%]" style={{border:"2px solid #333"}}>ID</span> 21</div>    
            <div className="m-[0.2cm]" style={{display:"inline-block"}}><span className="bg-[#502] rounded-md px-[0.3cm] py-[0.1cm] text-[80%]" style={{border:"2px solid #333"}}>Token</span> ETH</div>
            <div className="m-[0.2cm]" style={{display:"inline-block"}}><span className="bg-[#502] rounded-md px-[0.3cm] py-[0.1cm] text-[80%]" style={{border:"2px solid #333"}}>Amount</span> 5</div>
            <div className="m-[0.2cm]" style={{display:"inline-block"}}><span className="bg-[#502] rounded-md px-[0.3cm] py-[0.1cm] text-[80%]" style={{border:"2px solid #333"}}>Loan created by</span> {token.substring(0, 5)}...{token.substring(37, 42)}</div>
        </div>
        </div>
        </div>
        </div>
        </div>

        </div>
    )
}