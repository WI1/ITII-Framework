import {
  CUSTOM_ELEMENTS_SCHEMA,
  ChangeDetectionStrategy,
  Component,
} from '@angular/core';
import { Aufgabe2Service } from '../../data/aufgabe2.service';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'if-aufgabe2',
  standalone: true,
  imports: [CommonModule, RouterLink, MatCardModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './aufgabe2.component.html',
  styleUrl: './aufgabe2.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Aufgabe2Component {
  constructor(public history: Aufgabe2Service) {}

  // Hier werden später die Funktionen für die History Seite der Anwendung stehen
}
