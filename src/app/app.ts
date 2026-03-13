import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';

interface Fund {
  id: number;
  name: string;
  minAmount: number;
  category: 'FPV' | 'FIC';
}

interface User {
  name: string;
  email: string;
  phone: string;
  subscribedFunds: Fund[];
}

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

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('fund-management');

  public initialBalance = signal(500_000);
  public user = signal<User>({ name: 'John Doe', email: '', phone: '', subscribedFunds: [] });

  public selectedFund = signal<Fund | null>(null);
  public notificationPreference = signal<string>('');

  public fundTransactions = signal<FundTransaction[]>([]);
}
