import { patchState, signalStore, withMethods, withProps, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';
import { inject } from '@angular/core';
import { FundManagementService } from '../../../core/services/fund-management-service';
import { tapResponse } from '@ngrx/operators';
import { FundTransaction } from '../interfaces/transaction.interface';

interface FundsTransactionState {
  fundsTransaction: FundTransaction[];
  isLoading: boolean;
}

const initialState: FundsTransactionState = {
  fundsTransaction: [],
  isLoading: false,
};

export const FundTransactionStore = signalStore(
  withState(initialState),
  withProps((store) => ({
    fundService: inject(FundManagementService),
    fundsTransaction: store.fundsTransaction,
    isLoading: store.isLoading,
  })),
  withMethods((store) => ({
    getFundTransactions: rxMethod<void>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap(() => {
          return store.fundService.getFundTransactions().pipe(
            tapResponse({
              next: (fundsTransaction) => patchState(store, { fundsTransaction, isLoading: false }),
              error: (err) => {
                patchState(store, { isLoading: false });
                console.error(err);
              },
            }),
          );
        }),
      ),
    ),
  })),
);
