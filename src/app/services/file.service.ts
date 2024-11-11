import { Injectable } from '@angular/core';
import { Details, ItemData } from '../monster-hunter/carvecalc/itemdata';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  gist_url =
    'https://gist.githubusercontent.com/atiixx/11a98d998a1989c1c101ce762b4f6359/raw';

  constructor(private http: HttpClient) {}

  cleanUpData(data: any[]): ItemData[] {
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

  saveJson(data: any) {
    let json = JSON.stringify(data);
    let blob = new Blob([json], { type: 'application/json' });
    let a = document.createElement('a');
    a.download = `${data.name}.json`;
    a.href = window.URL.createObjectURL(blob);
    a.click();
  }

  getMH3UDataFromGist(): Observable<ItemData[]> {
    return this.http
      .get<ItemData[]>(`${this.gist_url}/mh3u_allitems.json`)
      .pipe(map((data: any[]) => this.cleanUpData(data)));
  }

  getMH4UDataFromGist(): Observable<ItemData[]> {
    return this.http
      .get<ItemData[]>(`${this.gist_url}/mh4u_allitems.json`)
      .pipe(map((data: any[]) => this.cleanUpData(data)));
  }

  getMHGUDataFromGist(): Observable<ItemData[]> {
    return this.http
      .get<ItemData[]>(`${this.gist_url}/mhgu_allitems.json`)
      .pipe(map((data: any[]) => this.cleanUpData(data)));
  }
}
