import { Component, Input } from '@angular/core';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-connection-indicator',
  standalone: true,
  imports: [NgStyle],
  templateUrl: './connection-indicator.component.html',
  styleUrl: './connection-indicator.component.scss',
})
export class ConnectionIndicatorComponent {
  @Input() isConnected: boolean = true;
  sConnected: string = 'Connected';
  sNotConnected: string = 'Not Connected';
}
