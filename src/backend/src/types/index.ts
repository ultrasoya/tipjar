import type { Donation, NewDonationEvent } from "@shared/types/contracts";

export type { Donation, NewDonationEvent };

// Типы для ethers контракта
export interface DonateContract {
  on(event: "NewDonation", listener: (donor: string, name: string, message: string, amount: bigint) => void): this;
  off(event: "NewDonation", listener: (donor: string, name: string, message: string, amount: bigint) => void): this;
  totalDonations(): Promise<bigint>;
  getDonations(): Promise<Donation[]>;
}