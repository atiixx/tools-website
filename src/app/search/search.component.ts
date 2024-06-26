import { Component, EventEmitter, Output } from '@angular/core';
import { FileService } from '../services/file.service';
import { CommonModule } from '@angular/common';
import { ItemData } from '../carvecalc/itemdata';
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
  items: ItemData[] = [];
  itemsWithCaptures: ItemData[] = [];
  searchResults: ItemData[] = [];
  selectedItem: ItemData | null = null;
  filterString: string = '';
  @Output() sendCalcTask = new EventEmitter<ItemData>();

  constructor(private fileService: FileService) {}

  ngOnInit(): void {
    this.itemsWithCaptures = this.fileService.getMH4UData();
    this.items = this.itemsWithCaptures.filter((item) =>
      item.details.find((x) => x.type != 'Capture')
    );
  }

  search(): void {
    this.searchResults = this.items.filter((item) =>
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

  calculateSelected(monster: ItemData) {
    if (this.selectedItem) {
      this.sendCalcTask.emit(monster);
    }
  }

  resetInputField(): void {
    this.filterString = this.selectedItem ? this.selectedItem.name : '';
    this.searchResults = [];
  }
}
