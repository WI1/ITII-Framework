import { ChangeDetectionStrategy, Component, OnInit, input, output, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { ComponentDetail } from '../../data/model';
import { SensorDetailDialogComponent } from '../sensor-detail-dialog/sensor-detail-dialog.component';

@Component({
  selector: 'if-sensor-item',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    SensorDetailDialogComponent
  ],
  templateUrl: './sensor-item.component.html',
  styleUrl: './sensor-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SensorItemComponent implements OnInit {
  key = input.required<string>();
  componentDetails = input.required<ComponentDetail>();
  dayHistoryReadings = input.required<number[]>();
  weekHistoryReadings  = input.required<number[]>();

  signalParent = output<string>();

  name = signal('X');
  value = signal(0);
  thresholdValue = signal(0);
  description = signal('X');
  hasDecimals = signal(false);

  constructor(public dialog: MatDialog) {}

  ngOnInit() {
    switch (this.key()) {
      case 'battery':
        this.name.set('Batteriestatus');
        this.description.set('Aktueller');
        this.value.set(Math.round(this.componentDetails().value * 10 ) / 10);
        this.thresholdValue.set(2.5);
        this.hasDecimals.set(true);
        break;
      
      case 'co2':
        this.name.set('CO2-Status');
        this.description.set('Aktueller');
        this.value.set(this.componentDetails().value);
        this.thresholdValue.set(600);
        break;
      
      
      case 'humidity':
        this.name.set('Luftfeuchtigkeit');
        this.description.set('Aktuelle');
        this.value.set(this.componentDetails().value);
        this.thresholdValue.set(50);
        break;
      
      case 'internal_temp':
        this.name.set('Temperatur');
        this.description.set('Aktuelle');
        this.value.set(Math.round(this.componentDetails().value * 10 ) / 10);
        this.thresholdValue.set(26);
        this.hasDecimals.set(true);
        break;
      
      case 'pressure':
        this.name.set('Druck');
        this.description.set('Aktueller');
        this.value.set(this.componentDetails().value);
        this.thresholdValue.set(980);
        break;
    
      default:
        break;
    }

    this.checkState();
  }

  getArrowRotation(): string {
    const value = this.componentDetails().value;
    const minValue = 0;
    const maxValue = 100;

    const rotation = ((value - minValue) / (maxValue - minValue)) * 180;
    return `rotate(${rotation} 50 50)`;
  }

  checkState(): void {
    if(this.value >= this.thresholdValue) {
      this.signalParent.emit(this.key());
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(SensorDetailDialogComponent, {
      width: '80%',
      height: '80%',
      data: {
        name: this.name(),
        unit: this.componentDetails().unit,
        threshold: this.thresholdValue(),
        hasDecimals: this.hasDecimals(),
        dataPoints: this.dayHistoryReadings(),
        weekDataPoints: this.weekHistoryReadings()
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.thresholdValue.set(result);
      }
    });
    
  }
}
