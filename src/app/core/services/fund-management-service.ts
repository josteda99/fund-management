import { Injectable, signal } from '@angular/core';
import { Observable, of } from 'rxjs';
import {
  Fund,
  NotificationPreference,
  SubscribedFund,
  SubscribedFundDto,
  User,
} from '../../features/funds/interfaces/fund.interfaces';
import {
  FundTransaction,
  FundTransactionType,
} from '../../features/transactions/interfaces/transaction.interface';

@Injectable({
  providedIn: 'root',
})
export class FundManagementService {
  private initialAvailableFund = signal<Fund[]>([
    { id: 1, name: 'FPV_BTG_PACTUAL_RECAUDADORA', minAmount: 75_000, category: 'FPV' },
    { id: 2, name: 'FPV_BTG_PACTUAL_ECOPETROL', minAmount: 125_000, category: 'FPV' },
    { id: 3, name: 'DEUDAPRIVADA', minAmount: 50_000, category: 'FIC' },
    { id: 4, name: 'FDO-ACCIONES', minAmount: 250_000, category: 'FIC' },
    { id: 5, name: 'FDO-FPV_BTG_PACTUAL_DINAMICA', minAmount: 100_000, category: 'FPV' },
  ]);

  private user = signal<User>({
    name: 'John Doe',
    email: '',
    phone: '',
    subscribedFunds: [],
    balance: 500_000,
  });

  private transactions = signal<FundTransaction[]>([]);

  public getInitialAvailableFunds(): Observable<Fund[]> {
    return of(this.initialAvailableFund());
  }

  public getFundTransactions(): Observable<FundTransaction[]> {
    return of(this.transactions());
  }

  public getUser(): Observable<User> {
    return of(this.user());
  }

  //extend to difeerent amount
  public subscribeFund(
    fundId: number,
    notificationPreference = NotificationPreference.NONE,
  ): Observable<SubscribedFundDto> {
    const fund = this.initialAvailableFund().find((f) => f.id === fundId);

    if (!fund) throw new Error('Fund doesnt finded');
    const returnRate = this.generateRandomReturnRate();
    const adjustedAmount = Number((fund.minAmount * (1 + returnRate)).toFixed(2));

    const subscribedFund: SubscribedFund = {
      ...fund,
      amount: adjustedAmount,
      notificationPreference,
      returnRate: returnRate,
    };
    //take a look this logic
    this.user.update((u) => ({
      ...u,
      balance: u.balance - fund.minAmount,
      subscribedFunds: [...u.subscribedFunds, subscribedFund],
    }));

    const newBalance = this.user().balance;
    this.addTransactionEntry(fund, FundTransactionType.SUBSCRIPTION, fund.minAmount);

    return of({ subscribedFund, balance: newBalance });
  }

  public cancelFund(fundId: number): Observable<{ balance: number }> {
    const user = this.user();
    const fundIndex = user.subscribedFunds.findIndex((f) => f.id === fundId);

    if (fundIndex === -1) throw new Error('Fund not subscribed');

    const fund = user.subscribedFunds[fundIndex];
    this.user.update((u) => ({
      ...u,
      balance: u.balance + fund.amount,
      subscribedFunds: u.subscribedFunds.filter((f) => f.id !== fundId),
    }));
    this.addTransactionEntry(fund, FundTransactionType.CANCELLATION, fund.amount);

    return of({ balance: this.user().balance });
  }

  private addTransactionEntry(fund: Fund, type: FundTransactionType, amount: number) {
    let id = this.transactions().length ?? 0;
    const fundTransaction: FundTransaction = {
      id: id++,
      fundName: fund.name,
      amount: amount,
      transactionDate: new Date(),
      type: type,
    };
    this.transactions.update((ft) => [...ft, fundTransaction]);
  }

  //limits
  /*
  -0.05  → -5%
  +0.10  → +10%
  */
  private generateRandomReturnRate(): number {
    return Math.random() * 0.15 - 0.05;
  }
}
