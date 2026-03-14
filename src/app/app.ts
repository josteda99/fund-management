import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Message } from './shared/components/message/message';
import { Navbar } from './shared/components/navbar/navbar';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [RouterOutlet, Message, Navbar],
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
})
export class App {}
