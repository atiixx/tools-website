import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-carvecalc',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './carvecalc.component.html',
  styleUrl: './carvecalc.component.scss',
})
export class CarvecalcComponent {
  public carvingChance: number = 0;
  public tailCarveChance: number = 0;
  public carvingCount: number = 0;
  public chanceWithKill: string = '0';
  public chanceWithKillTailCut: string = '0';

  constructor() {}

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
    this.chanceWithKill = (this.calculateOnCarve() * 100).toFixed(2);
    if (this.tailCarveChance > 0) {
      this.chanceWithKillTailCut = (
        this.calculateOnCarveWithTailCut() * 100
      ).toFixed(2);
    } else {
      this.chanceWithKillTailCut = this.chanceWithKill;
    }
  }

  calculateOnCarve() {
    return 1 - Math.pow(this.carvingChance / 100, this.carvingCount);
  }

  calculateOnCarveWithTailCut() {
    const chanceKill = Math.pow(this.carvingChance / 100, this.carvingCount);
    const chanceKillTailCut = this.tailCarveChance / 100;
    return 1 - chanceKill * chanceKillTailCut;
  }
}
