import { Component, Input } from '@angular/core';
import { CommonModule, NgStyle } from '@angular/common';
import { ConnectionStatus } from '../../util/types';

@Component({
  selector: 'app-connection-indicator',
  standalone: true,
  imports: [CommonModule, NgStyle],
  templateUrl: './connection-indicator.component.html',
  styleUrl: './connection-indicator.component.scss',
})
export class ConnectionIndicatorComponent {
  @Input() connectionStatus: ConnectionStatus = ConnectionStatus.DISCONNECTED;
  sConnected: string = 'Connected';
  sNotConnected: string = 'Not Connected';
  sConnecting: string = 'Connecting';
}
