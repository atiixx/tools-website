import { Component } from '@angular/core';
import { AgeGuessingComponent } from './age-guessing/age-guessing.component';
import { CatFactsComponent } from './cat-facts/cat-facts.component';
import { ChuckNorrisJokesComponent } from './chuck-norris-jokes/chuck-norris-jokes.component';

@Component({
  selector: 'app-api-stuff',
  standalone: true,
  imports: [AgeGuessingComponent, CatFactsComponent, ChuckNorrisJokesComponent],
  templateUrl: './api-stuff.component.html',
  styleUrl: './api-stuff.component.scss',
})
export class ApiStuffComponent {}
