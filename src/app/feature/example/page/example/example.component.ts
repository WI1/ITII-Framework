import {
  CUSTOM_ELEMENTS_SCHEMA,
  ChangeDetectionStrategy,
  Component,
} from '@angular/core';
import { ExampleService } from '../../data/example.service';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'if-example',
  standalone: true,
  imports: [CommonModule, RouterLink, MatCardModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './example.component.html',
  styleUrl: './example.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExampleComponent {
  constructor(public example: ExampleService) {
    this.example.getAllFilms();
  }
}
