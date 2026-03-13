export interface FundTransaction {
  id: number;
  fundName: string;
  amount: number;
  transactionDate: Date;
  type: FundTransactionType;
}

export enum FundTransactionType {
  SUBSCRIPTION = 'SUBSCRIPTION',
  CANCELLATION = 'CANCELLATION',
}
