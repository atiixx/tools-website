import { Component } from '@angular/core';
import { SafiComponent } from './safi/safi.component';
import { CarvecalcComponent } from './carvecalc/carvecalc.component';

@Component({
  selector: 'app-monster-hunter',
  standalone: true,
  imports: [SafiComponent, CarvecalcComponent],
  templateUrl: './monster-hunter.component.html',
  styleUrl: './monster-hunter.component.scss',
})
export class MonsterHunterComponent {}
