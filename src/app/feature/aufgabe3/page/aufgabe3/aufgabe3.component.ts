import {
  CUSTOM_ELEMENTS_SCHEMA,
  ChangeDetectionStrategy,
  Component,
} from '@angular/core';
import { Aufgabe3Service } from '../../data/aufgabe3.service';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'if-aufgabe3',
  standalone: true,
  imports: [CommonModule, RouterLink, MatCardModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './aufgabe3.component.html',
  styleUrl: './aufgabe3.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Aufgabe3Component {
  constructor(public history: Aufgabe3Service) {}

  // Hier werden später die Funktionen für die History Seite der Anwendung stehen
}
