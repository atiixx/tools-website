import { Injectable } from '@angular/core';
import mh3uItemData from '../../assets/data/mh3u_allitems.json';
import mh4uItemData from '../../assets/data/mh4u_allitems.json';
import { ItemData } from '../carvecalc/itemdata';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  mh4uData: ItemData[] = [];
  mh3uData: ItemData[] = [];
  constructor() {
    this.mh3uData = mh3uItemData;
    this.mh4uData = mh4uItemData;
  }

  getMH3UData(): ItemData[] {
    return this.mh3uData;
  }

  getMH4UData(): ItemData[] {
    return this.mh4uData;
  }
}
