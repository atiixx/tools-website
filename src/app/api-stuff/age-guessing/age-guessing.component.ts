import { Component } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { AgeData } from '../../util/types';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-age-guessing',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './age-guessing.component.html',
  styleUrl: './age-guessing.component.scss',
})
export class AgeGuessingComponent {
  sName = '';
  Age: number = 0;
  sApiUrl = 'https://api.agify.io';

  constructor(private http: HttpService, private snackBar: MatSnackBar) {}
  sendNameRequest() {
    if (this.sName) {
      this.http
        .get<AgeData>(`${this.sApiUrl}?name=${this.sName}`)
        .subscribe((response: AgeData) => {
          if (response && response.age) {
            this.Age = response.age;
          } else {
            this.snackBar.open('Name not found.', 'Close', {
              duration: 2000, // Duration in milliseconds
              horizontalPosition: 'center', // Position on screen
              verticalPosition: 'bottom', // Position on screen
            });
          }
        });
    }
  }
}
