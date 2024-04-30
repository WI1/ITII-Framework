import {
  CUSTOM_ELEMENTS_SCHEMA,
  ChangeDetectionStrategy,
  Component,
} from '@angular/core';
import { PredictiveService } from '../../data/predictive.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'if-predictive',
  standalone: true,
  imports: [CommonModule, RouterLink, MatCardModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './predictive.component.html',
  styleUrl: './predictive.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PredictiveComponent {
  constructor(public predictive: PredictiveService) {}

  // Hier werden später die Funktionen für die Predictive Seite der Anwendung stehen
}
