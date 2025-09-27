import type { Donation, NewDonationEvent } from "@shared/types/contracts";

export type { Donation, NewDonationEvent };

export interface DonateContract {
  on(event: "NewDonation", listener: (donor: string, name: string, message: string, amount: bigint) => void): this;
  off(event: "NewDonation", listener: (donor: string, name: string, message: string, amount: bigint) => void): this;
  removeAllListeners(event?: string): this;
  
  donate(_name: string, _message: string, options?: { value?: bigint }): Promise<{ hash: string; wait(): Promise<unknown> }>;
  addressToDonate(donor: string): Promise<bigint>;
  totalDonations(): Promise<bigint>;
  withdraw(): Promise<{ hash: string; wait(): Promise<unknown> }>;
  i_owner(): Promise<string>;
  
  connect(signer: unknown): DonateContract;
  target: string;
}