import { Component } from '@angular/core';
import { WebsocketService } from '../services/websocket.service';
import { ConnectionIndicatorComponent } from '../helper/connection-indicator/connection-indicator.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ConnectionStatus, Message } from '../util/types';

@Component({
  selector: 'app-message-feed',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ConnectionIndicatorComponent,
    MatSnackBarModule,
  ],
  templateUrl: './message-feed.component.html',
  styleUrl: './message-feed.component.scss',
})
export class MessageFeedComponent {
  connectionStatus = ConnectionStatus.DISCONNECTED;
  messages: Message[] = [];
  sName: string = 'Hans Wöschtl';
  sMessage: string = 'Hello world!';

  constructor(private ws: WebsocketService, private snackBar: MatSnackBar) {
    this.ws.connectionCallbackObservable.subscribe((data: ConnectionStatus) => {
      this.connectionStatus = data;
    });
    this.ws.messageCallbackObservable.subscribe((data: Message | Message[]) => {
      if (Array.isArray(data)) {
        data.sort((a, b) => (a.id > b.id ? 1 : b.id > a.id ? -1 : 0));
        data.forEach((message) => {
          this.messages.unshift({
            id: message.id,
            name: message.name,
            message: message.message,
            date: formatString(message.date),
          });
        });
      } else {
        this.messages.unshift({
          id: data.id,
          name: data.name,
          message: data.message,
          date: formatString(data.date),
        });
      }
    });
    this.ws.errorCallbackObservable.subscribe((error: boolean) => {
      if (error) {
        this.snackBar.open("Can't connect to Websocket", 'Close', {
          duration: 2000, // Duration in milliseconds
          horizontalPosition: 'center', // Position on screen
          verticalPosition: 'bottom', // Position on screen
        });
      }
    });
  }

  connectToWebsocket() {
    this.ws.connect();
  }

  disconnectFromWebsocket() {
    this.ws.disconnect();
  }

  sendMessage() {
    const messageBlop = {
      name: this.sName,
      message: this.sMessage,
      date: new Date().toISOString(),
    };
    this.sMessage = '';
    this.ws.sendMessage(JSON.stringify(messageBlop));
  }
}
function formatString(isoDate: string): string {
  if (isoDate) {
    const aDate = isoDate.split('T');
    const date = aDate[0].split('-').reverse().join('.');
    const time = aDate[1].split('.')[0];
    return date + ' ' + time;
  } else {
    return '';
  }
}
