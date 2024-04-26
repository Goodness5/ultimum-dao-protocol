import { useEffect, useState } from 'react';

export default function ConnectDisconnectWallet () {
      // wallet connection instructions (using the ethers.js library)
  const [connectWallet, setConnectWallet] = useState(true)
  const [connectedWallet, setConnectedWallet] = useState(false)
  const [theWalletAddress, setTheWalletaddress] = useState()
  //to connect our wallet
  //we will use cookies to ensure consistency of the connecting button on all pages of the application
  const cookie = require('cookie');
  const { ethers } = require("ethers");    //require ethers to connect
  const connecttheWallet = async (e) => {
    try {
      e.preventDefault();
      const ethereum = (window).ethereum;
      const accounts = await ethereum.request({
           method: "eth_requestAccounts",
       })
        // first account in MetaMask
       const walletAddress = accounts[0]; 
       const provider = new ethers.providers.Web3Provider(ethereum);
       const signer = provider.getSigner(walletAddress);

      console.log(walletAddress)
      setTheWalletaddress(walletAddress)
      
       // Update state
       setConnectedWallet(true);
       setConnectWallet(false);  

     // Set the wallet address as a cookie on the browser
     document.cookie = `walletaddresscookie1=${encodeURIComponent(walletAddress)}; secure; max-age=${60 * 60 * 24}; sameSite=strict; path=/`;
    } catch (error) {
      console.log('Error connecting to StarkNet:', error.message);
    }
  };

  // this ensures continous mounting of the connecting button and it runs once using the useEffect hook
  useEffect(() => {
 const confirmCookies = () => {
  // to check if the wallet address cookie is present
  const walletCookie1 = document.cookie
    .split(';')
    .find((cookie) => cookie.trim().startsWith('walletaddresscookie1='));

  if (walletCookie1) {
    // Extracting the wallet address from the cookie
    const walletAddress = decodeURIComponent(walletCookie1.split('=')[1]);

    // Update state
    setConnectedWallet(true);
    setConnectWallet(false);
    setTheWalletaddress(walletAddress);
  }
   else {
     // Update state
     setConnectedWallet(false);
     setConnectWallet(true);
   }
};
  confirmCookies();
}, [setConnectedWallet, setConnectWallet, setTheWalletaddress]); 


  //to disconnect our wallet
  const disconnectWallet = async(e) => {
    e.preventDefault();
    setConnectedWallet(false)
    setConnectWallet(true)
      // Delete the wallet address cookie
    document.cookie = 'walletaddresscookie1=; max-age=0; path=/';
  } 
    return (
        <div>
        {connectWallet ? (<span className="bg-[#001] px-[0.5cm] py-[0.2cm] text-center font-[600] rounded-full cursor-pointer connectwalletbutton" style={{border:"2px solid #502"}} onClick={(e) => connecttheWallet(e)}><img src="images/wallet.png" width="23" style={{display:"inline-block"}} /> &nbsp; Connect wallet</span>) : (<div></div>)}
        {connectedWallet ? (<span className="bg-[#002] px-[0.5cm] py-[0.2cm] text-center font-[600] rounded-full cursor-pointer disconnectwalletbutton" style={{boxShadow:"2px 2px 5px 2px #00f"}} onClick={(e) => disconnectWallet(e)}><img src="images/wallet.png" width="23" style={{display:"inline-block"}} /> &nbsp; Connected &nbsp; {theWalletAddress.substring(0, 5)}...{theWalletAddress.substring(37, 42)}</span>) : (<div></div>)}
        </div>
    )
}