import DonateContractAbi from './DonateContractAbi.json';

export const CONTRACTS = {
  DonateContract: {
    abi: DonateContractAbi,
    // Здесь можно добавить адреса для разных сетей
    addresses: {
      sepolia: process.env.DONATE_CONTRACT_ADDRESS || '0x...', // Замените на реальный адрес
    }
  }
} as const;

export type ContractNames = keyof typeof CONTRACTS;
export type ContractAbi = typeof CONTRACTS[ContractNames]['abi'];
