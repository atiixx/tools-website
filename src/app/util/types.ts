export interface Message {
  id: number;
  name: string;
  message: string;
  date: string;
}

export enum ConnectionStatus {
  CONNECTED = 'Connected',
  CONNECTING = 'Connecting',
  DISCONNECTED = 'Disconnected',
}
