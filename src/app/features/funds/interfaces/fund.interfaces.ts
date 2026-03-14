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
  notificationPreference: NotificationPreference;
  returnRate: number;
}

export interface SubscribedFundDto {
  subscribedFund: SubscribedFund;
  balance: number;
}

export enum NotificationPreference {
  SMS = 'SMS',
  EMAIL = 'EMAIL',
  NONE = 'NONE',
}

export interface SubscribeFundWithAmount {
  fundId: number;
  notificationPreference: NotificationPreference;
  amount: number;
}
