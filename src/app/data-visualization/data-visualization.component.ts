import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { Papa } from 'ngx-papaparse';

@Component({
  selector: 'app-data-visualization',
  standalone: true,
  imports: [MatIcon, CommonModule],
  templateUrl: './data-visualization.component.html',
  styleUrl: './data-visualization.component.scss',
})
export class DataVisualizationComponent {
  fileName: string = '';
  csvDataFull: string = '';
  csvHeaders: string[] = [];
  csvEntries: string[][] = [];

  constructor(private papa: Papa) {}

  loadFileData(event: Event) {
    const input = event.target as HTMLInputElement;

    if (!input.files?.length) {
      return;
    }
    const file = input.files[0];
    if (!file) {
      throw new Error('File not found!');
    }
    this.fileName = file.name;
    let reader: FileReader = new FileReader();
    reader.readAsText(file);
    reader.onload = (e) => {
      this.csvDataFull = reader.result as string;
      if (this.csvDataFull == '') {
        throw new Error('CSV File empty!');
      }
      this._parseCSVData();
    };
  }
  private _parseCSVData() {
    this.papa.parse(this.csvDataFull, {
      complete: (result: any) => {
        let data: string[][] = result.data;
        this.csvHeaders = data[0];
        this.csvEntries = data.slice(1);
        console.log(this.csvEntries);
      },
    });
  }
}
