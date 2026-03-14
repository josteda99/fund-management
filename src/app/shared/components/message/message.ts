import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageService } from '../../../core/services/message-service';

@Component({
  standalone: true,
  selector: 'app-message',
  imports: [CommonModule],
  templateUrl: './message.html',
  styleUrls: ['./message.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Message {
  public messageService = inject(MessageService);
}
