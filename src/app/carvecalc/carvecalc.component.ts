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
  public captureChance: number = 0;
  public sChanceWithKill: string = '0';
  public sChanceWithKillTailCut: string = '0';
  public sChanceWithCapture: string = '0';
  public sChanceWithCaptureAndTail: string = '0';

  constructor(private fileService: FileService) {}

  calculate() {
    const calculatedKillChance = this.calculateOnCarve();
    const calculatedCaptureItemChance = this.calculateCaptureChance();
    let calculatedKillTailCutChance = 0;
    let calculatedCaptureTailCutChance = 0;
    if (this.tailCarveChance > 0) {
      calculatedKillTailCutChance = this.calculateOnCarveWithTailCut() * 100;
      calculatedCaptureTailCutChance = this.calculateCaptureChanceWithTailCut();
    } else {
      calculatedKillTailCutChance = calculatedKillChance;
      calculatedCaptureTailCutChance = calculatedCaptureItemChance;
    }
    this.updateTemplateStrings(
      calculatedKillChance,
      calculatedKillTailCutChance,
      calculatedCaptureItemChance,
      calculatedCaptureTailCutChance
    );
  }

  updateTemplateStrings(
    calculatedKillChance: number,
    calculatedKillTailCutChance: number,
    calculatedCaptureItemChance: number,
    calculatedCaptureItemChanceWithTail: number
  ) {
    this.sChanceWithKill = calculatedKillChance.toFixed(2);
    this.sChanceWithKillTailCut = calculatedKillTailCutChance.toFixed(2);
    this.sChanceWithCapture = calculatedCaptureItemChance.toFixed(2);
    this.sChanceWithCaptureAndTail =
      calculatedCaptureItemChanceWithTail.toFixed(2);
  }

  calculateOnCarve() {
    const probability =
      1 - Math.pow(1 - this.carvingChance / 100, this.carvingCount);
    return probability * 100;
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
    const carveData = $event.carveData;
    const captureData = $event.captureData;
    const tailcutData = $event.tailCarveData;

    if (carveData) {
      this.carvingChance = Number(carveData.chance);
    }
    if (captureData) {
      this.captureChance = Number(captureData.chance);
    }
    if (tailcutData) {
      this.tailCarveChance = Number(tailcutData.chance);
    }
    this.calculate();
  }
  //TODO: MH Game changen

  calculateCaptureChance() {
    const chance = this.captureChance / 100;
    const chanceThirdSlot = 0.69;

    // Probability of not getting the item in one slot
    const noItemInSlot = 1 - chance;

    // Probability of not getting the item in two slots
    const noItemInTwoSlots = noItemInSlot * noItemInSlot;

    // Probability of getting the item in at least one of the two slots
    const itemInTwoSlots = 1 - noItemInTwoSlots;

    // Probability of not getting the item in three slots
    const noItemInThreeSlots = noItemInSlot * noItemInSlot * noItemInSlot;

    // Probability of getting the item in at least one of the three slots
    const itemInThreeSlots = 1 - noItemInThreeSlots;

    // Overall probability
    const overallProbability =
      itemInTwoSlots * (1 - chanceThirdSlot) +
      itemInThreeSlots * chanceThirdSlot;

    return overallProbability * 100;
  }

  calculateCaptureChanceWithTailCut() {
    const chanceCapture = this.calculateCaptureChance() / 100;
    const chanceTail = this.tailCarveChance / 100;
    // Berechne die kombinierte Wahrscheinlichkeit
    const combinedChance = chanceCapture + (1 - chanceCapture) * chanceTail;

    // Konvertiere das Ergebnis zurück in Prozent
    return combinedChance * 100;
  }

  //Events

  onInputChange(value: string) {
    this.carvingChance = Number(value);
  }

  onCarveCountChange(value: string) {
    this.carvingCount = Number(value);
  }
  onTailCarveChange(value: string) {
    this.tailCarveChance = Number(value);
  }

  onCaptureChanceChange(value: string) {
    this.captureChance = Number(value);
  }
}
