import { ChangeDetectionStrategy, Component, Inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'if-alert-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule
  ],
  templateUrl: './alert-dialog.component.html',
  styleUrl: './alert-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlertDialogComponent {
  message = 'liegt über dem eingestellten Schwellenwert';

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  processAlert(alert: string): string {
    switch (alert) {
      case 'battery':
        return 'Batterie';
      
      case 'co2':
        return 'CO2';      
      
      case 'humidity':
        return 'Luftfeuchtigkeit';
      
      case 'internal_temp':
        return 'Temperatur';
      
      case 'pressure':
        return 'Druck';
    
      default:
        return alert;
    }
  }
}
