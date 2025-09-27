# Backend Setup Guide

## 1. Creating .env File

Create a `.env` file in the backend root directory (`src/backend/`) with the following content:

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

## 2. Getting Required Keys

### Subgraph API

1. Go to [The Graph Studio](https://studio.thegraph.com/)
2. Create a new subgraph or use existing one
3. Copy the URL and API key

### Alchemy API

1. Go to [Alchemy](https://www.alchemy.com/)
2. Create a new project
3. Copy the API key

### Contract

1. Deploy your smart contract to Sepolia network
2. Copy the contract address

## 3. Configuration Check

```bash
npm run check-env
```

## 4. Running

```bash
npm run dev
```

## Troubleshooting

### Error "environment variable is not defined"

- Make sure `.env` file is created in the correct directory
- Check that all variables are filled
- Restart the server after changing `.env`

### Blockchain connection error

- Check the correctness of `ALCHEMY_API_KEY`
- Make sure you're using the correct network (Sepolia)

### Subgraph connection error

- Check the correctness of `SUBGRAPH_URL` and `SUBGRAPH_API_KEY`
- Make sure the subgraph is synchronized
