import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { SafiComponent } from '../monster-hunter/safi/safi.component';
import { DatePipe, registerLocaleData } from '@angular/common';
import de from '@angular/common/locales/de';
import { MatIconModule } from '@angular/material/icon';
import { CarvecalcComponent } from '../monster-hunter/carvecalc/carvecalc.component';

@Component({
  selector: 'app-core',
  standalone: true,
  imports: [MatIconModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './core.component.html',
  styleUrl: './core.component.scss',
  providers: [
    {
      provide: DatePipe,
      useFactory: () => {
        registerLocaleData(de);
        return new DatePipe('de-DE');
      },
      deps: [],
    },
  ],
})
export class CoreComponent {
  constructor(private datePipe: DatePipe) {}
  date = this.datePipe.transform(new Date(), 'dd.MM.yyyy');
}
