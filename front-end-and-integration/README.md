# Ultimum Protocol Documentation [Web App](https://ultimumprotocol.vercel.app) / [Demo Video](https://youtu.be/5S3kwyL_kh8?si=XZNRDbPzx-JRoiSN) 
Ultimum Protocol is a dao-governed DeFi protocol that aims to solve the problems of decentralisation and flexibility in the usage of blockchain based products. With a robust combination of smart contracts and front end and integration tools, Ultimum provides a seamless experience to users of the platform. With our user-first approach, by becoming a member of the DAO, a user has the opportunity to access more of Ultimum's products, make decisions through the DAO's governance and get rewarded potentially for contributions to the ecosystem. Ultimum aims to revolutionize the DeFi world through our products, for example, the time-framing method of staking where users have control over their staked assets. By integrating with ChainLink oracles, the Ultimum Swap with which users can swap their favorite tokens provides the best user experience to users. Technically, the swap is being governed by the DAO such that tokens can only be added/removed when members of the DAO approve of them. Economically, Ultimum will use the trading fees from the Ultimum dApps to maintain the Ultimum Treasury. The Ultimum Token (ULT) is backed by the Treasury. Ultimum Protocol also provides a lending and borrowing dApp that is governed by the DAO. With a focus on gas optimisation, Ultimum is deployed on Polygon (Mumbai) such that users won't have to worry about gas fees which are relatvely small (about x100 lesser than Ethereum). The Ultimum dashboard allows for simplicity and easy access to Ultimum's products and yes, your assets and records on the platform which can only be accessed by you using your wallet to login. If you want to get the best value out of your assets, visit Ultimum.

## Features of Ultimum Protocol
This protocol features a robust combination of smart contracts and front end and integration tools ranging from a DAO, Swap dApp, Staking dApp, Dashboard, ChainLink Oracles, Lending/Borrowing dApp, "Live market charts, Live token prices, Blockchain insights integration (using the Trading View API)", wallet connect, newsletter (using Nodemailer), blog, documemtation, flaticons library, Filebase storage and an intuitive interface with a slick responsive design and smooth user experience.

## Tools used to create Ultimum Protocol
### Smart Contract Tools
Solidity, Foundry, ChainLink Oracles

### Front end and Integration Tools
Ethers.js, Next.js, JavaScript, Tailwind CSS, Trading View widgets, Filebase storage, PostgreSQL

## The Ultimum Protocol's Products

### Connect Wallet
To connect wallet, go to our [Web App](https://ultimumprotocol.vercel.app), and for desktop, install Metamask or Trust wallet or any other wallet of your choice on your device's browser (Brave browser or Google Chrome or Opera browser), and on mobile, simply download your desired EVM-compatible wallet and use its browser to connect to the platform. Connect your wallet by clicking on the "Connect wallet" button on the upper right of the screen. Ensure to change network to Testnet, then Polygon Mumbai test network on your wallet. The display on the screen will change after connecting. If you dont have Polygon Mumbai on your list of networks, simply go to [ChainList](https://chainlist.org) to obtain the configurations and add the network to your wallet. We are using the Ethers.js library for the wallet connect button as it suits our requirements for the project.

### Get Scroll test ETH for gas fees payments
With Ultimum Protocol being deployed currently on Scroll, testnet ETH would definitely be required to pay for gas fees during transactions. Scroll test ETH can be obtained on the Scroll testnet faucet. Deployment of the project on Polygon mainnet would mean mainnet MATIC for gas fees.

### Web app homepage
The homepage of the Ultimum Protocol's web app is the first page when you visit the app. It links to the dashboard and features the wallet connect button as well as other important information about the protocol including documentation, social media links, forum, team of developers, newsletter subscription, blockchain insights with iq social integration and live market chart of your favorite cryptocurrencies.

 ### The Ultimum Protocol Dashboard
This is the most functional part of the Ultimum Protocol. It houses the most important parts of the ecosystem including User's Balances, Protocol Metrics, DAO Governance, Swap dApp,Stake dApp, Lending/Borrowing dApp, Wallet connect, Live market chart, Live token prices etc. 

### User's Balances
This section of the dashboard shows all the balances of a user after logging in with wallet. It displays the following info for a user: ULT balance, ULT price, Staked tokens by contract addresses, last active time on DAO which shows the time of your last activity on the DAO.

### Protocol Metrics
Protocol metrics section shows live updates to the Ultimum protocol including the following: ULT Total Supply, ULT Price, Protocol Deployment Blockchain, Stakeable Tokens (By Contract Address), Amount of ULT in Treasury, Number of Loans, Max Loan Amount, Min Loan Amount, Amount of MATIC in Swap, Number of DAO Members, Number of DAO Proposals, contract addresses of all contracts used by the protocol and Live market chat.

### DAO Governance
The Ultimum DAO is the powerhouse of the Ultimum protocol. It determines the next direction of the protocol through voting by members of the DAO. Using the DAO as a powerful tool, Ultimum protocol users are able to engage in governance and that includes but not limited to decision making, creation of proposals, view proposal details and voting activities to steer the ecosystem forward. This democratic approach ensures transparency and decentralisation in the ecosystem. The DAO also decides tokens to be used in the Swap, Staking and Lend and Borrow dApps. The default tokens available as at the time of writing this documentation are: ULT, MATIC, USDT and DAI. To enjoy full DAO benefits, become an active member and get rewarded with ULT for your contributions to the DAO.

### How to Participate in the Governance of the DAO

#### Join DAO
To join the DAO, firstly, a user has to obtain at least 2,000 ULT tokens and stake 1,000 ULT to obtain the Ultimum Soulbound NFT which is sent to your wallet automatically. The NFT gives you access to the DAO. For non-members, the process of obtaining the NFT is the first page you will see in the DAO section. After obtaining the NFT, the system automatically redirects you to the governance of the DAO. On the Join DAO tab, you will be required to register a username, then you can click on the "Click to Join DAO" button. Your wallet address will be associated with your chosen username and your membership status will be updated to "member". The Join DAO tab will disappear after your registration is successful.

#### View Proposals
This is the part of the DAO where all proposals made in the DAO are being displayed for all members to see and vote for. A proposal can be anything ranging from decisions in the DAO, tokens to add to any of the dApps (Swap, Staking, Lend/Borrow) and which service should be added to/removed from the protocol. Only the DAO decides which token to add to any of the dApps. The View Proposals section shows the proposal description, the proposer, ID of proposal, date of proposal, status of proposal, number of upvotes, number of downvotes and a "Close Proposal" button which is only visible to the proposer of a particular proposal. Typically, a proposal runs for at least 3 days and can only be closed after 3 days by the proposer (the proposal can be left open for as long as the proposer wants). The system uses the difference in upvotes and downvotes to determine if a proposal will be approved by the community. Obviously, higher number of upvotes means a proposal will be approved.

#### Create a Proposal
Creation of proposals requires you to input a proposal description. Clearly describe your proposal for all members to understand. A proposal can be anything ranging from decisions in the DAO, tokens to add to any of the dApps (Swap, Staking, Lend/Borrow) and which service should be added to/removed from the protocol. Then click on the "Click to Create a Proposal" button to submit your proposal. The system automatically associates your proposal with your wallet address, and as such, you are the only one with the right to close that proposal.

 #### Vote for a Proposal
Voting is being done to determine if a proposal will be accepted or not. Members of the DAO can upvote or downvote a proposal. To vote for a proposal, click on the "Vote for a Proposal" tab, and input ID of proposal and click on either upvote or downvote, then submit vote. Your vote will be associated with your wallet address and it will count on the "View Proposals" page. For transparency in the governance of the DAO, the number of upvotes and downvotes are being displayed. You cannot vote more than once for a proposal. If there is a higher number of upvotes, a proposal will be approved. But if there is a higher number of downvotes, the proposal will be rejected and as such will not be implemented.

### Swap dApp
With a ChainLink Oracle integration, live token data and user-first approach, our users experience decentralized finance and can therefore use the Ultimum Protocol swap dApp to swap a variety of supported tokens with low gas fees (100x lower than Ethereum). Our swap dApp is designed to provide the best user experience and interface to our users. Ensure you have set network to the Polygon Mumbai test network on your wallet and enjoy a seamsless swap experience.

### Staking (Time-frame) dApp
Ultimum Protocol is driving the blockchain sector into the self-banking age with actual advancements, and thus lets you earn smart money in a variety of ways. Among them is the time-framing method of staking where you experience full flexibility of your tokens without fear of money being locked up or fear of assets being lost. Time-frame your Ultimum tokens (ULT) over a set period chosen by you to gain instant huge rewards from the ecosystem. Ultimum Protocol will use this new technology to more properly communicate value, allowing you to better control your financial future and capitalize on the value of your money over time. When you stake your tokens, you have the freedom to claim rewards and unstake at anytime, unlike other staking platforms where your assets are locked up without access to them during a time duration predetermined by their systems. The Ultimum staking dApp displays your token balance, amount staked, reward accrued, stake start date, and chosen time duration of stake. Note that unstaking before the chosen time duration incurs a penalty.

### P2P Lend/Borrow dApp
Our users are able to participate in lending/borrowing activities of supported tokens. Firstly, a loan has to be created by the borrower, then another user lends to the borrower. When you lend to Ultimum, you get rewarded hugely from the Ultimum pool (your funds are secured with our security algorithm). When you borrow from Ultimum, ensure to present a collateral and pay back with interest in bits till you can fully pay the amount. Participate in Ultimum DAO governance to determine the next supported token. As at the time of writing this documentation, the Lending/Borrowing dApp is still under development and will thus be integrated in future versions of the Ultimum Protocol.

### Ultimum Token/Treasury
The Ultimum token (ULT) is the native token of the Ultimum Protocol and is backed by the Ultimum treasury. The Ultimum treasury ensures effective management of the Ultimum token (ULT) and liquidity and minimize risks. This treasury will also optimize financial operations that support product development. If per adventure, ULT goes below 100% of its initial value during the bear market, the treasury acts as a liquidity provider to manage the token price and ensure its stability across all platforms.

## Additional Notes
In future upgrades of this project, Lending/Borrowing will be integrated and a more sophisticated wallet connect option (Wagmi/Rainbowkit) will be integrated. More dApp features and oracles will also be integrated. Pagination feature will as well be added to the View Proposals section of the DAO.

## Team Members (Team Ultimate)
* Patrick Ominisan - Blockchain engineer (Web3Bridge)
* Kolapo Goodness - Smart contract developer (Web3Bridge)
* Oluwateniayomi Adeniyi - Backend engineer (BrainDAO)


# Contract Addresses

## Treasury Contract

- Contract Address: [0x4f88d4AD2F3d652fc0b3daB02E8ad9B99628FF69](https://mumbai.polygonscan.com/address/0x4f88d4AD2F3d652fc0b3daB02E8ad9B99628FF69)
- Verification Status: ![Verified](https://img.shields.io/badge/Verified-Yes-brightgreen)

## Ultimum NFT Contract

- Contract Address: [0xeCE600C7136549DEFCa009535476F3b0E482Bd92](https://mumbai.polygonscan.com/address/0xeCE600C7136549DEFCa009535476F3b0E482Bd92)
- Verification Status: ![Verified](https://img.shields.io/badge/Verified-Yes-brightgreen)

## Ultimum Erc20 Contract

- Contract Address: [0xe12FEA32AC50504404ea830D7d54836f342c0ec0](https://mumbai.polygonscan.com/address/0xe12FEA32AC50504404ea830D7d54836f342c0ec0)
- Verification Status: ![Verified](https://img.shields.io/badge/Verified-Yes-brightgreen)

## StakERC20 Contract

- Contract Address: [0xE4f0162f9A9DA517E86bD68F205099288883299b](https://mumbai.polygonscan.com/address/0xE4f0162f9A9DA517E86bD68F205099288883299b)
- Verification Status: ![Verified](https://img.shields.io/badge/Verified-Yes-brightgreen)

## P2P Lending Contract

- Contract Address: [0xB3D1ABF2495df565636593F6909b086dF8D58789](https://mumbai.polygonscan.com/address/0xB3D1ABF2495df565636593F6909b086dF8D58789)
- Verification Status: ![Verified](https://img.shields.io/badge/Verified-Yes-brightgreen)

## Swapper Contract

- Contract Address: [0x8080c99d53409CB635aF306FCF46BCD9304EfD61](https://mumbai.polygonscan.com/address/0x8080c99d53409CB635aF306FCF46BCD9304EfD61)
- Verification Status: ![Verified](https://img.shields.io/badge/Verified-Yes-brightgreen)

## DAO Contract

- Contract Address: [0x475c4F07BEFEf174e2a475727Fe52ac867695DA0](https://mumbai.polygonscan.com/address/0x475c4F07BEFEf174e2a475727Fe52ac867695DA0)
- Verification Status: ![Verified](https://img.shields.io/badge/Verified-Yes-brightgreen)

# Stakable Tokens

## USDT mock Token

- Contract Address: [0xf20bbd18ce7a01382555fe8bc9818ccfa1cc34bf](https://mumbai.polygonscan.com/address/0xf20bbd18ce7a01382555fe8bc9818ccfa1cc34bf)

## DAI mock Token

- Contract Address: [0xcbbf5d663c59428fc8363b3d054267b5d4250f7b](https://mumbai.polygonscan.com/address/0xcbbf5d663c59428fc8363b3d054267b5d4250f7b)
