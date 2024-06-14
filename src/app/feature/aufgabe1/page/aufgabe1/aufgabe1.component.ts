import {
  CUSTOM_ELEMENTS_SCHEMA,
  ChangeDetectionStrategy,
  Component,
} from '@angular/core';
import { Aufgabe1Service } from '../../data/aufgabe1.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'if-aufgabe1',
  standalone: true,
  imports: [CommonModule, RouterLink, MatCardModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './aufgabe1.component.html',
  styleUrl: './aufgabe1.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Aufgabe1Component {
  constructor(public aufgabe1: Aufgabe1Service) {}

  // Hier werden später die Funktionen für die Realtime Seite der Anwendung stehen
}
