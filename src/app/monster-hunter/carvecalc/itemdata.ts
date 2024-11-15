export interface Details {
  monster_name: string;
  chance: number;
  rank: string;
  type: string;
}

export interface ItemData {
  name: string;
  url: string;
  details: Details[];
}
