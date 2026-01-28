import { Component } from '@angular/core';
import { HttpService } from '../services/http.service';
import { CommonModule } from '@angular/common';
import _ from 'lodash';
import { MatIconModule } from '@angular/material/icon';
import { ChampListitemComponent } from "./champ-listitem/champ-listitem.component";

//TODO: Third area with successfull champs
//TODO Mach schön

type ChampData = {
  name: string,
  selected: boolean,
  checked: boolean
}


@Component({
  selector: 'app-lol-random-champ',
  standalone: true,
  imports: [CommonModule, MatIconModule, ChampListitemComponent],
  templateUrl: './lol-random-champ.component.html',
  styleUrl: './lol-random-champ.component.scss'
})
export class LolRandomChampComponent {
  allChampionsMap: Map<string, ChampData> = new Map<string, ChampData>();
  sSelectedChamp: ChampData = { name: "", selected: false, checked: false };

  constructor(private http: HttpService) { }


  ngOnInit() {
    const selectedChampions = localStorage.getItem("selected_champions") || "";
    const checkedChampions = localStorage.getItem("checked_champions") || "";
    this.getCurrentVersion().subscribe((versions: string[]) =>
      this.getAllChampions(versions[0], selectedChampions.split(","), checkedChampions.split(","))
    );
  }


  getCurrentVersion() {
    const sVersionApiUrl = 'https://ddragon.leagueoflegends.com/api/versions.json';
    return this.http
      .get<string[]>(`${sVersionApiUrl}`)
  }

  getAllChampions(version: string, selectedChampions: string[], checkedChampions: string[]) {
    const sAllChampionsApiUrl = 'https://ddragon.leagueoflegends.com/cdn/' + version + '/data/en_US/champion.json';
    this.http
      .get<any>(`${sAllChampionsApiUrl}`)
      .subscribe((champions: any) => {
        if (champions) {
          for (let champ in champions.data) {
            const champname = champions.data[champ].name;
            const isChecked: boolean = checkedChampions.includes(champname);
            const isSelected: boolean = selectedChampions.includes(champname);
            this.allChampionsMap.set(champions.data[champ].name, { name: champname, selected: isSelected, checked: isChecked })
          }
        }
      });
  }

  onSelectionButtonClicked(champ: ChampData) {
    this.allChampionsMap.set(champ.name, { name: champ.name, selected: !champ.selected, checked: champ.checked })
    const already_selected = localStorage.getItem("selected_champions");
    const aSelected = already_selected ? already_selected.split(",") : [];
    if (aSelected.includes(champ.name)) {
      const index = aSelected.indexOf(champ.name);
      aSelected.splice(index, 1);
    } else {
      aSelected.push(champ.name);
    }
    localStorage.setItem("selected_champions", aSelected.join(","));
  }

  onRandomButtonClicked() {
    const selected = [];
    for (const [_, value] of this.allChampionsMap) {
      if (value.selected) {
        selected.push(value)
      }
    }
    if (selected.length == 0) {
      this.sSelectedChamp.name = "Keine Champions ausgewählt"
      return
    }
    this.sSelectedChamp = _.sample(selected)!
  }

  onChampChecked(champ: ChampData) {
    this.allChampionsMap.set(champ.name, { name: champ.name, selected: champ.selected, checked: !champ.checked })
    const already_checked = localStorage.getItem("checked_champions");
    const aChecked = already_checked ? already_checked.split(",") : [];
    if (aChecked.includes(champ.name)) {
      const index = aChecked.indexOf(champ.name);
      aChecked.splice(index, 1);
    } else {
      aChecked.push(champ.name);
    }
    localStorage.setItem("checked_champions", aChecked.join(","));
  }

  get unselectedChampions(): ChampData[] {
    return [...this.allChampionsMap.values()]
      .filter(champ => !champ.selected);
  }

  get selectedChampions(): ChampData[] {
    return [...this.allChampionsMap.values()]
      .filter(champ => champ.selected);
  }

}
