import { Component } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { CatFact } from '../../util/types';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cat-facts',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cat-facts.component.html',
  styleUrl: './cat-facts.component.scss',
})
export class CatFactsComponent {
  sFact = '';
  sApiUrl = 'https://cat-fact.herokuapp.com';
  constructor(private http: HttpService) {}
  getRandomCatFact() {
    this.http
      .get<CatFact[]>(`${this.sApiUrl}/facts`)
      .subscribe((catFacts: CatFact[]) => {
        if (catFacts) {
          this.sFact =
            catFacts[Math.floor(Math.random() * catFacts.length)].text;
        }
      });
  }
}
