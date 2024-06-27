import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FileService } from '../services/file.service';
import { SearchComponent } from '../search/search.component';
import { CommonModule } from '@angular/common';
import { Details } from './itemdata';

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
  public otherTypes: Details[] = [];
  public sChanceWithKill: string = '0';
  public sChanceWithKillTailCut: string = '0';
  public sChanceWithCapture: string = '0';
  public sChanceWithCaptureAndTail: string = '0';
  public aOtherTypes: Details[] = [];

  public game: string = 'mh4u';

  constructor(private fileService: FileService) {}

  calculate(otherTypes?: Details[]) {
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
      calculatedCaptureTailCutChance,
      otherTypes
    );
  }

  updateTemplateStrings(
    calculatedKillChance: number,
    calculatedKillTailCutChance: number,
    calculatedCaptureItemChance: number,
    calculatedCaptureItemChanceWithTail: number,
    otherTypes?: Details[]
  ) {
    this.sChanceWithKill = calculatedKillChance.toFixed(2);
    this.sChanceWithKillTailCut = calculatedKillTailCutChance.toFixed(2);
    this.sChanceWithCapture = calculatedCaptureItemChance.toFixed(2);
    this.sChanceWithCaptureAndTail =
      calculatedCaptureItemChanceWithTail.toFixed(2);

    this.aOtherTypes = otherTypes ? otherTypes : [];
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
    const additionalData = $event.additionalData;
    let otherTypes: Details[] = [];

    if (carveData) {
      this.carvingChance = Number(carveData.chance);
    } else {
      this.carvingChance = 0;
    }
    if (captureData) {
      this.captureChance = Number(captureData.chance);
    } else {
      this.captureChance = 0;
    }
    if (tailcutData) {
      this.tailCarveChance = Number(tailcutData.chance);
    } else {
      this.tailCarveChance = 0;
    }

    if (additionalData) {
      for (let t in additionalData) {
        otherTypes.push(additionalData[t].type);
      }
    }

    this.calculate(otherTypes);
  }

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

  resetView() {
    this.carvingChance = 0;
    this.tailCarveChance = 0;
    this.captureChance = 0;
    this.carvingCount = 3;
    this.otherTypes = [];
    this.sChanceWithKill = '0';
    this.sChanceWithKillTailCut = '0';
    this.sChanceWithCapture = '0';
    this.sChanceWithCaptureAndTail = '0';
    this.aOtherTypes = [];
  }

  //Events

  public onGameChange($event: any) {
    this.game = $event;
    this.resetView();
  }

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
