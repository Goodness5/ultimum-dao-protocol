# Ultimum Protocol Documentation [Web App](https://ultimum-protocol.vercel.app)
The Ultimum Protocol is a DAO-governed DeFi protocol that seeks to address several issues, including lending and borrowing through its P2P Lending/Borrowing dApp, staking using the time-framing method, swapping using ChainLink oracles, and decentralisation through the Ultimum DAO. Utilising a strong blend of front end, integration, and smart contract technologies, Ultimum offers platform users a smooth experience. 
As a result of our user-first approach, members of the DAO can access a greater range of Ultimum products, participate in the governance process to make decisions, and even get rewards for their contributions to the DAO's governance. With its solutions, such as the time-framing staking mechanism that gives users control over their staked assets (allowing them to stake and unstake at any time within a timeframe of their choosing), Ultimum seeks to revolutionise the DeFi industry. The Ultimum Swap, which allows users to swap their preferred tokens, offers the optimal user experience by integrating with ChainLink oracles. 
In theory, the DAO is in charge of overseeing the swap, meaning that tokens can only be added or deleted with the consent of other DAO members. In terms of finances, Ultimum will keep the Ultimum Treasury afloat by using the trading fees from the Ultimum dApps. The Treasury provides backing for the Ultimum Token (ULT). A DAO-regulated P2P lending and borrowing dApp is also offered by Ultimum Protocol. Ultimum is implemented on Scroll (Sepolia), a Layer 2 blockchain, with an emphasis on gas optimisation. This means that users won't have to worry about gas prices, which are quite minimal (about x10 lower than Ethereum). 
The Ultimum dashboard makes it simple and straightforward to access Ultimum's products as well as, yes, your records and assets on the platform, which are secured and accessible to you only through a wallet login. Visit Ultimum to get the most value out of your assets.

## Features of Ultimum Protocol
This protocol features a robust combination of smart contracts and front end and integration tools ranging from a DAO, Swap dApp, Staking dApp, Lending/Borrowing dApp, ChainLink Oracles, a Dashboard, "Live market charts, Live token prices, Blockchain insights integration (using the Trading View API)", wallet connect, newsletter (using Nodemailer), blog(with admin sign up, sign in and admin dashboard), documentation, Filebase storage, search functionalities, paginations, flaticons library, and an intuitive interface with a slick responsive design and smooth user experience.

## Tools used to create Ultimum Protocol
### Smart Contract Tools
Solidity, Foundry, ChainLink Oracles. OpenZeppelin

### Front end and Integration Tools
Ethers.js, Scrollscan Token Tracker, Next.js, Node.js, JavaScript, Tailwind CSS, Trading View widgets API, Filebase storage, PostgreSQL

## The Ultimum Protocol's Products

### Connect Wallet
To connect wallet, go to our [Web App](https://ultimum-protocol.vercel.app). For desktop, install Metamask or Trust wallet or any other EVM-compatible wallet of your choice on your device's browser (Brave browser or Google Chrome or Opera browser), and on mobile, simply download your desired EVM-compatible wallet and use its browser to connect to the platform. Connect your wallet by clicking on the "Connect wallet" button on the upper right of the screen. Ensure to change network to Testnet, then  Scroll Sepolia test network on your wallet. The display on the screen will change after connecting. If you don't have Scroll Sepolia on your list of networks, simply go to [ChainList](https://chainlist.org), search for Scroll Sepolia to obtain the configurations and add the network to your wallet. We are implementing the Ethers.js library for the project.

### Get Scroll test ETH for gas fees payments
With Ultimum Protocol being deployed currently on Scroll Sepolia, testnet ETH would definitely be required to pay for gas fees during transactions. Scroll test ETH can be obtained from the  [Scroll testnet faucet](https://docs.scroll.io/en/user-guide/faucet). Deployment of the project on  mainnet would mean Scroll mainnet ETH for gas fees.

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
This is the part of the DAO where all proposals made in the DAO are being displayed for all members to see and vote for. A proposal can be anything ranging from decisions in the DAO, tokens to add to any of the dApps (Swap, Staking, Lend/Borrow) and which service should be added to/removed from the protocol. Only the DAO decides which token to add to any of the dApps. The View Proposals section shows the proposal description, the proposer, ID of proposal, date of proposal, status of proposal, number of upvotes, number of downvotes and a "Close Proposal" button which is only visible to the proposer of a particular proposal. Typically, a proposal runs for at least 7 days and can only be closed after 7 days by the proposer (the proposal can be left open for as long as the proposer wants). The system uses the difference in upvotes and downvotes to determine if a proposal will be approved by the community. Obviously, a higher number of upvotes means a proposal will be approved. A search bar and pagination effect has been integrated to help our users navigate between proposals with ease.

#### Create a Proposal
Creation of proposals requires you to input a proposal description. Clearly describe your proposal for all members to understand. A proposal can be anything ranging from decisions in the DAO, tokens to add to any of the dApps (Swap, Staking, Lend/Borrow) and which service should be added to/removed from the protocol. Then click on the "Click to Create a Proposal" button to submit your proposal. The system automatically associates your proposal with your wallet address, and as such, you are the only one with the right to close that proposal.

 #### Vote for a Proposal
Voting is being done to determine if a proposal will be accepted or not. Members of the DAO can upvote or downvote a proposal. To vote for a proposal, click on the "Vote for a Proposal" tab, and input ID of proposal and click on either upvote or downvote, then submit vote. Your vote will be associated with your wallet address and it will count on the "View Proposals" page. For transparency in the governance of the DAO, the number of upvotes and downvotes are being displayed. You cannot vote more than once for a proposal. If there is a higher number of upvotes, a proposal will be approved. But if there is a higher number of downvotes, the proposal will be rejected and as such will not be implemented.

### Swap dApp
With a ChainLink Oracle integration, live token data and user-first approach, our users experience decentralized finance and can therefore use the Ultimum Protocol swap dApp to swap a variety of supported tokens with low gas fees (10x lesser than Ethereum). Our swap dApp is designed to provide the best user experience and interface to our users. Ensure you have set network to the Scroll Sepolia test network on your wallet and enjoy a seamless swap dApp experience.

### Staking (Time-frame) dApp
Ultimum Protocol is driving the blockchain sector into the self-banking age with actual advancements, and thus lets you earn smart money in a variety of ways. Among them is the time-framing method of staking where you experience full flexibility of your tokens without fear of money being locked up or fear of assets being lost. Time-frame your Ultimum tokens (ULT) over a set period chosen by you to gain instant huge rewards from the ecosystem. Ultimum Protocol will use this new technology to more properly communicate value, allowing you to better control your financial future and capitalize on the value of your money over time. When you stake your tokens, you have the freedom to claim rewards and unstake at anytime, unlike other staking platforms where your assets are locked up without access to them during a time duration predetermined by their systems. The Ultimum staking dApp displays your token balance, amount staked, reward accrued, stake start date, and chosen time duration of stake. Note that unstaking before the chosen time duration incurs a penalty.

### P2P Lend/Borrow dApp
Our users are able to participate in P2P lending/borrowing activities of supported tokens. Firstly, a loan has to be created by the borrower, then another user funds the loan by lending to the borrower. The loan has the following characteristics: loan amount, interest, expiry date, and collateral. Collateral provided by the borrower is locked up by the system until the given duration expires. The collateral is sent out to the lender if the borrower fails to repay the loan during the specified time. When you lend to Ultimum, you get rewarded hugely according to the agreed terms of the loan (your funds are secured with our security algorithm). When you borrow from Ultimum P2P, ensure to present a collateral and pay back with interest when you repay the amount. For a better user experience, a "view all available loans" section with search functionality and pagination has been integrated into the dApp for lenders to navigate between loans. Participate in Ultimum DAO governance to determine the next supported collateral. 

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

✅ [Treasury](https://sepolia.scrollscan.com/address/0x3186971052B2aA1D0B4498AE96966C6F12088d32) 🟢
- Address: `0x3186971052B2aA1D0B4498AE96966C6F12088d32`

## DAO Contract

✅ [DAO](https://sepolia.scrollscan.com/address/0xA4D44C119e9f51b1f2f247C75D77D2C7719c882a) 🟢
- Address: `0xA4D44C119e9f51b1f2f247C75D77D2C7719c882a`

## StakeERC20 (Time-frame) Contract

✅ [StakERC20](https://sepolia.scrollscan.com/address/0x48BB61cA674E0e69E5605895f62393636cd51bB9) 🟢
- Address: `0x48BB61cA674E0e69E5605895f62393636cd51bB9`

## P2P Lending/Borrowing Contract

✅ [P2PLending](https://sepolia.scrollscan.com/address/0x6c3a658765748059ac5099C98a23374a8339608A) 🟢
- Address: `0x6c3a658765748059ac5099C98a23374a8339608A`

## Swap Contract

✅ [Swapper](https://sepolia.scrollscan.com/address/0x8b5474E72096225AbED4C32eD21cc641372e3218) 🟢
- Address: `0x8b5474E72096225AbED4C32eD21cc641372e3218`

## Ultimum Erc20 (ULT) Contract

✅ [Ultimum](https://sepolia.scrollscan.com/address/0x3ecB57f648D39aB64E6A87ec355a8FD0c116aEb3) 🟢
- Address: `0x3ecB57f648D39aB64E6A87ec355a8FD0c116aEb3`

## Ultimum NFT Contract

✅ [UltNft](https://sepolia.scrollscan.com/address/0xE4Ec85e33aAc5B0C48203A9371b864FA43d7D915) 🟢
- Address: `0xE4Ec85e33aAc5B0C48203A9371b864FA43d7D915`

# Other Tokens

## USDT

- **[USDT](https://sepolia.scrollscan.com/address/0x1d5cd5833f43c63f724ebb0f28c6aaed79bf5bf2)**: 0x1d5cd5833f43c63f724ebb0f28c6aaed79bf5bf2

## DAI

- **[DAI](https://sepolia.scrollscan.com/address/0xe9c49311b81545cced67ab3313c8f4f938ba1920)**: 0xe9c49311b81545cced67ab3313c8f4f938ba1920
