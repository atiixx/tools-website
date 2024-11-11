import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CoreComponent } from './core/core.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CoreComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'tools-website';
}
