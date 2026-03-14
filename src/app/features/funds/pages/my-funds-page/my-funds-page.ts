import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { FundStore } from '../../state/funds.store';
import { FundTransactionStore } from '../../../transactions/state/funds-transaction.store';
import { CommonModule } from '@angular/common';
import { FundCardComponent } from '../../../shared/components/fund-card/fund-card';

@Component({
  selector: 'app-my-funds-page',
  imports: [CommonModule, FundCardComponent],
  templateUrl: './my-funds-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyFundsPage implements OnInit {
  private fundStore = inject(FundStore);
  private transactionStore = inject(FundTransactionStore);

  user = this.fundStore.user;
  isLoading = this.fundStore.isLoading;

  ngOnInit() {
    this.fundStore.getUser();
    this.transactionStore.getFundTransactions();
  }

  cancelFund(fundId: number) {
    this.fundStore.cancelFund(fundId);
    // After cancel, refresh transactions
    this.transactionStore.getFundTransactions();
  }
}
