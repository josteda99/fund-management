import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { FundStore } from '../../state/funds.store';
import { Fund } from '../../interfaces/fund.interfaces';
import { FundTransactionType } from '../../../../app';

@Component({
  selector: 'app-available-funds-page',
  imports: [],
  templateUrl: './available-funds-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [FundStore],
})
export class AvailableFundsPage implements OnInit {
  private fundStore = inject(FundStore);

  private selectedFund = this.fundStore.selectedFund;
  private user = this.fundStore.user;

  public availableFunds = this.fundStore.availableFunds;
  public balance = this.fundStore.userBalance;

  public ngOnInit(): void {
    this.fundStore.getInitialAvailableFunds();
    this.fundStore.getUser();
  }

  public subscribeToFund() {
    const fund = this.selectedFund();
    const user = this.user();

    if (!fund || !user) return;
    if (user.subscribedFunds.some((f) => f.id === fund.id)) {
      alert(`You are already subscribed to ${fund.name}`);
      return;
    }
    if (this.balance() ?? 0 < fund.minAmount) {
      alert(`Not enough balance to subscribe to ${fund.name}`);
      return;
    }
    // this.user.update((u) => ({ ...u, subscribedFunds: [...u.subscribedFunds, fund] }));
    // this.initialBalance.update((balance) => balance - fund.minAmount);
    // alert(`Subscribed to ${fund.name} successfully!`);
    // this.addTransactionEntry(fund, FundTransactionType.SUBSCRIPTION);
  }

  public selectFund(fund: Fund) {
    this.fundStore.selectFund(fund);
  }

  public changeNotificationPreference(option: string) {
    // this.notificationPreference.set(option);
  }

  public checkSubscription(fundId: number) {
    const exist = this.user()?.subscribedFunds.find((fund) => fund.id === fundId);

    return exist ? 'Cancel' : 'Subscribe';
  }

  public cancelFund() {
    const fund = this.selectedFund();
    if (!fund) return;
    // this.user.update((u) => ({
    //   ...u,
    //   subscribedFunds: [...u.subscribedFunds].filter((f) => f.id !== fund.id),
    // }));

    // this.addTransactionEntry(fund, FundTransactionType.CANCELLATION);
  }

  public addTransactionEntry(fund: Fund, type: FundTransactionType) {
    // let id = this.fundTransactions().length ?? 0;
    // const fundTransaction: FundTransaction = {
    //   id: id++,
    //   fundName: fund.name,
    //   amount: 0, // fix
    //   transactionDate: new Date(),
    //   type: type,
    // };
    // this.fundTransactions.update((ft) => [...ft, fundTransaction]);
  }
}
