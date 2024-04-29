# Ultimum Protocol Documentation [Web App](https://ultimum-protocol.vercel.app)
Ultimum Protocol is a DAO-governed DeFi protocol that aims to solve the problems of decentralisation and flexibility in the usage of blockchain based products. With a robust combination of smart contracts and front end and integration tools, Ultimum provides a seamless experience to users of the platform. With our user-first approach, by becoming a member of the DAO, a user has the opportunity to access more of Ultimum's products, make decisions through the DAO's governance and get rewarded potentially for contributions to the governance of the DAO. Ultimum aims to revolutionize the DeFi world through our products, for example, the time-framing method of staking where users have control over their staked assets (stake and unstake at any time during a time-frame chosen by you). By integrating with ChainLink oracles, the Ultimum Swap with which users can swap their favorite tokens provides the best user experience to users. Technically, the swap is being governed by the DAO such that tokens can only be added/removed when members of the DAO approve of them. Economically, Ultimum will use the trading fees from the Ultimum dApps to maintain the Ultimum Treasury. The Ultimum Token (ULT) is backed by the Treasury. Ultimum Protocol also provides a P2P lending and borrowing dApp that is governed by the DAO. With a focus on gas optimisation, Ultimum is deployed on Scroll (Sepolia) a Layer 2 blockchain, such that users won't have to worry about gas fees which are relatvely small (about x10 lesser than Ethereum). The Ultimum dashboard allows for simplicity and easy access to Ultimum's products and yes, your assets and records on the platform which can only be accessed by you using your wallet to login. If you want to get the best value out of your assets, visit Ultimum.

## Features of Ultimum Protocol
This protocol features a robust combination of smart contracts and front end and integration tools ranging from a DAO, Swap dApp, Staking dApp, Lending/Borrowing dApp, ChainLink Oracles, a Dashboard, "Live market charts, Live token prices, Blockchain insights integration (using the Trading View API)", wallet connect, newsletter (using Nodemailer), blog(with admin sign up, sign in and admin dashboard), documentation, Filebase storage, search functionalities, paginations, flaticons library, and an intuitive interface with a slick responsive design and smooth user experience.

## Tools used to create Ultimum Protocol
### Smart Contract Tools
Solidity, Foundry, ChainLink Oracles. OpenZeppelin

### Front end and Integration Tools
Ethers.js, Scrollscan Token Tracker, Next.js, Node.js, JavaScript, Tailwind CSS, Trading View widgets API, Filebase storage, PostgreSQL

## The Ultimum Protocol's Products

### Connect Wallet
To connect wallet, go to our [Web App](https://ultimum-protocol.vercel.app). For desktop, install Metamask or Trust wallet or any other EVM-compatible wallet of your choice on your device's browser (Brave browser or Google Chrome or Opera browser), and on mobile, simply download your desired EVM-compatible wallet and use its browser to connect to the platform. Connect your wallet by clicking on the "Connect wallet" button on the upper right of the screen. Ensure to change network to Testnet, then  Scroll Sepolia test network on your wallet. The display on the screen will change after connecting. If you don't have Scroll Sepolia on your list of networks, simply go to [ChainList](https://chainlist.org) to obtain the configurations and add the network to your wallet. We are using the Ethers.js library for the wallet connect button as it suits our requirements for the project.

### Get Scroll test ETH for gas fees payments
With Ultimum Protocol being deployed currently on Scroll Sepolia, testnet ETH would definitely be required to pay for gas fees during transactions. Scroll test ETH can be obtained on the Scroll testnet faucet. Deployment of the project on  mainnet would mean Scroll mainnet ETH for gas fees.

### Web app homepage
The homepage of the Ultimum Protocol's web app is the first page you see when you visit the app. It links to the Ultimum dashboard and features the wallet connect button as well as other important information about the protocol including documentation, social media links, forum, team of developers, blog, newsletter subscription, blockchain insights with Trading View integration and live market chart of your favorite cryptocurrencies.

 ### The Ultimum Protocol Dashboard
This is the most functional part of the Ultimum Protocol. It houses the most important parts of the protocol including User's Balances, Protocol Metrics, DAO Governance, Swap dApp,Stake dApp, Lending/Borrowing dApp, Wallet connect, Live market chart, Live token prices etc. 

### User's Balances
This section of the dashboard shows all the balances of a user after logging in with wallet. It displays the following info for a user: ULT balance, ULT price, ETH balance, Staked tokens (by token symbols), Total staking reward and last active time on DAO which shows the time of your last activity on the DAO.

### Protocol Metrics
Protocol metrics section shows live updates to the Ultimum protocol including the following: ULT Total Supply, ULT Price, Protocol Deployment Blockchain, Stakeable Tokens (by token symbols), Amount of ULT in Treasury, Number of Loans, Max Loan Amount, Min Loan Amount, Amount of ETH in Swap, Number of DAO Members, Number of DAO Proposals, contract addresses of all contracts used by the protocol and Live market chat.

### DAO Governance
The Ultimum DAO is the powerhouse of the Ultimum protocol. It determines the next direction of the protocol through voting by members of the DAO. Using the DAO as a powerful tool, Ultimum protocol users are able to engage in governance and that includes but not limited to decision making, creation of proposals, view proposal details and voting activities to steer the ecosystem forward. This democratic approach ensures transparency and decentralisation in the protocol. The DAO also decides tokens to be used in the Swap, Staking and Lend and Borrow dApps. The default tokens available as at the time of writing this documentation are: ULT, ETH, USDT and DAI. To enjoy full DAO benefits, become an active member and get rewarded with ULT for your contributions to the governance of the DAO.

### How to Participate in the Governance of the DAO

#### Join DAO
To join the DAO, firstly, a user has to obtain at least 2,000 ULT tokens and stake 1,000 ULT to obtain the Ultimum Soulbound NFT which is sent to your wallet automatically. The NFT gives you access to the DAO. For non-members, the process of obtaining the NFT is the page you will see in the DAO section. After obtaining the NFT, the system automatically redirects you to the governance of the DAO. On the Join DAO tab, you will be required to register a username, then you can click on the "Click to Join DAO" button. Your wallet address will be associated with your chosen username and your membership status will be updated to "member". The Join DAO tab will disappear after your registration is successful.

#### View Proposals
This is the part of the DAO where all proposals made in the DAO are being displayed for all members to see and vote for. A proposal can be anything ranging from decisions in the DAO, tokens to add to any of the dApps (Swap, Staking, Lend/Borrow) and which service should be added to/removed from the protocol. Only the DAO decides which token to add to any of the dApps. The View Proposals section shows the proposal description, the proposer, ID of proposal, date of proposal, status of proposal, number of upvotes, number of downvotes and a "Close Proposal" button which is only visible to the proposer of a particular proposal. Typically, a proposal runs for at least 7 days and can only be closed after 7 days by the proposer (the proposal can be left open for as long as the proposer wants). The system uses the difference in upvotes and downvotes to determine if a proposal will be approved by the community. Obviously, a higher number of upvotes means a proposal will be approved. A pagination effect has been integrated to help our users navigate between proposals with ease.

#### Create a Proposal
Creation of proposals requires you to input a proposal description. Clearly describe your proposal for all members to understand. A proposal can be anything ranging from decisions in the DAO, tokens to add to any of the dApps (Swap, Staking, Lend/Borrow) and which service should be added to/removed from the protocol. Then click on the "Click to Create a Proposal" button to submit your proposal. The system automatically associates your proposal with your wallet address, and as such, you are the only one with the right to close that proposal.

 #### Vote for a Proposal
Voting is being done to determine if a proposal will be accepted or not. Members of the DAO can upvote or downvote a proposal. To vote for a proposal, click on the "Vote for a Proposal" tab, and input ID of proposal and click on either upvote or downvote, then submit vote. Your vote will be associated with your wallet address and it will count on the "View Proposals" page. For transparency in the governance of the DAO, the number of upvotes and downvotes are being displayed. You cannot vote more than once for a proposal. If there is a higher number of upvotes, a proposal will be approved. But if there is a higher number of downvotes, the proposal will be rejected and as such will not be implemented.

### Swap dApp
With a ChainLink Oracle integration, live token data and user-first approach, our users experience decentralized finance and can therefore use the Ultimum Protocol swap dApp to swap a variety of supported tokens with low gas fees (10x lesser than Ethereum). Our swap dApp is designed to provide the best user experience and interface to our users. Ensure you have set network to the Scroll Sepolia test network on your wallet and enjoy a seamless swap dApp experience.

### Staking (Time-frame) dApp
Ultimum Protocol is driving the blockchain sector into the self-banking age with actual advancements, and thus lets you earn smart money in a variety of ways. Among them is the time-framing method of staking where you experience full flexibility of your tokens without fear of money being locked up or fear of assets being lost. Time-frame your Ultimum tokens (ULT) over a set period chosen by you to gain instant huge rewards from the ecosystem. Ultimum Protocol will use this new technology to more properly communicate value, allowing you to better control your financial future and capitalize on the value of your money over time. When you stake your tokens, you have the freedom to claim rewards and unstake at anytime, unlike other staking platforms where your assets are locked up without access to them during a time duration predetermined by their systems. The Ultimum staking dApp displays your token balance, amount staked, reward accrued, stake start date, and chosen time duration of stake. Note that unstaking before the chosen time duration incurs a penalty.

### P2P Lend/Borrow dApp
Our users are able to participate in P2P lending/borrowing activities of supported tokens. Firstly, a loan has to be created by the borrower, then another user funds the loan by lending to the borrower. The loan has the following characteristics: loan amount, interest, expiry date, and collateral. Collateral provided by the borrower is locked up by the system until the given duration expires. The collateral is sent out to the lender if the borrower fails to repay the loan during the specified time. When you lend to Ultimum, you get rewarded hugely according to the agreed terms of the loan (your funds are secured with our security algorithm). When you borrow from Ultimum P2P, ensure to present a collateral and pay back with interest when you repay the amount. For a better user experience, a "view all available loans" section with search functionality and pagination has been integrated into the dApp for lenders to navigate between loans and choose from. Participate in Ultimum DAO governance to determine the next supported collateral. 

### Ultimum Token/Treasury
The Ultimum token (ULT) is the native token of the Ultimum Protocol and is backed by the Ultimum treasury. The Ultimum treasury ensures effective management of the Ultimum token (ULT) and liquidity and minimize risks. This treasury will also optimize financial operations that support product development. If per adventure, ULT goes below 100% of its initial value during the bear market, the treasury acts as a liquidity provider to manage the token price and ensure its stability across all platforms.

### The Ultimum Blog
We want to kepp our users updated on the latest improvements and progress of the Ultimum Protocol. For that reason, a blog has been integrated on the Ultimum web app (using PostgreSQL and Filebase storage). Click on the "Blog" button on the homepage to access the blog. It features an "all posts" section, single posts section, a sidebar, a search functionality and a pagination functionality to navigate between posts. To control the blog, admin sign up, admin sign in and an admin dashboard have been created to add, update or delete blog posts.

## Additional Notes
In future upgrades of this project, a chat system will be implemented for the Ultimum P2P Lending/Borrowing dApp. A more sophisticated wallet connect approach will also be implemented. More dApp features and oracles will also be integrated.

## Team Members (Team Ultimate)
* Patrick Ominisan - Blockchain developer (Web3Bridge)
* Kolapo Goodness - Smart contract developer (Web3Bridge)


# Contract Addresses

## Treasury Contract

✅ [Treasury](https://sepolia.scrollscan.com/address/0x3dDdC4936ec019a18A3E2fF384aC9a655Cba4B66) 🟢
- Address: `0x3dDdC4936ec019a18A3E2fF384aC9a655Cba4B66`

## DAO Contract

✅ [DAO](https://sepolia.scrollscan.com/address/0xF20bbD18ce7a01382555fe8Bc9818ccfa1CC34Bf) 🟢
- Address: `0xF20bbD18ce7a01382555fe8Bc9818ccfa1CC34Bf`

## StakeERC20 (Time-frame) Contract

✅ [StakERC20](https://sepolia.scrollscan.com/address/0xC6AffA69811AECd5288fBEa2d80EA31C591086e1) 🟢
- Address: `0xC6AffA69811AECd5288fBEa2d80EA31C591086e1`

## P2P Lending/Borrowing Contract

✅ [P2PLending](https://sepolia.scrollscan.com/address/0xDbd7b0441C93E9C058afCF0246CC2a704433085B) 🟢
- Address: `0xDbd7b0441C93E9C058afCF0246CC2a704433085B`

## Swap Contract

✅ [Swapper](https://sepolia.scrollscan.com/address/0x87168FbdfB6859ABa9e53ad2Ff233E6604754084) 🟢
- Address: `0x87168FbdfB6859ABa9e53ad2Ff233E6604754084`

## Ultimum Erc20 (ULT) Contract

✅ [Ultimum](https://sepolia.scrollscan.com/address/0x56AFA932a2e147F956EC4b8E83Fb8Cb373f1661A) 🟢
- Address: `0x56AFA932a2e147F956EC4b8E83Fb8Cb373f1661A`

## Ultimum NFT Contract

✅ [UltNft](https://sepolia.scrollscan.com/address/0x3a2c25D1b2976Cc4897BDF9448ca929BCC1dFbDf) 🟢
- Address: `0x3a2c25D1b2976Cc4897BDF9448ca929BCC1dFbDf`

# Other Tokens

## USDT

- **[USDT](https://sepolia.scrollscan.com/address/0x1d5cd5833f43c63f724ebb0f28c6aaed79bf5bf2)**: 0x1d5cd5833f43c63f724ebb0f28c6aaed79bf5bf2

## DAI

- **[DAI](https://sepolia.scrollscan.com/address/0xe9c49311b81545cced67ab3313c8f4f938ba1920)**: 0xe9c49311b81545cced67ab3313c8f4f938ba1920
