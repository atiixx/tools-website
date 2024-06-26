export interface CarveChance {
  monster_name: string;
  carving_chance: number;
}

export interface CarvingData {
  name: string;
  carve_chances: CarveChance[];
}
