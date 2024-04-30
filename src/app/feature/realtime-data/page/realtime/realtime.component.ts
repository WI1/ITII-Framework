import {
  CUSTOM_ELEMENTS_SCHEMA,
  ChangeDetectionStrategy,
  Component,
} from '@angular/core';
import { RealtimeService } from '../../data/realtime.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'if-realtime',
  standalone: true,
  imports: [CommonModule, RouterLink, MatCardModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './realtime.component.html',
  styleUrl: './realtime.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RealtimeComponent {
  constructor(public realtime: RealtimeService) {}

  // Hier werden später die Funktionen für die Realtime Seite der Anwendung stehen
}
