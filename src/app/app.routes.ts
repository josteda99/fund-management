import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./features/dashboard/dashboard-page/dashboard-page').then((c) => c.DashboardPage),
  },
  {
    path: 'available-funds',
    loadComponent: () =>
      import('./features/funds/pages/available-funds-page/available-funds-page').then(
        (c) => c.AvailableFundsPage,
      ),
  },
  {
    path: 'transaction-history',
    loadComponent: () =>
      import('./features/transactions/pages/transaction-history-page/transaction-history-page').then(
        (c) => c.TransactionHistoryPage,
      ),
  },
  { path: '**', redirectTo: 'dashboard' },
];
