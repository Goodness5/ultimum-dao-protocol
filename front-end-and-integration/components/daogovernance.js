import { useState, useEffect } from "react";
export default function DAOgovernance ({daoContractReadSettings, daoContractAddress, daoContractABI, theWalletAddress}) {
    //styling for governance
    const [displayDAOFeature, setdisplayDAOFeature] = useState("viewProposals")
    const [joinDAOshadow, setjoinDAOshadow] = useState("#333")
    const [viewProposalsShadow, setviewProposalsShadow] = useState("#fff")
    const [createProposalsShadow, setcreateProposalsShadow] = useState("#333")
    const [voteProposalsShadow, setvoteProposalsShadow] = useState("#333")
    const [loading, setLoading] = useState()

    const showAndSetJoinDAO = () => {
        setdisplayDAOFeature("joinDAO")
        setjoinDAOshadow("#fff")
        setviewProposalsShadow("#333")
        setcreateProposalsShadow("#333")
        setvoteProposalsShadow("#333")
    }

    const showAndSetViewProposals = () => {
        setdisplayDAOFeature("viewProposals")
        setjoinDAOshadow("#333")
        setviewProposalsShadow("#fff")
        setcreateProposalsShadow("#333")
        setvoteProposalsShadow("#333")
    }

    const showAndSetCreateProposals = () => {
        setdisplayDAOFeature("createProposals")
        setjoinDAOshadow("#333")
        setviewProposalsShadow("#333")
        setcreateProposalsShadow("#fff")
        setvoteProposalsShadow("#333")
    }

    const showAndSetVoteProposals = () => {
        setdisplayDAOFeature("voteProposals")
        setjoinDAOshadow("#333")
        setviewProposalsShadow("#333")
        setcreateProposalsShadow("#333")
        setvoteProposalsShadow("#fff")
    }

          //first require ethers to connect
          const { ethers } = require("ethers"); 

    //read DAO details from DAO contract
    const [showUsername, setShowUsername] = useState()
    const [membershipStatus, setmembershipStatus] = useState()
    const [membership, setMembership] = useState()
    const [membershipStatusColor, setmembershipStatusColor] = useState()
    useEffect(()=>{
        const getTheData = async() => {
            try {
              const memberDetails = await daoContractReadSettings.members(theWalletAddress)
              console.log(memberDetails)
              const getusername = memberDetails._username.toString()
              console.log(getusername)
              setShowUsername(getusername)
              const getMembershipStatus = memberDetails.status
              console.log(getMembershipStatus)
              setmembershipStatus(getMembershipStatus)
             if (getMembershipStatus == true){
             setmembershipStatusColor("#00f")
             setMembership("member")
             }
             else if (getMembershipStatus == false){
             setmembershipStatusColor("#ff0")
             setMembership("non-member")
             }
            } catch (error) {
              console.log(error)
            }
          }
          getTheData();
    }, [theWalletAddress, showUsername, membership, membershipStatus, membershipStatusColor, loading])

    // function to join DAO
    const [username, setUsername] = useState()
    const joinTheDAO = async () => {
        setLoading(true)
        const ethereum = (window).ethereum;
        const accounts = await ethereum.request({
             method: "eth_requestAccounts",
         })
          // first account in MetaMask
         const walletAddress = accounts[0]; 
         const provider = new ethers.providers.Web3Provider(ethereum);
         const signer = provider.getSigner(walletAddress);
         const daoContractWriteSettings = new ethers.Contract(daoContractAddress, daoContractABI, signer)
         try {
            const joindao = await daoContractWriteSettings.connect(signer).addMember(walletAddress, username)
         } catch (error) {
            console.log(error)
            setLoading(false)
         }
         finally {
            setLoading(false)
         }
    }  

     // function to create proposals
     const [proposalDescription, setProposalDescription] = useState()
    const createAProposal = async () => {
        setLoading(true)
        const ethereum = (window).ethereum;
        const accounts = await ethereum.request({
             method: "eth_requestAccounts",
         })
          // first account in MetaMask
         const walletAddress = accounts[0]; 
         const provider = new ethers.providers.Web3Provider(ethereum);
         const signer = provider.getSigner(walletAddress);
         const daoContractWriteSettings = new ethers.Contract(daoContractAddress, daoContractABI, signer)
         try {
            const createproposal = await daoContractWriteSettings.connect(signer).createProposal(proposalDescription)
            showAndSetViewProposals()
         } catch (error) {
            console.log(error)
            setLoading(false)
         }
         finally {
            setLoading(false)
         }
    }

       // function to vote proposals
       const [proposalID, setProposalID] = useState()
       const [vote, setVote] = useState("true")
       const voteForProposal = async () => {
        setLoading(true)
        const ethereum = (window).ethereum;
        const accounts = await ethereum.request({
             method: "eth_requestAccounts",
         })
          // first account in MetaMask
         const walletAddress = accounts[0]; 
         const provider = new ethers.providers.Web3Provider(ethereum);
         const signer = provider.getSigner(walletAddress);
         const daoContractWriteSettings = new ethers.Contract(daoContractAddress, daoContractABI, signer)
         try {
            if (vote == "true"){const voteProposal = await daoContractWriteSettings.connect(signer).vote(proposalID, true)}
            else if (vote == "false"){const voteProposal = await daoContractWriteSettings.connect(signer).vote(proposalID, false)}
            showAndSetViewProposals()
         } catch (error) {
            console.log(error)
            setLoading(false)
         }
         finally {
            setLoading(false)
         }
       }

          // function to upvote proposals from view all proposals
       const upvoteProposalFromView = async (initialProposalID, initialValue) => {
        setLoading(true)
        const ethereum = (window).ethereum;
        const accounts = await ethereum.request({
             method: "eth_requestAccounts",
         })
          // first account in MetaMask
         const walletAddress = accounts[0]; 
         const provider = new ethers.providers.Web3Provider(ethereum);
         const signer = provider.getSigner(walletAddress);
         const daoContractWriteSettings = new ethers.Contract(daoContractAddress, daoContractABI, signer)
         try {
            const voteProposal = await daoContractWriteSettings.connect(signer).vote(initialProposalID, initialValue)
            showAndSetViewProposals()
         } catch (error) {
            console.log(error)
            setLoading(false)
         }
         finally {
            setLoading(false)
         }
       }

        // function to downvote proposals from view all proposals
       const downvoteProposalFromView = async (initialProposalID, initialValue) => {
        setLoading(true)
        const ethereum = (window).ethereum;
        const accounts = await ethereum.request({
             method: "eth_requestAccounts",
         })
          // first account in MetaMask
         const walletAddress = accounts[0]; 
         const provider = new ethers.providers.Web3Provider(ethereum);
         const signer = provider.getSigner(walletAddress);
         const daoContractWriteSettings = new ethers.Contract(daoContractAddress, daoContractABI, signer)
         try {
            const voteProposal = await daoContractWriteSettings.connect(signer).vote(initialProposalID, initialValue)
            showAndSetViewProposals()
         } catch (error) {
            console.log(error)
            setLoading(false)
         }
         finally {
            setLoading(false)
         }
       }
       

     // function to view proposals
     const [allProposals, setAllProposals] = useState([])
     const [numOfProposals, setnumOfProposals] = useState()
     useEffect(()=>{
        const viewAllProposals = async () => {
            try {
              const viewNumOfProposals = await daoContractReadSettings.proposalCount()
              setnumOfProposals(viewNumOfProposals)
                const proposals = [];
                for (let i = 0; i < viewNumOfProposals; i++) {
                const viewproposals = await daoContractReadSettings.proposals(i);
                proposals.push(viewproposals);
            }
            proposals.sort((a, b) => b.id - a.id);
            setAllProposals(proposals);
            } catch (error) {
                console.log(error)
            }
          }
          viewAllProposals();
     }, [allProposals, loading])

            // function to close proposals
            const closeProposal = async (defaultValueID) => {
             setLoading(true)
             const ethereum = (window).ethereum;
             const accounts = await ethereum.request({
                  method: "eth_requestAccounts",
              })
               // first account in MetaMask
              const walletAddress = accounts[0]; 
              const provider = new ethers.providers.Web3Provider(ethereum);
              const signer = provider.getSigner(walletAddress);
              const daoContractWriteSettings = new ethers.Contract(daoContractAddress, daoContractABI, signer)
              try {
                const closeproposal = await daoContractWriteSettings.connect(signer).closeProposal(defaultValueID)
              } catch (error) {
                 console.log(error)
                 setLoading(false)
              }
              finally {
                 setLoading(false)
              }
            }

      //search proposals functionality
    const [searchQuery, setSearchQuery] = useState()
    const [searchData, setSearchData] = useState([])
    const handleSearch = async () => {
      setLoading(true)
       try {
        const searchDataArray = []
        const getAllProposalsNumber = await daoContractReadSettings.proposalCount()
        for (let i=0; i < getAllProposalsNumber; i++){
          const anyProposalData = await daoContractReadSettings.proposals(i);
          const statement = anyProposalData.description.toLowerCase().split(' ')
          if (anyProposalData.id.toString() == searchQuery || statement.includes(searchQuery.toLowerCase())){
            searchDataArray.push(anyProposalData)  
          }
          searchDataArray.sort((a, b) => b.id - a.id)
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
            const proposalsPerPage = 5;
            const indexOfLastProposal = currentPage * proposalsPerPage;
            const indexOfFirstProposal = indexOfLastProposal - proposalsPerPage;
            const currentProposals = allProposals.slice(indexOfFirstProposal, indexOfLastProposal);
            const searchedProposals = searchData.slice(indexOfFirstProposal, indexOfLastProposal);
            const paginate = (pageNumber) => {
            setCurrentPage(pageNumber);
            };

    return (
       <div>
        <div className="pb-[1cm]">
            {showUsername ? (<span className="float-left"><img src="images/user-gear.png" width="19" style={{display:"inline-block"}} /><span className="ml-[0.2cm]">{showUsername}</span></span>) : (<span></span>)}
            <span className="float-right" style={{color:membershipStatusColor}}>{membership}</span>
        </div>
        
        <div className="text-center">
        {membershipStatus == true ? (<span></span>) : (<button onClick={(e) => showAndSetJoinDAO(e)} className="font-[500] bg-[#00f] px-[0.4cm] py-[0.15cm] rounded-md m-[0.4cm] joindao" style={{boxShadow:`2px 2px 2px 2px ${joinDAOshadow}`}}>Join DAO</button>)}
          <button onClick={(e) => showAndSetViewProposals(e)} className="font-[500] bg-[#00f] px-[0.4cm] py-[0.15cm] rounded-md m-[0.4cm]" style={{boxShadow:`2px 2px 2px 2px ${viewProposalsShadow}`}}>View Proposals</button>
          <button onClick={(e) => showAndSetCreateProposals(e)} className="font-[500] bg-[#00f] px-[0.4cm] py-[0.15cm] rounded-md m-[0.4cm]" style={{boxShadow:`2px 2px 2px 2px ${createProposalsShadow}`}}>Create a Proposal</button>
          <button onClick={(e) => showAndSetVoteProposals(e)} className="font-[500] bg-[#00f] px-[0.4cm] py-[0.15cm] rounded-md m-[0.4cm]" style={{boxShadow:`2px 2px 2px 2px ${voteProposalsShadow}`}}>Vote for a Proposal</button>
        </div> 

        <div className="mt-[1cm]">
        {displayDAOFeature === "joinDAO" && 
        (<div data-aos="zoom-out" className="rounded-xl bg-[#111] lg:mx-[20%] p-[0.5cm]" style={{boxShadow:"2px 2px 2px 2px #00f"}}>
            <form>
            <div className="mb-[1cm]">
             <label className="font-[500] bg-[#000] px-[0.4cm] py-[0.15cm] rounded-md" style={{boxShadow:"2px 2px 2px 2px #333"}}>Username</label><br />
             <input type="text" required className="w-[100%] bg-[rgba(0,0,0,0)] mt-[0.8cm] py-[0.2cm] px-[0.2cm] outline-none rounded-b-xl text-[#eee] placeholder-[#eee]" name="username" id="username" onChange={(e) => setUsername(e.target.value)} placeholder="Choose a username" style={{borderBottom:"2px solid #333"}} />
            </div>
            <div className="mb-[1cm]">
             <label className="font-[500] bg-[#000] px-[0.4cm] py-[0.15cm] rounded-md" style={{boxShadow:"2px 2px 2px 2px #333"}}>Wallet Address</label><br />
             {theWalletAddress ? (<input type="text" className="w-[100%] bg-[rgba(0,0,0,0)] mt-[0.8cm] pb-[0.2cm] px-[0.2cm] outline-none rounded-b-xl text-[#eee] placeholder-[#eee]" value={theWalletAddress} style={{borderBottom:"2px solid #333"}} />) :
             (<input type="text" className="w-[100%] bg-[rgba(0,0,0,0)] mt-[0.8cm] py-[0.2cm] px-[0.2cm] outline-none rounded-b-xl text-[#eee] placeholder-[#eee]" value="Connect wallet to see wallet address" style={{borderBottom:"2px solid #333"}} />)}
            </div>
            <button type="submit" onClick={(e) => {e.preventDefault(); joinTheDAO(username)}} className="w-[100%] font-[500] bg-[#502] px-[0.4cm] py-[0.15cm] rounded-md generalbutton" style={{boxShadow:"2px 2px 2px 2px #777"}}>Click to Join DAO</button>
            </form>
        </div>)
        }

        {displayDAOFeature === "viewProposals" && 
         (<div data-aos="zoom-out" className="rounded-xl bg-[#000] lg:mx-[20%] p-[0.5cm]">
          {allProposals.length > 0 && 
          (<div className='text-center mb-[0.7cm] mt-[-0.3cm]'>
        <span className='bg-[#000] text-[#fff] px-[0.5cm] py-[0.2cm] rounded-full' style={{border:"2px solid #502"}}>
        <form onSubmit={(e) => {e.preventDefault(); handleSearch(searchQuery)}} style={{display:"inline-block"}}>
        <input type="text" placeholder="Search by ID or description..." onChange={(e) => setSearchQuery(e.target.value)} className='bg-[#000] w-[5cm] placeholder-[#fff] text-[#fff] text-[90%] outline-none' /><img src="images/search.png" width="20" className='ml-[0.2cm] cursor-pointer' onClick={(e) => {e.preventDefault(); handleSearch(searchQuery)}} style={{display:"inline-block"}}/>
        </form>
        </span>
         </div>)}

          {searchData.length > 0 ?
            (<div className="overflow-auto">
            {searchedProposals.map((proposal) => (
          <div key={(proposal.id).toString()} className="p-[0.5cm] bg-[#111] rounded-xl mb-[0.5cm]">
          <div className="bg-[#502] rounded-md px-[0.3cm] py-[0.1cm] text-[80%] proposalid m-[0.1cm]" style={{border:"2px solid #333", display:"inline-block"}}>ID: {(proposal.id).toString()}</div><div className="lg:float-right bg-[#502] rounded-md px-[0.3cm] py-[0.1cm] text-[80%] proposer m-[0.1cm]" style={{border:"2px solid #333", display:"inline-block"}}>Proposer: {(proposal.creator).substring(0, 5)}...{(proposal.creator).substring(37, 42)}</div>
          <div className="clear-both mt-[0.2cm] text-[#00f] text-[80%]">
            <span>{(new Date((proposal.time_created) * 1000)).toUTCString()}</span> 
            {proposal.status == true && (<span className="text-[#0f0] ml-[0.2cm]">Ongoing</span>)}
            {proposal.status == false && (<span className="text-[#900] ml-[0.2cm]">Closed</span>)}
          </div>
          <div>
              <div className="proposal mt-[0.3cm]">{proposal.description}</div>
              <div className="mt-[0.5cm]">
                  <div style={{display:"inline-block"}}><img src="images/up-arrow.png" width="20" className="cursor-pointer" onClick={(e) => {e.preventDefault(); upvoteProposalFromView((proposal.id).toString(), true)}} style={{display:"inline-block"}}/> <span>{Intl.NumberFormat().format((proposal.forVotes).toString())}</span></div>
                  <div className="ml-[1cm]" style={{display:"inline-block"}}><img src="images/down-arrow.png" width="20" className="cursor-pointer" onClick={(e) => {e.preventDefault(); downvoteProposalFromView((proposal.id).toString(), false)}} style={{display:"inline-block"}}/> <span>{Intl.NumberFormat().format((proposal.againstVotes).toString())}</span></div>
                  {((proposal.creator).toLowerCase() === theWalletAddress &  proposal.status == true) ? (<div className="mt-[0.5cm] text-right"><span className="cursor-pointer" onClick={(e) => {e.preventDefault(); closeProposal((proposal.id).toString())}}><span className="text-[80%]">Close Proposal</span> <img src="images/crossed.png" width="20" style={{display:"inline-block"}}/></span></div>) : (<span></span>)}
              </div>
          </div>
        </div> 
            ))}  
            <div className='my-[0.5cm]'>
          {Array.from({ length: Math.ceil(searchData.length / proposalsPerPage) }, (_, index) => (
            <button className='generalbutton bg-[#502] rounded-md px-[0.3cm] py-[0.1cm] mx-[0.2cm] text-[#fff]' key={index} onClick={() => paginate(index + 1)}>
              {index + 1}
            </button>
          ))}
          </div>         
          </div>
        ) : 
        (<div className="overflow-auto">
        {currentProposals.map((proposal) => (
      <div key={(proposal.id).toString()} className="p-[0.5cm] bg-[#111] rounded-xl mb-[0.5cm]">
      <div className="bg-[#502] rounded-md px-[0.3cm] py-[0.1cm] text-[80%] proposalid m-[0.1cm]" style={{border:"2px solid #333", display:"inline-block"}}>ID: {(proposal.id).toString()}</div><div className="lg:float-right bg-[#502] rounded-md px-[0.3cm] py-[0.1cm] text-[80%] proposer m-[0.1cm]" style={{border:"2px solid #333", display:"inline-block"}}>Proposer: {(proposal.creator).substring(0, 5)}...{(proposal.creator).substring(37, 42)}</div>
      <div className="clear-both mt-[0.2cm] text-[#00f] text-[80%]">
        <span>{(new Date((proposal.time_created) * 1000)).toUTCString()}</span> 
        {proposal.status == true && (<span className="text-[#0f0] ml-[0.2cm]">Ongoing</span>)}
        {proposal.status == false && (<span className="text-[#900] ml-[0.2cm]">Closed</span>)}
      </div>
      <div>
          <div className="proposal mt-[0.3cm]">{proposal.description}</div>
          <div className="mt-[0.5cm]">
              <div style={{display:"inline-block"}}><img src="images/up-arrow.png" width="20" className="cursor-pointer" onClick={(e) => {e.preventDefault(); upvoteProposalFromView((proposal.id).toString(), true)}} style={{display:"inline-block"}}/> <span>{Intl.NumberFormat().format((proposal.forVotes).toString())}</span></div>
              <div className="ml-[1cm]" style={{display:"inline-block"}}><img src="images/down-arrow.png" width="20" className="cursor-pointer" onClick={(e) => {e.preventDefault(); downvoteProposalFromView((proposal.id).toString(), false)}} style={{display:"inline-block"}}/> <span>{Intl.NumberFormat().format((proposal.againstVotes).toString())}</span></div>
              {((proposal.creator).toLowerCase() === theWalletAddress &  proposal.status == true) ? (<div className="mt-[0.5cm] text-right"><span className="cursor-pointer" onClick={(e) => {e.preventDefault(); closeProposal((proposal.id).toString())}}><span className="text-[80%]">Close Proposal</span> <img src="images/crossed.png" width="20" style={{display:"inline-block"}}/></span></div>) : (<span></span>)}
          </div>
      </div>
    </div> 
        ))}  
        <div className='mt-[0.5cm]'>
      {Array.from({ length: Math.ceil(allProposals.length / proposalsPerPage) }, (_, index) => (
        <button className='generalbutton bg-[#502] rounded-md px-[0.3cm] py-[0.1cm] mx-[0.2cm] text-[#fff]' key={index} onClick={() => paginate(index + 1)}>
          {index + 1}
        </button>
      ))}
      </div>         
      </div>)
        }  
        </div>)
        }

        {displayDAOFeature === "createProposals" && 
        (<div data-aos="zoom-out" className="rounded-xl bg-[#111] lg:mx-[20%] p-[0.5cm]" style={{boxShadow:"2px 2px 2px 2px #00f"}}>
        <form>
        <div className="mb-[1cm]">
         <label className="font-[500] bg-[#000] px-[0.4cm] py-[0.15cm] rounded-md" style={{boxShadow:"2px 2px 2px 2px #333"}}>Proposal Description</label><br />
         <textarea required className="w-[100%] bg-[rgba(0,0,0,0)] mt-[0.8cm] h-[3cm] p-[0.5cm] outline-none rounded-xl text-[#eee] placeholder-[#eee]" name="proposalDescription" id="proposalDescription" onChange={(e) => setProposalDescription(e.target.value)} placeholder="Write a description for your proposal" style={{border:"2px solid #333"}} />
        </div>
        <div className="mb-[1cm]">
         <label className="font-[500] bg-[#000] px-[0.4cm] py-[0.15cm] rounded-md" style={{boxShadow:"2px 2px 2px 2px #333"}}>Proposer</label><br />
         {theWalletAddress ? (<input type="text" className="w-[100%] bg-[rgba(0,0,0,0)] mt-[0.8cm] pb-[0.2cm] px-[0.2cm] outline-none rounded-b-xl text-[#eee] placeholder-[#eee]" value={theWalletAddress} style={{borderBottom:"2px solid #333"}} />) :
         (<input type="text" className="w-[100%] bg-[rgba(0,0,0,0)] mt-[0.8cm] py-[0.2cm] px-[0.2cm] outline-none rounded-b-xl text-[#eee] placeholder-[#eee]" value="Connect wallet to see your wallet address" style={{borderBottom:"2px solid #333"}} />)}
        </div>
        <button type="submit" onClick={(e) => {e.preventDefault(); createAProposal(proposalDescription)}} className="w-[100%] font-[500] bg-[#502] px-[0.4cm] py-[0.15cm] rounded-md generalbutton" style={{boxShadow:"2px 2px 2px 2px #777"}}>Click to Create a Proposal</button>
        </form>
        </div>)
        }

        {displayDAOFeature === "voteProposals" && 
     (<div data-aos="zoom-out" className="rounded-xl bg-[#111] lg:mx-[20%] p-[0.5cm]" style={{boxShadow:"2px 2px 2px 2px #00f"}}>
     <form>
     <div className="mb-[1cm]">
      <label className="font-[500] bg-[#000] px-[0.4cm] py-[0.15cm] rounded-md" style={{boxShadow:"2px 2px 2px 2px #333"}}>Proposal ID</label><br />
      <input type="text" required className="w-[100%] bg-[rgba(0,0,0,0)] mt-[0.8cm] py-[0.2cm] px-[0.2cm] outline-none rounded-b-xl text-[#eee] placeholder-[#eee]" name="proposalid" id="proposalid" onChange={(e) => setProposalID(e.target.value)} placeholder="Input ID of proposal" style={{borderBottom:"2px solid #333"}} />
     </div>
     <div className="mb-[1cm]">
      <label className="font-[500] bg-[#000] px-[0.4cm] py-[0.15cm] rounded-md" style={{boxShadow:"2px 2px 2px 2px #333"}}>Vote</label><br />
      <div className="px-[0.4cm]">
        <div><input type="radio" className="bg-[rgba(0,0,0,0)] mt-[1cm] outline-none" name="vote" id="true" value="true" onChange={(e) => setVote(e.target.value)} /><span className="ml-[0.2cm]">Upvote</span></div>
        <div><input type="radio" className="bg-[rgba(0,0,0,0)] mt-[0.5cm] outline-none" name="vote" id="false" value="false" onChange={(e) => setVote(e.target.value)} /><span className="ml-[0.2cm]">Downvote</span></div>
    </div>
     </div>
     <div className="mb-[1cm]">
      <label className="font-[500] bg-[#000] px-[0.4cm] py-[0.15cm] rounded-md" style={{boxShadow:"2px 2px 2px 2px #333"}}>Voter</label><br />
      {theWalletAddress ? (<input type="text" className="w-[100%] bg-[rgba(0,0,0,0)] mt-[0.8cm] py-[0.2cm] px-[0.2cm] outline-none rounded-b-xl text-[#eee] placeholder-[#eee]" value={theWalletAddress} style={{borderBottom:"2px solid #333"}} />) :
      (<input type="text" className="w-[100%] bg-[rgba(0,0,0,0)] mt-[0.8cm] py-[0.2cm] px-[0.2cm] outline-none rounded-b-xl text-[#eee] placeholder-[#eee]" value="Connect wallet to see your wallet address" style={{borderBottom:"2px solid #333"}} />)}
     </div>
     <button type="submit" onClick={(e) => {e.preventDefault(); voteForProposal(proposalID, vote)}} className="w-[100%] font-[500] bg-[#502] px-[0.4cm] py-[0.15cm] rounded-md generalbutton" style={{boxShadow:"2px 2px 2px 2px #777"}}>Click to Vote for a Proposal</button>
     </form>
     </div>)
        }
        </div> 

    {loading ? 
     (<div className='bg-[rgba(0,0,0,0.8)] text-[#000] text-center w-[100%] h-[100%] top-0 right-0 rounded-xl' style={{position:"fixed", zIndex:"9999"}}>
      <div className='loader mx-[auto] lg:mt-[20%] md:mt-[40%] mt-[70%]'></div>
      </div>) : (<span></span>)  
    }

       </div>
    )
}