import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { FundStore } from '../../state/funds.store';
import { Fund, NotificationPreference } from '../../interfaces/fund.interfaces';

@Component({
  selector: 'app-available-funds-page',
  imports: [],
  templateUrl: './available-funds-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [FundStore],
})
export class AvailableFundsPage implements OnInit {
  private fundStore = inject(FundStore);

  private user = this.fundStore.user;

  public selectedFund = this.fundStore.selectedFund;
  public availableFunds = this.fundStore.availableFunds;
  public balance = this.fundStore.userBalance;
  public notificationPreference = signal<NotificationPreference>(NotificationPreference.NONE);

  public ngOnInit(): void {
    this.fundStore.getInitialAvailableFunds();
    this.fundStore.getUser();
  }

  public subscribeToFund() {
    const fund = this.selectedFund();
    const user = this.user();

    if (!fund || !user) return;

    const currentBalance = this.balance() ?? 0;
    if (user.subscribedFunds.some((f) => f.id === fund.id)) {
      alert(`You are already subscribed to ${fund.name}`);
      return;
    }

    if (currentBalance < fund.minAmount) {
      alert(`Not enough balance to subscribe to ${fund.name}`);
      return;
    }
    this.fundStore.subscribeFund(fund.id);
    alert(`Subscribed to ${fund.name} successfully!`);
  }

  public selectFund(fund: Fund) {
    this.fundStore.selectFund(fund);
  }

  public changeNotificationPreference(option: string) {
    if (option === NotificationPreference.EMAIL) {
      this.notificationPreference.set(NotificationPreference.EMAIL);
      return;
    }
    if (option === NotificationPreference.SMS) {
      this.notificationPreference.set(NotificationPreference.SMS);
      return;
    }
    this.notificationPreference.set(NotificationPreference.NONE);
  }

  public checkSubscription(fundId: number) {
    const exist = this.user()?.subscribedFunds.find((fund) => fund.id === fundId);

    return exist ? 'Cancel' : 'Subscribe';
  }

  public cancelFund() {
    const fund = this.selectedFund();
    if (!fund) return;
    this.fundStore.cancelFund(fund.id);
  }
}
