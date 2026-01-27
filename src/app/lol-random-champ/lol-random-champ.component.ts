import { Component } from '@angular/core';
import { HttpService } from '../services/http.service';
import { CommonModule } from '@angular/common';
import _ from 'lodash';

@Component({
  selector: 'app-lol-random-champ',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lol-random-champ.component.html',
  styleUrl: './lol-random-champ.component.scss'
})
export class LolRandomChampComponent {
  aAllChampions: any[] = [];
  aSelectedChampions: string[] = [];
  sSelectedChamp: any;

  constructor(private http: HttpService) { }


  ngOnInit() {
    const storageChampions = localStorage.getItem("selected_champions")
    if (storageChampions && storageChampions != "") {
      this.aSelectedChampions = storageChampions.split(",")
    }
    this.getCurrentVersion().subscribe((versions: string[]) =>
      this.getAllChampions(versions[0]))
  }


  getCurrentVersion() {
    const sVersionApiUrl = 'https://ddragon.leagueoflegends.com/api/versions.json';
    return this.http
      .get<string[]>(`${sVersionApiUrl}`)
  }

  getAllChampions(version: string) {
    const sAllChampionsApiUrl = 'https://ddragon.leagueoflegends.com/cdn/' + version + '/data/en_US/champion.json';
    this.http
      .get<any>(`${sAllChampionsApiUrl}`)
      .subscribe((champions: any) => {
        if (champions) {
          for (let champ in champions.data) {
            this.aAllChampions.push(champions.data[champ].name);
          }
        }
      });
  }

  onAddButtonClicked(champ: string) {
    this.aSelectedChampions.push(champ)
    this.aSelectedChampions.sort()
    const index = this.aAllChampions.indexOf(champ, 0);
    if (index > -1) {
      this.aAllChampions.splice(index, 1);
    }
    localStorage.setItem("selected_champions", this.aSelectedChampions.join(","));
  }

  onRemoveButtonClicked(champ: string) {
    this.aAllChampions.push(champ)
    this.aAllChampions.sort()
    const index = this.aSelectedChampions.indexOf(champ, 0);
    if (index > -1) {
      this.aSelectedChampions.splice(index, 1);
    }
    localStorage.setItem("selected_champions", this.aSelectedChampions.join(","));
  }

  onRandomButtonClicked() {
    if (this.aSelectedChampions.length == 0) {
      this.sSelectedChamp = "Keine Champions ausgewählt"
      return
    }
    this.sSelectedChamp = _.sample(this.aSelectedChampions)
  }

}
