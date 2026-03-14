export interface Fund {
  id: number;
  name: string;
  minAmount: number;
  category: 'FPV' | 'FIC';
}

export interface User {
  name: string;
  email: string;
  phone: string;
  balance: number;
  subscribedFunds: SubscribedFund[];
}

export interface SubscribedFund extends Fund {
  amount: number;
}

export interface SubscribedFundDto {
  subscribedFund: SubscribedFund;
  balance: number;
}
