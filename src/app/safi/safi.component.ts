import { CommonModule, DatePipe, registerLocaleData } from '@angular/common';
import { Component } from '@angular/core';
import de from '@angular/common/locales/de';
@Component({
  selector: 'app-safi',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './safi.component.html',
  styleUrl: './safi.component.scss',
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
export class SafiComponent {
  constructor(private datePipe: DatePipe) {}
  beginLastSafiEventInWiki = new Date(2023, 0, 13); // January 13, 2023
  endLastSafiEventInWiki = new Date(2023, 0, 26); // January 26, 2023
  endOfEventBefore = new Date(2022, 11, 29); // December 29, 2022
  currentDate = new Date();
  eventStart = new Date();

  eventDays =
    this.endLastSafiEventInWiki.getTime() -
    this.beginLastSafiEventInWiki.getTime();
  daysBetweenEvents =
    this.beginLastSafiEventInWiki.getTime() - this.endOfEventBefore.getTime();

  isSafiEventRunning() {
    let iteratorDate: Date = this.endLastSafiEventInWiki!;
    while (iteratorDate < this.currentDate) {
      iteratorDate = new Date(
        iteratorDate.getTime() + this.daysBetweenEvents + this.eventDays
      );
    }

    this.eventStart = new Date(iteratorDate.getTime() - this.eventDays);
    console.log('Is Safii event running?');
    if (this.currentDate > this.eventStart) {
      return true;
    } else {
      return false;
    }
  }
  eventCurrentlyGoing = this.isSafiEventRunning();
  nextEventUnformatted = new Date(
    this.eventStart.getTime() + 24 * 60 * 60 * 1000
  ); // Add 1 day in milliseconds
  nextEvent = this.datePipe.transform(
    this.nextEventUnformatted,
    'EEE, dd MMM yyyy'
  );
  eventEnd = this.datePipe.transform(
    this.eventStart.getTime() + this.eventDays,
    'EEE, dd MMM yyyy'
  );
  sEventGoing = this.eventCurrentlyGoing ? 'Ja' : 'Nein';
}
