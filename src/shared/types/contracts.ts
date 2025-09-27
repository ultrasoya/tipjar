export type Donation = {
  donor: string;
  name: string;
  message: string;
  amount: string;
  timestamp?: string;
  id?: string;
};

export type NewDonationEvent = {
  donor: string;
  name: string;
  message: string;
  amount: string;
  history?: Donation[];
};

export type ContractError = 
  | "InsuffientBalance"
  | "NotOwner" 
  | "WithdrawCallFailed";

export type SSEEvent = {
  type: 'connected' | 'donation';
  message?: string;
  data?: NewDonationEvent;
};
