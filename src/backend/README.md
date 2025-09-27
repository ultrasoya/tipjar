# Backend Service

Backend service for the Tipjar application, providing API for working with donations and blockchain.

## Installation

```bash
npm install
```

## Environment Variables Setup

Create a `.env` file in the backend root directory with the following variables:

```env
# Subgraph configuration
SUBGRAPH_URL=https://api.studio.thegraph.com/query/your-subgraph-id
SUBGRAPH_API_KEY=your-api-key-here

# Server configuration
PORT=3000

# Blockchain configuration
ALCHEMY_API_KEY=your-alchemy-api-key
DONATE_CONTRACT_ADDRESS=your-deployed-contract-address

# Alternative RPC configuration (if not using Alchemy)
RPC_URL=https://sepolia.infura.io/v3/your-project-id
PRIVATE_KEY=your-private-key-here
```

### Variable Description:

- `SUBGRAPH_URL` - URL of your subgraph for fetching donation data
- `SUBGRAPH_API_KEY` - API key for accessing the subgraph
- `PORT` - port on which the server will run (default 3000)
- `ALCHEMY_API_KEY` - Alchemy API key for blockchain interaction
- `DONATE_CONTRACT_ADDRESS` - address of the deployed smart contract
- `RPC_URL` - alternative RPC provider URL (if not using Alchemy)
- `PRIVATE_KEY` - private key for signing transactions

## Running

### Configuration Check

```bash
npm run check-env
```

### Development Mode

```bash
npm run dev
```

### Production Mode

```bash
npm run start
```

## API Endpoints

- `GET /health` - server health check
- `GET /donations/list` - donations list
- `GET /donations/amount` - total donations amount
- `GET /events` - blockchain events

## Project Structure

```
src/
├── index.ts              # Main server file
├── routes/               # API routes
├── services/             # Business logic
├── listeners/            # Event listeners
└── types/                # TypeScript types
```
