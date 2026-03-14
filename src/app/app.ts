import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { Message } from './shared/components/message/message';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, Message],
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
})
export class App {}
