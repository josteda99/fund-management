import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { FundTransactionStore } from '../../state/funds-transaction.store';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-transaction-history-page',
  imports: [CommonModule],
  templateUrl: './transaction-history-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [FundTransactionStore],
})
export class TransactionHistoryPage implements OnInit {
  private fundTransactionStore = inject(FundTransactionStore);
  public fundsTransaction = this.fundTransactionStore.fundsTransaction;

  public ngOnInit(): void {
    this.fundTransactionStore.getFundTransactions();
  }
}
