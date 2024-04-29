import { useState, useEffect } from "react";
import { daoContractReadSettings,
  tokenContractReadSettings,
  treasuryContractReadSettings,
  swapContractReadSettings,
  nftContractReadSettings,
  stakeContractReadSettings,
  lendBorrowContractReadSettings,
  usdtContractReadSettings,
  daiContractReadSettings,
  scrollTestnetRPC,
  nftContractAddress,
  nftContractABI,
  daoContractAddress,
  daoContractABI,
  stakeContractABI,
  stakeContractAddress,
  tokenContractAddress, 
  tokenContractABI,
  treasuryContractABI,
  treasuryContractAddress,
  swapContractABI,
  swapContractAddress,
  lendBorrowContractABI,
  lendBorrowContractAddress,
  usdtContractAddress,
  usdtContractABI,
  daiContractAddress,
  daiContractABI,
} from "@/abiAndContractSettings";

export default function LoanSection({loading, setLoading, setshowLoanSection, theWalletAddress, loanID, setLoanID, lendToken, loanAmount, setLoanAmount}) {
    const { ethers } = require("ethers"); 
    const [loanData, setLoanData] = useState([])

    // show all loans
      useEffect(()=>{
        const readLoansData = async () => {
            setLoading(true)
            try {
                const dataArray = []
                const getAllLoannsNumber = await lendBorrowContractReadSettings.loanCount();
                for (let i=0; i < getAllLoannsNumber; i++){
                  const allLoansData = await lendBorrowContractReadSettings.getLoanInfo(i);
                  dataArray.push(allLoansData)
                  console.log(allLoansData)
                }
                dataArray.sort((a, b) => b.loan_id - a.loan_id)
                setLoanData(dataArray)
            } catch (error) {
                console.log(error)
                setLoading(false)
            }
            finally {
                setLoading(false)
            }
        }
        readLoansData();
    }, [])


    // lend to borrower from view loans section
    const fundLoanFromLoanList = async (initialID, initialLoanAmount) => {
      setLoanID(initialID)  
      setLoanAmount(initialLoanAmount)
      console.log(loanID)
      console.log(loanAmount)   
      lendToken();
    }


    //search loans functionality
    const [searchQuery, setSearchQuery] = useState()
    const [searchData, setSearchData] = useState([])
    const handleSearch = async () => {
      setLoading(true)
       try {
        const searchDataArray = []
        const getAllLoannsNumber = await lendBorrowContractReadSettings.loanCount();
        for (let i=0; i < getAllLoannsNumber; i++){
          const anyLoanData = await lendBorrowContractReadSettings.getLoanInfo(i);
          if (anyLoanData.lender.toString() == searchQuery || anyLoanData.borrower.toString() == searchQuery || anyLoanData.loan_id.toString() == searchQuery){
            searchDataArray.push(anyLoanData)  
          }
          searchDataArray.sort((a, b) => b.loan_id - a.loan_id)
          setSearchData(searchDataArray)      
        }
       } catch (error) {
        console.log(error)
        setLoading(false)
       }
       finally {
        setLoading(false)
       }
    }


             // pagination
            const [currentPage, setCurrentPage] = useState(1);
            const loansPerPage = 5;
            const indexOfLastLoan = currentPage * loansPerPage;
            const indexOfFirstLoan = indexOfLastLoan - loansPerPage;
            const currentLoans = loanData.slice(indexOfFirstLoan, indexOfLastLoan);
            const searchedLoans = searchData.slice(indexOfFirstLoan, indexOfLastLoan);
            const paginate = (pageNumber) => {
            setCurrentPage(pageNumber);
            };
      
    return (
      <div>

      <div className='text-center mt-[1cm]'>
        <span className='bg-[#000] text-[#fff] px-[0.5cm] py-[0.2cm] rounded-full' style={{border:"2px solid #502"}}>
        <form onSubmit={(e) => {e.preventDefault(); handleSearch(searchQuery)}} style={{display:"inline-block"}}>
        <input type="text" placeholder="Search by ID, lender, or borrower..." onChange={(e) => setSearchQuery(e.target.value)} className='bg-[#000] w-[6cm] placeholder-[#fff] text-[#fff] text-[90%] outline-none' /><img src="images/search.png" width="20" className='ml-[0.2cm] cursor-pointer' onClick={(e) => {e.preventDefault(); handleSearch(searchQuery)}} style={{display:"inline-block"}}/>
        </form>
        </span>
      </div>

     {searchData.length > 0 ? 
      (<div className="my-[1cm] bg-[#000] p-[0.5cm] rounded-xl" style={{boxShadow:"2px 2px 2px 2px #222"}}>
        <div className="m-[-0.5cm] mb-[0.5cm] text-center px-[0.2cm] py-[0.3cm] bg-[#222] font-[500] rounded-t-xl viewloansdiv">Search results <img src="images/cancel.png" onClick={(e) => setshowLoanSection(false)} className="float-right cursor-pointer cancelbutton rounded-[100%]" width="30" style={{display:"inline-block"}} /></div>
        <div className="bg-[#111] viewloansdiv2 p-[0.5cm] rounded-xl" style={{boxShadow:"2px 2px 2px 2px #502"}}>
            <div className="overflow-auto">
        {searchedLoans.map((data) => (
        <div key={data.loan_id.toString()} className="p-[0.5cm] bg-[#000] rounded-xl mb-[0.5cm] overflow-auto">
            <div className="m-[0.2cm]"><span className="bg-[#222] rounded-md px-[0.3cm] py-[0.1cm] text-[80%] font-[500]" style={{border:"2px solid #333"}}>ID: {data.loan_id.toString()}</span></div>  
            <div className="m-[0.2cm] py-[0.1cm] mt-[0.4cm] overflow-auto"><span className="bg-[#502] rounded-md px-[0.3cm] py-[0.1cm] text-[80%]" style={{border:"2px solid #333"}}>Lender</span>{data.lender.toString() == "0x0000000000000000000000000000000000000000" ? (<span className="text-[#ff0]"> No lender yet</span>) : (<span> {data.lender.toString()}</span>)}</div>  
            <div className="m-[0.2cm]" style={{display:"inline-block"}}><span className="bg-[#502] rounded-md px-[0.3cm] py-[0.1cm] text-[80%]" style={{border:"2px solid #333"}}>Token to borrow</span> ETH</div>
            <div className="m-[0.2cm]" style={{display:"inline-block"}}><span className="bg-[#502] rounded-md px-[0.3cm] py-[0.1cm] text-[80%]" style={{border:"2px solid #333"}}>Amount to borrow</span> {parseFloat(((data.amount) * 10**-18).toString()).toFixed(10)} ETH</div>
            <div className="m-[0.2cm]" style={{display:"inline-block"}}><span className="bg-[#502] rounded-md px-[0.3cm] py-[0.1cm] text-[80%]" style={{border:"2px solid #333"}}>Interest</span> {data.interest.toString()}%</div>
            <div className="m-[0.2cm]" style={{display:"inline-block"}}><span className="bg-[#502] rounded-md px-[0.3cm] py-[0.1cm] text-[80%]" style={{border:"2px solid #333"}}>Repayment amount</span> {parseFloat(((data.repaymentAmount) * 10**-18).toString()).toFixed(10)} ETH</div>
            <div className="m-[0.2cm]" style={{display:"inline-block"}}><span className="bg-[#502] rounded-md px-[0.3cm] py-[0.1cm] text-[80%]" style={{border:"2px solid #333"}}>Loan expires</span> {new Date(data.fundingDeadline * 1000).toUTCString()}</div>
            <div className="m-[0.2cm]" style={{display:"inline-block"}}><span className="bg-[#502] rounded-md px-[0.3cm] py-[0.1cm] text-[80%]" style={{border:"2px solid #333"}}>Borrower</span> {data.borrower.toString()}</div>
            <div className="m-[0.2cm]" style={{display:"inline-block"}}><span className="bg-[#502] rounded-md px-[0.3cm] py-[0.1cm] text-[80%]" style={{border:"2px solid #333"}}>Collateral</span> 
            {(data.collateral.toString()) == tokenContractAddress && (<span> ULT</span>)} 
            {(data.collateral.toString()) == usdtContractAddress && (<span> USDT</span>)}
            {(data.collateral.toString()) == daiContractAddress && (<span> DAI</span>)}
            </div>
            <div className="m-[0.2cm]" style={{display:"inline-block"}}><span className="bg-[#502] rounded-md px-[0.3cm] py-[0.1cm] text-[80%]" style={{border:"2px solid #333"}}>Collateral amount</span> {parseFloat(((data.collateralAmount) * 10**-18).toString()).toFixed(10)}</div>
            <div className="m-[0.2cm]" style={{display:"inline-block"}}><span className="bg-[#502] rounded-md px-[0.3cm] py-[0.1cm] text-[80%]" style={{border:"2px solid #333"}}>Collateral ERC20 ?</span>
             {(data.isCollateralErc20) == true && (<span> yes</span>)} 
             {(data.isCollateralErc20) == false && (<span> no</span>)} 
            </div>
            <div className="m-[0.2cm]" style={{display:"inline-block"}}><span className="bg-[#502] rounded-md px-[0.3cm] py-[0.1cm] text-[80%]" style={{border:"2px solid #333"}}>Loan status</span> 
             {(data.active) == true && (<span className="text-[#0f0]"> open</span>)} 
             {(data.active) == false && (<span className="text-[#900]"> closed</span>)} 
            </div>
            <div className="m-[0.2cm]" style={{display:"inline-block"}}><span className="bg-[#502] rounded-md px-[0.3cm] py-[0.1cm] text-[80%]" style={{border:"2px solid #333"}}>Loan repayment</span> 
             {(data.repaid) == true && (<span className="text-[#0f0]"> Loan has been repaid</span>)} 
             {(data.repaid) == false && (<span className="text-[#ff0]"> Loan has not been repaid</span>)} 
            </div>
            {(((data.active) == true) & ((data.repaid) == false) & ((theWalletAddress).toLowerCase() != (data.borrower.toString()).toLowerCase())) ? (<div className="mt-[0.5cm] text-right"><button className="text-[#fff] fa-fade bg-[#040] rounded-md px-[0.3cm] py-[0.05cm] generalbutton4" style={{boxShadow:"1px 1px 1px 2px #ccc", animationDuration:"3s"}} onClick={(e) => fundLoanFromLoanList(data.loan_id.toString(), parseFloat(((data.amount) * 10**-18).toString()).toFixed(18))}>Fund loan <img src="images/loan.png" className="ml-[0.2cm]" width="20" style={{display:"inline-block"}} /></button></div>) : (<span></span>)}
        </div>
        ))}
        </div>
        <div className='my-[0.5cm]'>
          {Array.from({ length: Math.ceil(searchData.length / loansPerPage) }, (_, index) => (
            <button className='generalbutton bg-[#502] rounded-md px-[0.3cm] py-[0.1cm] mx-[0.2cm] text-[#fff]' key={index} onClick={() => paginate(index + 1)}>
              {index + 1}
            </button>
          ))}
       </div>
        </div>
        </div>)
            :
        (<div className="my-[1cm] bg-[#000] p-[0.5cm] rounded-xl" style={{boxShadow:"2px 2px 2px 2px #222"}}>
        <div className="m-[-0.5cm] mb-[0.5cm] text-center px-[0.2cm] py-[0.3cm] bg-[#222] font-[500] rounded-t-xl viewloansdiv">List of all available loans <img src="images/cancel.png" onClick={(e) => setshowLoanSection(false)} className="float-right cursor-pointer cancelbutton rounded-[100%]" width="30" style={{display:"inline-block"}} /></div>
        <div className="bg-[#111] viewloansdiv2 p-[0.5cm] rounded-xl" style={{boxShadow:"2px 2px 2px 2px #502"}}>
            <div className="overflow-auto">
        {currentLoans.map((data) => (
        <div key={data.loan_id.toString()} className="p-[0.5cm] bg-[#000] rounded-xl mb-[0.5cm] overflow-auto">
            <div className="m-[0.2cm]"><span className="bg-[#222] rounded-md px-[0.3cm] py-[0.1cm] text-[80%] font-[500]" style={{border:"2px solid #333"}}>ID: {data.loan_id.toString()}</span></div>  
            <div className="m-[0.2cm] py-[0.1cm] mt-[0.4cm] overflow-auto"><span className="bg-[#502] rounded-md px-[0.3cm] py-[0.1cm] text-[80%]" style={{border:"2px solid #333"}}>Lender</span>{data.lender.toString() == "0x0000000000000000000000000000000000000000" ? (<span className="text-[#ff0]"> No lender yet</span>) : (<span> {data.lender.toString()}</span>)}</div>  
            <div className="m-[0.2cm]" style={{display:"inline-block"}}><span className="bg-[#502] rounded-md px-[0.3cm] py-[0.1cm] text-[80%]" style={{border:"2px solid #333"}}>Token to borrow</span> ETH</div>
            <div className="m-[0.2cm]" style={{display:"inline-block"}}><span className="bg-[#502] rounded-md px-[0.3cm] py-[0.1cm] text-[80%]" style={{border:"2px solid #333"}}>Amount to borrow</span> {parseFloat(((data.amount) * 10**-18).toString()).toFixed(10)} ETH</div>
            <div className="m-[0.2cm]" style={{display:"inline-block"}}><span className="bg-[#502] rounded-md px-[0.3cm] py-[0.1cm] text-[80%]" style={{border:"2px solid #333"}}>Interest</span> {data.interest.toString()}%</div>
            <div className="m-[0.2cm]" style={{display:"inline-block"}}><span className="bg-[#502] rounded-md px-[0.3cm] py-[0.1cm] text-[80%]" style={{border:"2px solid #333"}}>Repayment amount</span> {parseFloat(((data.repaymentAmount) * 10**-18).toString()).toFixed(10)} ETH</div>
            <div className="m-[0.2cm]" style={{display:"inline-block"}}><span className="bg-[#502] rounded-md px-[0.3cm] py-[0.1cm] text-[80%]" style={{border:"2px solid #333"}}>Loan expires</span> {new Date(data.fundingDeadline * 1000).toUTCString()}</div>
            <div className="m-[0.2cm]" style={{display:"inline-block"}}><span className="bg-[#502] rounded-md px-[0.3cm] py-[0.1cm] text-[80%]" style={{border:"2px solid #333"}}>Borrower</span> {data.borrower.toString()}</div>
            <div className="m-[0.2cm]" style={{display:"inline-block"}}><span className="bg-[#502] rounded-md px-[0.3cm] py-[0.1cm] text-[80%]" style={{border:"2px solid #333"}}>Collateral</span> 
            {(data.collateral.toString()) == tokenContractAddress && (<span> ULT</span>)} 
            {(data.collateral.toString()) == usdtContractAddress && (<span> USDT</span>)}
            {(data.collateral.toString()) == daiContractAddress && (<span> DAI</span>)}
            </div>
            <div className="m-[0.2cm]" style={{display:"inline-block"}}><span className="bg-[#502] rounded-md px-[0.3cm] py-[0.1cm] text-[80%]" style={{border:"2px solid #333"}}>Collateral amount</span> {parseFloat(((data.collateralAmount) * 10**-18).toString()).toFixed(10)}</div>
            <div className="m-[0.2cm]" style={{display:"inline-block"}}><span className="bg-[#502] rounded-md px-[0.3cm] py-[0.1cm] text-[80%]" style={{border:"2px solid #333"}}>Collateral ERC20 ?</span>
             {(data.isCollateralErc20) == true && (<span> yes</span>)} 
             {(data.isCollateralErc20) == false && (<span> no</span>)} 
            </div>
            <div className="m-[0.2cm]" style={{display:"inline-block"}}><span className="bg-[#502] rounded-md px-[0.3cm] py-[0.1cm] text-[80%]" style={{border:"2px solid #333"}}>Loan status</span> 
             {(data.active) == true && (<span className="text-[#0f0]"> open</span>)} 
             {(data.active) == false && (<span className="text-[#900]"> Closed</span>)} 
            </div>
            <div className="m-[0.2cm]" style={{display:"inline-block"}}><span className="bg-[#502] rounded-md px-[0.3cm] py-[0.1cm] text-[80%]" style={{border:"2px solid #333"}}>Loan repayment</span> 
             {(data.repaid) == true && (<span className="text-[#0f0]"> Loan has been repaid</span>)} 
             {(data.repaid) == false && (<span className="text-[#ff0]"> Loan has not been repaid</span>)} 
            </div>
            {(((data.active) == true) & ((data.repaid) == false) & ((theWalletAddress).toLowerCase() != (data.borrower.toString()).toLowerCase())) ? (<div className="mt-[0.5cm] text-right"><button className="text-[#fff] fa-fade bg-[#040] rounded-md px-[0.3cm] py-[0.05cm] generalbutton4" style={{boxShadow:"1px 1px 1px 2px #ccc", animationDuration:"3s"}} onClick={(e) => fundLoanFromLoanList(data.loan_id.toString(), parseFloat(((data.amount) * 10**-18).toString()).toFixed(18))}>Fund loan <img src="images/loan.png" className="ml-[0.2cm]" width="20" style={{display:"inline-block"}} /></button></div>) : (<span></span>)}
        </div>
        ))}
        </div>
        <div className='my-[0.5cm]'>
          {Array.from({ length: Math.ceil(loanData.length / loansPerPage) }, (_, index) => (
            <button className='generalbutton bg-[#502] rounded-md px-[0.3cm] py-[0.1cm] mx-[0.2cm] text-[#fff]' key={index} onClick={() => paginate(index + 1)}>
              {index + 1}
            </button>
          ))}
       </div>
        </div>
        </div>)
          }

        </div>
    )
}