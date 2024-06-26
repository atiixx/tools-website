import { Component, EventEmitter, Output } from '@angular/core';
import { FileService } from '../services/file.service';
import { CommonModule } from '@angular/common';
import { CarvingData } from '../carvecalc/carvingdata';
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
  items: CarvingData[] = [];
  searchResults: CarvingData[] = [];
  selectedItem: CarvingData | null = null;
  filterString: string = '';
  @Output() sendCalcTask = new EventEmitter<CarvingData>();

  constructor(private fileService: FileService) {}

  ngOnInit(): void {
    this.items = this.fileService.getMH4UData();
  }

  search(): void {
    this.searchResults = this.items.filter((item) =>
      item.name.toLowerCase().includes(this.filterString.toLowerCase())
    );
  }

  selectItem(item: CarvingData): void {
    this.selectedItem = item;
    this.resetInputField();
  }

  getTableData(): any[] {
    if (this.selectedItem) {
      return this.selectedItem.carve_chances;
    }
    return [];
  }

  calculateSelected(monster: CarvingData) {
    if (this.selectedItem) {
      console.log(monster);
      this.sendCalcTask.emit(monster);
    }
  }

  resetInputField(): void {
    this.filterString = '';
    this.searchResults = [];
  }
}
