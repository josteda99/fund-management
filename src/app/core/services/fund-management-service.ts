import { Injectable, signal } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Fund, User } from '../../features/funds/interfaces/fund.interfaces';
import { FundTransaction } from '../../app';

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

  public subscribeFund(fundId: number) {
    //todo
  }
}
