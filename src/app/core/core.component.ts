import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SafiComponent } from '../safi/safi.component';

@Component({
  selector: 'app-core',
  standalone: true,
  imports: [RouterOutlet, SafiComponent],
  templateUrl: './core.component.html',
  styleUrl: './core.component.scss',
})
export class CoreComponent {}
