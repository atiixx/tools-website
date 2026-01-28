import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from "@angular/material/icon";

@Component({
  selector: 'app-champ-listitem',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './champ-listitem.component.html',
  styleUrl: './champ-listitem.component.scss'
})
export class ChampListitemComponent {
  @Input() champname: string = "";
  @Input() selected: boolean = false;
  @Input() checked: boolean = false;

  @Output() check_clicked = new EventEmitter<void>();
  @Output() selectionbutton_clicked = new EventEmitter<void>();


  check_champ() {
    this.check_clicked.emit();
  }

  select_champ() {
    this.selectionbutton_clicked.emit()
  }
}
