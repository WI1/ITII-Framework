import {
  CUSTOM_ELEMENTS_SCHEMA,
  ChangeDetectionStrategy,
  Component,
} from '@angular/core';
import { HistoryService } from '../../data/history.service';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'if-history',
  standalone: true,
  imports: [CommonModule, RouterLink, MatCardModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './history.component.html',
  styleUrl: './history.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HistoryComponent {
  constructor(public history: HistoryService) {}

  // Hier werden später die Funktionen für die History Seite der Anwendung stehen
}
