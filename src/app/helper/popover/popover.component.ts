import { Component, Input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-popover',
  standalone: true,
  imports: [MatIcon],
  templateUrl: './popover.component.html',
  styleUrl: './popover.component.scss',
})
export class PopoverComponent {
  @Input() buttonText: string = '';
  isActive = false;

  toggle() {
    this.isActive = !this.isActive;
  }
}
