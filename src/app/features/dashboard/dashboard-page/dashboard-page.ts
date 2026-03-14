import { ChangeDetectionStrategy, Component, computed, inject, OnInit } from '@angular/core';
import { FundStore } from '../../funds/state/fund.store';
import { CommonModule } from '@angular/common';
import { SubscribedFund } from '../../funds/interfaces/fund.interfaces';
import { CancelDialog } from '../../../shared/components/cancel-dialog/cancel-dialog';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard-page',
  imports: [CommonModule, CancelDialog, RouterLink],
  templateUrl: './dashboard-page.html',
  providers: [FundStore],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardPage implements OnInit {
  private fundStore = inject(FundStore);

  public user = this.fundStore.user;
  public investedAmount = this.fundStore.investedAmount;
  public subscribedFunds = this.fundStore.subscribedFunds;
  public selectedFund = this.fundStore.selectedFund;
  public isLoading = this.fundStore.isLoading;

  public totalAmount = computed(() => {
    const userBalance = this.user()?.balance ?? 0;
    const investedAmount = this.investedAmount() ?? 0;
    return investedAmount + userBalance;
  });

  public ngOnInit(): void {
    this.fundStore.getUser();
  }

  public formatReturnRate(returnRate: number) {
    return `${returnRate >= 0 ? '+' : ''}${(returnRate * 100).toFixed(2)}%`;
  }

  public selectFund(fund: SubscribedFund) {
    this.fundStore.selectFund(fund);
  }

  public cancelFund() {
    const fund = this.selectedFund();
    if (!fund) return;
    this.fundStore.cancelFund(fund.id);
  }
}
