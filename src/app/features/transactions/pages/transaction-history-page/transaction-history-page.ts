import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { FundTransactionStore } from '../../state/funds-transaction.store';

@Component({
  selector: 'app-transaction-history-page',
  imports: [],
  templateUrl: './transaction-history-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [FundTransactionStore],
})
export class TransactionHistoryPage implements OnInit {
  private fundTransactionStore = inject(FundTransactionStore);
  public fundsTransaction = this.fundTransactionStore.fundsTransaction;
  ngOnInit(): void {
    this.fundTransactionStore.getFundTransactions();
  }
}
