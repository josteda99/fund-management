import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

@Component({
  selector: 'app-cancel-dialog',
  imports: [],
  templateUrl: './cancel-dialog.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CancelDialog {
  public fundName = input.required<string>();

  public cancelFund = output<void>();

  public onCancelFund() {
    this.cancelFund.emit();
  }
}
