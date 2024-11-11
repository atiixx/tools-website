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

export interface AgeData {
  count: string;
  name: string;
  age: number;
}

export interface CatFact {
  status: {
    verified: boolean;
    sentCount: number;
  };
  _id: string;
  user: string;
  text: string;
  __v: number;
  source: string;
  updatedAt: string;
  type: string;
  createdAt: string;
  deleted: boolean;
  used: boolean;
}
export interface ChuckNorrisJoke {
  categories: string[];
  created_at: string;
  icon_url: string;
  id: string;
  updated_at: string;
  url: string;
  value: string;
}
