import { Component, EventEmitter, Output } from '@angular/core';
import { FileService } from '../services/file.service';
import { CommonModule } from '@angular/common';
import { Details, ItemData } from '../carvecalc/itemdata';
import { FormsModule } from '@angular/forms';
import { MatIcon, MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
  providers: [FileService],
})
export class SearchComponent {
  allItems: ItemData[] = [];
  itemsWithCarves: ItemData[] = [];
  itemsWithCaptures: ItemData[] = [];
  searchResults: ItemData[] = [];
  selectedItem: ItemData | null = null;
  filterString: string = '';
  @Output() sendCalcTask = new EventEmitter<any>();

  constructor(private fileService: FileService) {}

  ngOnInit(): void {
    this.allItems = this.fileService.getMH4UData();
    this.itemsWithCaptures = this.allItems.filter((item) =>
      item.details.find((x) => x.type == 'Capture')
    );
    this.itemsWithCarves = this.allItems.filter((item) =>
      item.details.find((x) => x.type != 'Carve')
    );
    this.itemsWithCaptures = this.allItems.filter((item) =>
      item.details.find((x) => x.type == 'Tail Carve')
    );
  }

  search(): void {
    this.searchResults = this.allItems.filter((item) =>
      item.name.toLowerCase().includes(this.filterString.toLowerCase())
    );
    if (this.filterString == '') {
      this.searchResults = [];
    }
  }

  selectItem(item: ItemData): void {
    this.selectedItem = item;
    this.resetInputField();
  }

  getTableData(): any[] {
    if (this.selectedItem) {
      const seenIdentifiers = new Set<string>();

      return this.selectedItem.details.reduce((acc, item) => {
        const identifier = `${item.monster_name}-${item.rank}`;
        if (!seenIdentifiers.has(identifier)) {
          seenIdentifiers.add(identifier);
          acc.push(item);
        }
        return acc;
      }, [] as Details[]);
    }

    return [];
  }

  calculateSelected(monster_name: string, rank: string) {
    let carveData: Details | null | undefined = null;
    let captureData: Details | null | undefined = null;
    let tailCarveData: Details | null | undefined = null;

    console.log(monster_name, rank);
    carveData = this.selectedItem!.details.filter((x) => {
      return (
        x.type == 'Carve' && x.monster_name == monster_name && x.rank == rank
      );
    })[0];

    //Does the selected item also has a detail where the type is capture?
    captureData = this.selectedItem!.details.filter((x) => {
      return (
        x.type == 'Capture' && x.monster_name == monster_name && x.rank == rank
      );
    })[0];

    //Does the selected item also has a detail where the type is Tail Carve?
    tailCarveData = this.selectedItem!.details.find((x) => {
      return (
        x.type == 'Tail Carve' &&
        x.monster_name == monster_name &&
        x.rank == rank
      );
    });

    const dataPackage = {
      carveData,
      captureData,
      tailCarveData,
    };

    this.sendCalcTask.emit(dataPackage);
  }

  resetInputField(): void {
    this.filterString = this.selectedItem ? this.selectedItem.name : '';
    this.searchResults = [];
  }

  goToLink() {
    window.open(this.selectedItem!.url, '_blank');
  }
}
