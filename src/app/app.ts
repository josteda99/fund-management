import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

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

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('fund-management');

  public initialBalance = signal(50_000);
  public user = signal<User>({ name: 'John Doe', email: '', phone: '', subscribedFunds: [] });

  public selectedFund = signal<Fund | null>(null);
  public notificationPreference = signal<string>('');

  public availableFunds = signal<Fund[]>([
    { id: 1, name: 'FPV_BTG_PACTUAL_RECAUDADORA', minAmount: 75_000, category: 'FPV' },
    { id: 2, name: 'FPV_BTG_PACTUAL_ECOPETROL', minAmount: 125_000, category: 'FPV' },
    { id: 3, name: 'DEUDAPRIVADA', minAmount: 50_000, category: 'FIC' },
    { id: 4, name: 'FDO-ACCIONES', minAmount: 250_000, category: 'FIC' },
    { id: 4, name: 'FDO-FPV_BTG_PACTUAL_DINAMICA', minAmount: 100_000, category: 'FPV' },
  ]);

  public subscribeToFund() {
    const fund = this.selectedFund();

    if (!fund) return;
    const user = this.user();
    if (user.subscribedFunds.some((f) => f.id === fund.id)) {
      alert(`You are already subscribed to ${fund.name}`);
      return;
    }
    if (this.initialBalance() < fund.minAmount) {
      alert(`Not enough balance to subscribe to ${fund.name}`);
      return;
    }
    this.user.update((u) => ({ ...u, subscribedFunds: [...u.subscribedFunds, fund] }));
    this.initialBalance.update((balance) => balance - fund.minAmount);
    alert(`Subscribed to ${fund.name} successfully!`);
  }

  public selectFund(fund: Fund) {
    this.selectedFund.set(fund);
  }

  public changeNotificationPreference(option: string) {
    this.notificationPreference.set(option);
  }
}
