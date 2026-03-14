import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { SubscribedFund } from '../../../features/funds/interfaces/fund.interfaces';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-fund-card',
  imports: [CommonModule],
  templateUrl: './fund-card.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FundCard {
  fund = input.required<SubscribedFund>();
  showCancel = input(false);
  cancel = output<number>();
}
