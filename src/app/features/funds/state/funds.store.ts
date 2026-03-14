import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withProps,
  withState,
} from '@ngrx/signals';
import { Fund, User } from './../interfaces/fund.interfaces';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';
import { computed, inject } from '@angular/core';
import { FundManagementService } from '../../../core/services/fund-management-service';
import { tapResponse } from '@ngrx/operators';
import { MessageService } from '../../../core/services/message-service';

interface fundState {
  availableFunds: Fund[];
  isLoading: boolean;
  user: User | null;
  selectedFund: Fund | null;
}

const initialState: fundState = {
  availableFunds: [],
  isLoading: false,
  user: null,
  selectedFund: null,
};

export const FundStore = signalStore(
  withState(initialState),
  withComputed(({ user }) => ({
    userBalance: computed(() => user()?.balance),
  })),
  withProps(() => ({
    fundService: inject(FundManagementService),
    messageService: inject(MessageService),
  })),
  withMethods((store) => ({
    selectFund(fund: Fund): void {
      patchState(store, () => ({
        selectedFund: { ...fund },
      }));
    },
    getInitialAvailableFunds: rxMethod<void>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap(() => {
          return store.fundService.getInitialAvailableFunds().pipe(
            tapResponse({
              next: (availableFunds) => patchState(store, { availableFunds, isLoading: false }),
              error: (err) => {
                patchState(store, { isLoading: false });
                console.error(err);
              },
            }),
          );
        }),
      ),
    ),
    getUser: rxMethod<void>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap(() => {
          return store.fundService.getUser().pipe(
            tapResponse({
              next: (user) => patchState(store, { user, isLoading: false }),
              error: (err) => {
                patchState(store, { isLoading: false });
                console.error(err);
              },
            }),
          );
        }),
      ),
    ),
    //fix this
    subscribeFund: rxMethod<number>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap((fundId) => {
          return store.fundService.subscribeFund(fundId).pipe(
            tapResponse({
              next: ({ subscribedFund, balance }) =>
                patchState(store, (state) => {
                  store.messageService.showMessage('Subscribe successfully', 'success');
                  return {
                    user: {
                      ...state.user!,
                      balance,
                      subscribedFunds: [...state.user!.subscribedFunds, subscribedFund],
                    },
                    isLoading: false,
                  };
                }),
              error: (err) => {
                store.messageService.showMessage('Subscribe failuree', 'danger');

                patchState(store, { isLoading: false });
                console.error(err);
              },
            }),
          );
        }),
      ),
    ),
    cancelFund: rxMethod<number>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap((fundId) => {
          return store.fundService.cancelFund(fundId).pipe(
            tapResponse({
              next: ({ balance }) =>
                patchState(store, (state) => {
                  store.messageService.showMessage('Cancel succesfully', 'success');

                  return {
                    user: {
                      ...state.user!,
                      balance,
                      subscribedFunds: state.user!.subscribedFunds.filter((f) => f.id !== fundId),
                    },
                    isLoading: false,
                  };
                }),
              error: (err) => {
                store.messageService.showMessage('Cancel failure', 'danger');

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
