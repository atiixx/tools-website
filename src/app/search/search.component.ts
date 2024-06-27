import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
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
export class SearchComponent implements OnChanges {
  allItems: ItemData[] = [];
  itemsWithCarves: ItemData[] = [];
  itemsWithCaptures: ItemData[] = [];
  searchResults: ItemData[] = [];
  selectedItem: ItemData | null = null;
  filterString: string = '';
  @Input() game: string | undefined;

  @Output() sendCalcTask = new EventEmitter<any>();

  constructor(private fileService: FileService) {}

  ngOnInit(): void {
    this.fetchData();
    this.itemsWithCaptures = this.allItems.filter((item) =>
      item.details.find((x) => x.type == 'Capture')
    );
    this.itemsWithCarves = this.allItems.filter((item) =>
      item.details.find((x) => x.type != 'Body Carve')
    );
    this.itemsWithCaptures = this.allItems.filter((item) =>
      item.details.find((x) => x.type == 'Tail Carve')
    );
  }

  fetchData(): void {
    if (this.game === 'mh3u') {
      this.allItems = this.fileService.getMH3UData();
    } else if (this.game === 'mh4u') {
      this.allItems = this.fileService.getMH4UData();
    } else if (this.game === 'mhgu') {
      this.allItems = this.fileService.getMHGUData();
    }
  }
  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    if (changes['game']) {
      this.resetView();
      this.fetchData();
    }
  }

  resetView() {
    this.selectedItem = null;
    this.searchResults = [];
    this.filterString = '';
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
    let additionalData: Details[] | null | undefined = null;

    carveData = this.selectedItem!.details.filter((x) => {
      return (
        x.type == 'Body Carve' &&
        x.monster_name == monster_name &&
        x.rank == rank
      );
    })[0];

    //Does the selected item also has a detail where the type is capture?
    captureData = this.selectedItem!.details.filter((x) => {
      return (
        x.type == 'Capture' && x.monster_name == monster_name && x.rank == rank
      );
    })[0];

    //Does the selected item also has a detail where the type is Tail Carve?
    tailCarveData = this.selectedItem!.details.filter((x) => {
      return (
        x.type == 'Tail Carve' &&
        x.monster_name == monster_name &&
        x.rank == rank
      );
    })[0];
    [0];
    //Does the selected item also has a detail where the type is none of the above?
    additionalData = this.selectedItem!.details.filter((x) => {
      return (
        x.type !== 'Tail Carve' &&
        x.type !== 'Capture' &&
        x.type !== 'Body Carve' &&
        x.monster_name == monster_name &&
        x.rank == rank
      );
    });

    const dataPackage = {
      carveData,
      captureData,
      tailCarveData,
      additionalData,
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
