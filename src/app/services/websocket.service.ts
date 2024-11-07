import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ConnectionStatus, Message } from '../util/types';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  ws?: WebSocket;
  private connectionCallback = new Subject<ConnectionStatus>(); // Source
  connectionCallbackObservable = this.connectionCallback.asObservable(); // Stream

  private messageCallback = new Subject<Message | Message[]>(); // Source
  messageCallbackObservable = this.messageCallback.asObservable(); // Stream

  private errorCallback = new Subject<boolean>(); // Source
  errorCallbackObservable = this.errorCallback.asObservable(); // Stream

  constructor() {
    this.resetWebSocket();
  }

  ngOnInit(): void {
    window.addEventListener('beforeunload', () => {
      if (this.ws) {
        this.disconnect();
      }
    });
  }

  resetWebSocket() {
    if (this.ws) {
      this.disconnect();
    }
    this.ws = new WebSocket('ws://localhost:8080');
    //this.ws = new WebSocket('wss://ws-message-feed-server.onrender.com');
    this.connectionCallback.next(ConnectionStatus.CONNECTING);
    this.ws.addEventListener('open', () => {
      this.connectionCallback.next(ConnectionStatus.CONNECTED);
      this.onWSConnectionOpened();
    });
    this.ws.addEventListener('message', (message: unknown) =>
      this.onMessageReceived(message)
    );
    this.ws.addEventListener('error', () => {
      console.error("Couldn't connect to Websocket.");
      this.connectionCallback.next(ConnectionStatus.DISCONNECTED);
      this.errorCallback.next(true);
    });
    this.ws.addEventListener('close', () => {
      this.connectionCallback.next(ConnectionStatus.DISCONNECTED);
    });
  }

  connect(): void {
    this.resetWebSocket();
  }

  disconnect() {
    this.ws?.close();
    this.ws = undefined;
  }

  onMessageReceived(message: any) {
    this.messageCallback.next(JSON.parse(message.data));
  }

  onWSConnectionOpened() {
    if (this.ws) {
      this.ws!.send(
        JSON.stringify({
          name: 'Notification',
          message: 'Jemand ist dem Feed beigetreten!',
        })
      );
    }
  }

  sendMessage(messageBlop: string) {
    this.ws!.send(messageBlop);
  }
}
