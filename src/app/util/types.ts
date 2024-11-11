export interface Message {
  id: number;
  name: string;
  message: string;
  date: string;
  sameOrigin?: boolean;
}

export enum ConnectionStatus {
  CONNECTED = 'Connected',
  CONNECTING = 'Connecting',
  DISCONNECTED = 'Disconnected',
}
