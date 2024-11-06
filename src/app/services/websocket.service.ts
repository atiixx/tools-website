import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  ws?: WebSocket;
  private connectionCallback = new Subject<boolean>(); // Source
  connectionCallbackObservable = this.connectionCallback.asObservable(); // Stream

  private messageCallback = new Subject<{ name: string; message: string }>(); // Source
  messageCallbackObservable = this.messageCallback.asObservable(); // Stream

  private errorCallback = new Subject<boolean>(); // Source
  errorCallbackObservable = this.errorCallback.asObservable(); // Stream

  constructor() {}

  ngOnInit(): void {
    window.addEventListener('beforeunload', () => {
      if (this.ws) {
        this.disconnect();
      }
    });
  }

  connect(): void {
    if (this.ws == undefined) {
      this.ws = new WebSocket('wss://ws-message-feed-server.onrender.com');
      this.ws.addEventListener('open', () => {
        this.connectionCallback.next(true);
        this.onWSConnectionOpened();
      });
      this.ws.addEventListener('message', (message: unknown) =>
        this.onMessageReceived(message)
      );
      this.ws.addEventListener('error', () => {
        console.error("Couldn't connect to Websocket.");
        this.errorCallback.next(true);
      });
      this.ws.addEventListener('close', () => {
        this.connectionCallback.next(false);
      });
    }
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
