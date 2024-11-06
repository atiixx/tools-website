import { Component } from '@angular/core';
import { WebsocketService } from '../services/websocket.service';
import { ConnectionIndicatorComponent } from '../helper/connection-indicator/connection-indicator.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

interface Message {
  name: string;
  message: string;
}
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
  isConnected = false;
  messages: Message[] = [];
  sName: string = 'Hans Wöschtl';
  sMessage: string = 'Hello world!';

  constructor(private ws: WebsocketService, private snackBar: MatSnackBar) {
    this.ws.connectionCallbackObservable.subscribe((data: boolean) => {
      this.isConnected = data;
    });
    this.ws.messageCallbackObservable.subscribe((data: Message) => {
      this.messages.unshift({ name: data.name, message: data.message });
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
    const messageBlop = { name: this.sName, message: this.sMessage };
    this.sMessage = '';
    this.ws.sendMessage(JSON.stringify(messageBlop));
  }
}
