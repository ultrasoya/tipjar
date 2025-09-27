import DonateContractAbi from './DonateContractAbi.json';

export const CONTRACTS = {
  DonateContract: {
    abi: DonateContractAbi,
    addresses: {
      sepolia: process.env.DONATE_CONTRACT_ADDRESS || '0x...',
    }
  }
} as const;

export type ContractNames = keyof typeof CONTRACTS;
export type ContractAbi = typeof CONTRACTS[ContractNames]['abi'];
