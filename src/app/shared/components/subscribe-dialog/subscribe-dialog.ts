import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

@Component({
  selector: 'app-subscribe-dialog',
  imports: [],
  templateUrl: './subscribe-dialog.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubscribeDialog {
  public fundName = input.required<string>();
  public notificationPreference = input.required<string>();

  public notificationPreferenceChange = output<string>();
  public subscribe = output<void>();

  public selectNotificationPreference(value: string) {
    this.notificationPreferenceChange.emit(value);
  }

  public onSubscribe() {
    this.subscribe.emit();
  }
}
