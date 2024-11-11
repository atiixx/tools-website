import { Component } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { ChuckNorrisJoke } from '../../util/types';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chuck-norris-jokes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chuck-norris-jokes.component.html',
  styleUrl: './chuck-norris-jokes.component.scss',
})
export class ChuckNorrisJokesComponent {
  sJoke = '';
  sApiUrl = 'https://api.chucknorris.io';
  constructor(private http: HttpService) {}
  getRandomChuckNorrisJoke() {
    this.http
      .get<ChuckNorrisJoke>(`${this.sApiUrl}/jokes/random`)
      .subscribe((joke: ChuckNorrisJoke) => {
        if (joke) {
          this.sJoke = joke.value;
        }
      });
  }
}
