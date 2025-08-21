import { Contract, ContractTransactionResponse } from "ethers";

export type DonateContract = Contract & {
  donate(name: string, message: string, overrides?: { value?: bigint }): Promise<ContractTransactionResponse>;
  withdraw(): Promise<ContractTransactionResponse>;
  
  addressToDonate(donor: string): Promise<bigint>;
  totalDonations(): Promise<bigint>;
  i_owner(): Promise<string>;
  
  // События
  NewDonation: {
    donor: string;
    name: string;
    message: string;
    amount: bigint;
  };
};

// Types for contract errors
export enum ContractErrors {
  NotOwner = "NotOwner",
  InsuffientBalance = "InsuffientBalance", 
  WithdrawCallFailed = "WithdrawCallFailed"
}

// Types for events
export interface DonationEvent {
  donor: string;
  name: string;
  message: string;
  amount: bigint;
  blockNumber: number;
  transactionHash: string;
}

// Types for contract state
export interface ContractState {
  totalDonations: bigint;
  owner: string;
  balance: bigint;
}

// Types for user donations
export interface UserDonation {
  address: string;
  totalAmount: bigint;
  donationCount: number;
}

// Types for contract requests
export interface DonateRequest {
  name: string;
  message: string;
  value: string; // in wei
}

// Types for contract responses
export interface DonateResponse {
  success: boolean;
  transactionHash?: string;
  error?: string;
}

export interface WithdrawResponse {
  success: boolean;
  transactionHash?: string;
  error?: string;
}
