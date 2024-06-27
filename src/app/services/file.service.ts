import { Injectable } from '@angular/core';
import mh3uItemData from '../../assets/data/mh3u_allitems.json';
import mh4uItemData from '../../assets/data/mh4u_allitems.json';
import mhguItemData from '../../assets/data/mhgu_allitems.json';
import { Details, ItemData } from '../carvecalc/itemdata';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  mh3uData: ItemData[] = [];
  mh4uData: ItemData[] = [];
  mhguData: ItemData[] = [];
  constructor() {
    this.mh3uData = mh3uItemData;
    this.mh4uData = mh4uItemData;
    this.mhguData = this.cleanUpMHGUData(mhguItemData);
  }

  //TODO: Manche otherTypes sind doppelt drin (zb. wenn man ne chance auf doppelte menge an items hat): bsp: seregios Talon

  cleanUpMHGUData(data: any[]): ItemData[] {
    let mhguData: ItemData[] = [];

    for (let i = 0; i < data.length; i++) {
      let seenCombinations: Set<string> = new Set();
      let uniqueDetails: Details[] = [];

      for (let j = 0; j < data[i]['details'].length; j++) {
        let detail = data[i]['details'][j];
        detail['chance'] = Number(detail['chance']);

        // Create a unique key for the combination
        let combinationKey = `${detail['monster_name']}_${detail['rank']}_${detail['type']}`;

        // Check if the combination has been seen before
        if (!seenCombinations.has(combinationKey)) {
          // Add to seen combinations
          seenCombinations.add(combinationKey);

          // Push to uniqueDetails
          uniqueDetails.push(detail);
        }
      }

      let item: ItemData = {
        name: data[i]['name'],
        url: data[i]['url'],
        details: uniqueDetails,
      };

      mhguData.push(item);
    }
    return mhguData;
  }

  getMH3UData(): ItemData[] {
    return this.mh3uData;
  }

  getMH4UData(): ItemData[] {
    return this.mh4uData;
  }

  getMHGUData(): ItemData[] {
    return this.mhguData;
  }
}
