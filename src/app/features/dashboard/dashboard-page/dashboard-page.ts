import { ChangeDetectionStrategy, Component, computed, inject, OnInit } from '@angular/core';
import { FundStore } from '../../funds/state/fund.store';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard-page',
  imports: [CommonModule],
  templateUrl: './dashboard-page.html',
  providers: [FundStore],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardPage implements OnInit {
  private fundStore = inject(FundStore);

  public user = this.fundStore.user;
  public investedAmount = this.fundStore.investedAmount;
  public totalAmount = computed(() => {
    const userBalance = this.user()?.balance ?? 0;
    const investedAmount = this.investedAmount() ?? 0;
    return investedAmount + userBalance;
  });

  public ngOnInit(): void {
    this.fundStore.getUser();
  }
}
