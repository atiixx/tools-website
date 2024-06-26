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
  @Output() sendCalcTask = new EventEmitter<Details>();
  @Output() sendCaptureInfo = new EventEmitter<Details>();

  constructor(private fileService: FileService) {}

  ngOnInit(): void {
    this.allItems = this.fileService.getMH4UData();
    this.itemsWithCaptures = this.allItems.filter((item) =>
      item.details.find((x) => x.type == 'Capture')
    );
    this.itemsWithCarves = this.allItems.filter((item) =>
      item.details.find((x) => x.type != 'Capture')
    );
  }

  search(): void {
    this.searchResults = this.itemsWithCarves.filter((item) =>
      item.name.toLowerCase().includes(this.filterString.toLowerCase())
    );
  }

  selectItem(item: ItemData): void {
    this.selectedItem = item;
    this.resetInputField();
  }

  getTableData(): any[] {
    if (this.selectedItem) {
      return this.selectedItem.details.filter(
        (itemDetails) => itemDetails.type != 'Capture'
      );
    }
    return [];
  }

  calculateSelected(itemData: Details) {
    let captureDetailsSameRank: Details | undefined;
    try {
      const itemWithCaptureDetails = this.itemsWithCaptures.filter((item) => {
        return item.name == this.selectedItem!.name;
      })[0];
      if (itemWithCaptureDetails) {
        captureDetailsSameRank = itemWithCaptureDetails.details.filter(
          (item) => {
            return (
              item.rank == itemData.rank &&
              item.monster_name == itemData.monster_name &&
              item.type == 'Capture'
            );
          }
        )[0];
      }
      if (itemData) {
        this.sendCalcTask.emit(itemData);
      }
      this.sendCaptureInfo.emit(captureDetailsSameRank);
    } catch (error) {
      console.log(error);
    }
  }

  resetInputField(): void {
    this.filterString = this.selectedItem ? this.selectedItem.name : '';
    this.searchResults = [];
  }
}
