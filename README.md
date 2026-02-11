# Tipjar

A decentralized Web3 donation platform for receiving cryptocurrency donations on Ethereum

## Key Features

- **Smart Contract Donations** - Send ETH donations with personalized messages directly on-chain
- **Real-time Event Tracking** - The Graph subgraph indexes all donations for instant querying
- **Interactive UI** - Modern React interface with animations and real-time donation feed
- **Owner Withdrawals** - Secure withdrawal mechanism for contract owner to collect donations

## Stack

**Smart Contract:**
- Solidity ^0.8.26
- Hardhat 2.26
- Deployed on Sepolia testnet

**Backend:**
- Node.js + Express
- ethers.js 6.15
- GraphQL (The Graph)
- TypeScript

**Frontend:**
- React 19
- TypeScript
- Vite 7
- Framer Motion
- Radix UI

**Indexing:**
- The Graph subgraph
- GraphQL schema

## Quick Start

### Prerequisites

- Node.js 18+
- MetaMask or another Web3 wallet

### Install Dependencies

```bash
npm install
```

### Start Frontend

```bash
npm run dev
```

### Start Backend

```bash
cd src/backend
npm install
npm run dev
```

### Deploy Smart Contract

```bash
cd src/contract
npm install
npx hardhat ignition deploy ./ignition/modules/DonateContract.js --network sepolia
```

### Start Subgraph (Local Development)

```bash
cd src/subgraph
npm install
docker-compose up
```

### Environment Variables

Create `.env` files in respective directories:

**Backend (.env):**
```
RPC_URL=your_ethereum_rpc_url
CONTRACT_ADDRESS=deployed_contract_address
SUBGRAPH_URL=your_graph_endpoint
```

**Contract (.env):**
```
SEPOLIA_RPC_URL=your_sepolia_rpc_url
PRIVATE_KEY=your_wallet_private_key
```

## Project Structure

```
src/
├── contract/       # Solidity smart contracts
├── backend/        # Express API server
├── frontend/       # React application
├── subgraph/       # The Graph indexer
└── shared/         # Shared types and ABIs
```

## License

MIT
