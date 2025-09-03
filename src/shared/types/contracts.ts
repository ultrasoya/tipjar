// Типы для DonateContract
export type Donation = {
  donor: string;
  name: string;
  message: string;
  amount: string;
  timestamp: string;
};

export type NewDonationEvent = {
  donor: string;
  name: string;
  message: string;
  amount: string;
  history?: Donation[];
};

// Типы для событий
export type SSEEvent = {
  type: 'connected' | 'donation';
  message?: string;
  data?: NewDonationEvent;
};
