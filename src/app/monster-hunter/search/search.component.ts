import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FileService } from '../../services/file.service';
import { CommonModule } from '@angular/common';
import { Details, ItemData } from '../carvecalc/itemdata';
import { FormsModule } from '@angular/forms';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule, MatSnackBarModule],
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
  loading: boolean = false;
  monstersWithSpecialCarveCount = this.getSpecialMonstersMH4U();
  mh3uDataIsLoaded = false;
  mh4uDataIsLoaded = false;
  mhguDataIsLoaded = false;
  @Input() game: string | undefined;

  @Output() sendCalcTask = new EventEmitter<any>();

  constructor(
    private fileService: FileService,
    private snackBar: MatSnackBar
  ) {}

  getSpecialMonstersMH4U() {
    const list = [
      {
        monster_name: 'Gravios, Apex Gravios, Black Gravios',
        body_carves: 4,
        tail_carves: 2,
      },
      {
        monster_name: 'Deviljho, Apex Deviljho, Savage Deviljho',
        body_carves: 4,
        tail_carves: 2,
      },
      {
        monster_name: 'Akantor',
        body_carves: 4,
        tail_carves: 2,
      },
      {
        monster_name: 'Ukanlos',
        body_carves: 4,
        tail_carves: 2,
      },
      {
        monster_name: "Dah'ren Mohran",
        body_carves: 8,
        mouth_carves: 2,
      },
      {
        monster_name: 'Dalamadur, Shah Dalamadur',
        body_carves: 8,
        tail_carves: 1,
      },
      {
        monster_name: 'Gogmazios',
        body_carves: 6,
        tail_carves: 2,
      },
      {
        monster_name: 'Monoblos, White Monoblos',
        body_carves: 4,
        tail_carves: 2,
      },
      {
        monster_name: 'Kushala Daora',
        body_carves: 4,
        tail_carves: 1,
      },
      {
        monster_name: 'Fatalis, Crimson Fatalis, White Fatalis',
        body_carves: 9,
        tail_carves: 0,
      },
      {
        monster_name: 'Teostra',
        body_carves: 4,
        tail_carves: 1,
      },
      {
        monster_name: 'Chameleos',
        body_carves: 4,
        tail_carves: 1,
      },
      {
        monster_name: 'Raging Brachydios',
        body_carves: 4,
        tail_carves: 1,
      },
    ];
    return list;
  }

  //TODO: Check if data already loaded still not working
  fetchData(): void {
    this.loading = true;
    if (this.game === 'mh3u') {
      if (this.mh3uDataIsLoaded) {
        return;
      }
      this.fileService.getMH3UDataFromGist().subscribe((data) => {
        this.allItems = data;
        this.loading = false;
        this.showPopup();
        this.mh3uDataIsLoaded = true;
        this.mh4uDataIsLoaded = false;
        this.mhguDataIsLoaded = false;
      });
    } else if (this.game === 'mh4u') {
      if (this.mh4uDataIsLoaded) {
        return;
      }
      this.fileService.getMH4UDataFromGist().subscribe((data) => {
        this.allItems = data;
        this.loading = false;
        this.showPopup();
        this.mh4uDataIsLoaded = true;
        this.mh3uDataIsLoaded = false;
        this.mhguDataIsLoaded = false;
      });
    } else if (this.game === 'mhgu') {
      if (this.mhguDataIsLoaded) {
        return;
      }
      this.fileService.getMHGUDataFromGist().subscribe((data) => {
        this.allItems = data;
        this.loading = false;
        this.showPopup();
      });

      this.mhguDataIsLoaded = true;
      this.mh3uDataIsLoaded = false;
      this.mh4uDataIsLoaded = false;
    }
    this.setData();
  }

  setData() {
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

  checkMonsterInListMh(monster_name: string) {
    let bodyCarveCount;
    let tailCarveCount;
    this.monstersWithSpecialCarveCount.forEach((x) => {
      if (x.monster_name.includes(monster_name)) {
        bodyCarveCount = x.body_carves ? x.body_carves : undefined;
        tailCarveCount = x.tail_carves ? x.tail_carves : undefined;
      }
    });
    return { bodyCarveCount, tailCarveCount };
  }

  calculateSelected(monster_name: string, rank: string) {
    let carveData: Details | null | undefined = null;
    let captureData: Details | null | undefined = null;
    let tailCarveData: Details | null | undefined = null;
    let additionalData: Details[] | null | undefined = null;
    let hasMultipleCarvePoints: boolean = false;
    let nonBodyCarvePoints: Details[] = [];
    let hasNonBodyCarvePoints: boolean = false;

    let { bodyCarveCount, tailCarveCount } =
      this.checkMonsterInListMh(monster_name);
    const carveDatas = this.selectedItem!.details.filter((x) => {
      return (
        x.type.includes('Carve') &&
        !x.type.includes('Tail') &&
        !x.type.includes('Head') &&
        x.monster_name == monster_name &&
        x.rank == rank
      );
    });

    nonBodyCarvePoints = carveDatas.filter((x) => {
      return x.type !== 'Body Carve';
    });

    if (carveDatas.length > 1) {
      hasMultipleCarvePoints = true;
    }
    if (nonBodyCarvePoints.length > 0) {
      hasNonBodyCarvePoints = true;
    }

    carveData = carveDatas[0];
    //this.fileService.saveJson(carveDatas);
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
      const isExcludedCarve =
        !x.type.includes('Carve') || x.type === 'Head Carve';
      return (
        x.type !== 'Tail Carve' &&
        x.type !== 'Capture' &&
        isExcludedCarve &&
        x.monster_name == monster_name &&
        x.rank == rank
      );
    });

    const dataPackage = {
      carveData,
      captureData,
      tailCarveData,
      additionalData,
      hasMultipleCarvePoints,
      hasNonBodyCarvePoints,
      bodyCarveCount,
      tailCarveCount,
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

  showPopup(): void {
    this.snackBar.open('Daten geladen!', 'Close', {
      duration: 1000, // Duration in milliseconds
      horizontalPosition: 'center', // Position on screen
      verticalPosition: 'bottom', // Position on screen
    });
  }
}
