import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Fund } from '../../../features/funds/interfaces/fund.interfaces';

@Component({
  selector: 'app-subscribe-dialog',
  imports: [FormsModule, CommonModule],
  templateUrl: './subscribe-dialog.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubscribeDialog {
  public fund = input.required<Fund | null>();
  public userBalance = input.required<number>();
  public notificationPreference = input.required<string>();

  public notificationPreferenceChange = output<string>();
  public subscribe = output<number>();

  public amount = signal(0);

  public errorMessage = computed(() => {
    const fund = this.fund();
    if (!fund) return '';
    const amount = this.amount();
    const userBalance = this.userBalance();
    if (amount > userBalance) return 'Not enough balance to invest';
    return '';
  });

  public checkDisabled = computed(() => {
    const fund = this.fund();
    if (!fund) return true;
    const amount = this.amount();
    return amount < fund.minAmount || amount > this.userBalance();
  });

  public selectNotificationPreference(value: string) {
    this.notificationPreferenceChange.emit(value);
  }

  public onSubscribe() {
    this.subscribe.emit(this.amount());
  }
}
