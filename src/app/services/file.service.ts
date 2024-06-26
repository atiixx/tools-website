import { Injectable } from '@angular/core';
import mh4uCarvingData from '../../assets/data/carvable_items.json';
import { CarveChance, CarvingData } from '../carvecalc/carvingdata';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  mh4uData: CarvingData[] = [];
  constructor() {
    this.mh4uData = this.removeDuplicates(mh4uCarvingData);
  }

  removeDuplicates(data: CarvingData[]): CarvingData[] {
    return data.map((data) => {
      // Create a map to track unique monster_names
      const uniqueMonsters = new Map<string, CarveChance>();

      // Iterate over carve_chances array to populate uniqueMonsters
      data.carve_chances.forEach((chance) => {
        if (!uniqueMonsters.has(chance.monster_name)) {
          uniqueMonsters.set(chance.monster_name, chance);
        }
      });

      // Convert map values back to array
      const uniqueCarveChances: CarveChance[] = Array.from(
        uniqueMonsters.values()
      );

      // Return updated MeatData with unique carve_chances
      return {
        name: data.name,
        carve_chances: uniqueCarveChances,
      };
    });
  }
  getMH4UData(): CarvingData[] {
    return this.mh4uData;
  }
}
