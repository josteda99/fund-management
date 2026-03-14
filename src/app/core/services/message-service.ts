import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  public message = signal('');
  public type = signal<'success' | 'danger' | 'warning' | 'info'>('success');
  public isShowing = signal(false);

  private hideTimer: ReturnType<typeof setTimeout> | null = null;

  public showMessage(
    message: string,
    type: 'success' | 'danger' | 'warning' | 'info' = 'success',
    durationMs = 5000,
  ) {
    this.message.set(message);
    this.type.set(type);
    this.isShowing.set(true);

    if (this.hideTimer) {
      clearTimeout(this.hideTimer);
    }

    this.hideTimer = setTimeout(() => {
      this.isShowing.set(false);
      this.hideTimer = null;
    }, durationMs);
  }

  public hideMessage() {
    if (this.hideTimer) {
      clearTimeout(this.hideTimer);
      this.hideTimer = null;
    }

    this.isShowing.set(false);
  }
}
