import { Injectable } from '@angular/core';
import mh4uItemData from '../../assets/data/mh4u_carve_capture_tail.json';
import { ItemData } from '../carvecalc/itemdata';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  mh4uData: ItemData[] = [];
  constructor() {
    this.mh4uData = mh4uItemData;
  }

  getMH4UData(): ItemData[] {
    return this.mh4uData;
  }
}
