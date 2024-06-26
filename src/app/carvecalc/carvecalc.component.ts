import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FileService } from '../services/file.service';
import { SearchComponent } from '../search/search.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-carvecalc',
  standalone: true,
  imports: [FormsModule, SearchComponent, CommonModule],
  templateUrl: './carvecalc.component.html',
  styleUrl: './carvecalc.component.scss',
  providers: [FileService],
})
export class CarvecalcComponent {
  public carvingChance: number = 0;
  public tailCarveChance: number = 0;
  public carvingCount: number = 3;
  public chanceWithKill: string = '0';
  public chanceWithKillTailCut: string = '0';
  public captureChance = 0;

  constructor(private fileService: FileService) {}

  onInputChange(value: string) {
    this.carvingChance = Number(value);
  }

  onCarveCountChange(value: string) {
    this.carvingCount = Number(value);
  }
  onTailCarveChange(value: string) {
    this.tailCarveChance = Number(value);
  }

  calculate() {
    const calculatedKillChance = this.calculateOnCarve() * 100;
    let calculatedKillTailCutChance = 0;
    if (this.tailCarveChance > 0) {
      calculatedKillTailCutChance = this.calculateOnCarveWithTailCut() * 100;
    } else {
      calculatedKillTailCutChance = calculatedKillChance;
    }
    this.updateProperties(calculatedKillChance, calculatedKillTailCutChance);
  }

  updateProperties(
    calculatedKillChance: number,
    calculatedKillTailCutChance: number
  ) {
    this.chanceWithKill = calculatedKillChance.toFixed(2);
    this.chanceWithKillTailCut = calculatedKillTailCutChance.toFixed(2);
  }

  calculateOnCarve() {
    return 1 - Math.pow(1 - this.carvingChance / 100, this.carvingCount);
  }

  calculateOnCarveWithTailCut() {
    const chanceKill = Math.pow(
      1 - this.carvingChance / 100,
      this.carvingCount
    );
    const chanceKillTailCut = 1 - this.tailCarveChance / 100;
    return 1 - chanceKill * chanceKillTailCut;
  }

  receiveCalcTask($event: any) {
    this.carvingChance = Number($event.chance);
    this.calculate();
  }

  receiveCaptureInfo($event: any) {
    console.log('angekommen');
    if ($event) {
      this.captureChance = this.calculateCaptureChance($event.chance);
    } else {
      this.captureChance = 0;
    }
  }

  //TODO: Capture chance calculaten (2 Slots mit der Chance mit ner bestimmten chance auf 3 slots)
  //TODO: Capture Chance mit einem Cut vom Tail berechnen

  calculateCaptureChance(chance: number) {
    1 - 0.982 * (1 - 0.02 * 0.69);
    return chance;
  }
}
