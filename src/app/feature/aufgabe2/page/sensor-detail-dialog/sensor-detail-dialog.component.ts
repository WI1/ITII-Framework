import { ChangeDetectionStrategy, Component, Inject, OnInit, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { BaseChartDirective } from 'ng2-charts';
import { ChartOptions, ChartType, ChartData, ChartConfiguration } from 'chart.js';

@Component({
  selector: 'if-sensor-detail-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    BaseChartDirective,
  ],
  templateUrl: './sensor-detail-dialog.component.html',
  styleUrl: './sensor-detail-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SensorDetailDialogComponent implements OnInit {
  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: [],
    datasets: []
  };
  public lineChartOptions: ChartOptions = {
    responsive: true,
  };

  signalValueChange = output<number>();

  public threshold = 0;
  public mean: number = 0;
  public smallestValue = 0;
  public highestValue = 0;
  public unit: string = '';
  public selectedTimePeriod: string = 'day';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    @Inject(MatDialogRef<SensorDetailDialogComponent>) public dialogRef: MatDialogRef<SensorDetailDialogComponent>
  ) {}

  ngOnInit(): void {
    this.threshold = this.data.threshold;
    this.unit = this.data.unit;
    this.initializeChart();
  }

  initializeChart(): void {
    this.updateChart();
  }

  updateChart(): void {
    const labels = this.data.dataPoints.map((_: number, index: number) => (index + 1).toString());
    let chartData = this.data.dataPoints;

    if (this.selectedTimePeriod === 'week') {
      chartData = this.data.weekDataPoints; 
    }

    this.lineChartData = {
      labels: labels,
      datasets: [{
        data: chartData,
        label: `Messwerte der letzten ${this.selectedTimePeriod === 'day' ? '24 Stunden' : 'Woche'}`,
        fill: true,
        tension: 0.5,
        borderColor: 'black',
        backgroundColor: 'rgba(255,0,0,0.3)'
      }]
    };

    this.computeDataPointMetrics();
  }


  computeDataPointMetrics(): void {
    let list = [];
    let length = 0;

    if (this.selectedTimePeriod === 'week') {
      list = this.data.weekDataPoints;
      length = this.data.weekDataPoints.length;
    }
    else {
      list = this.data.dataPoints;
      length = this.data.dataPoints.length;
    }
    
    this.smallestValue = this.data.dataPoints[0];
    let sum = 0;

    for(let i = 0; i < length; i++) {
      sum += this.data.dataPoints[i];

      if(this.data.dataPoints[i] > this.highestValue) {
        this.highestValue = this.data.dataPoints[i];
      }

      if(this.data.dataPoints[i] < this.smallestValue) {
        this.smallestValue = this.data.dataPoints[i];
      }
    }

    this.mean = sum / length;

    if(this.data.hasDecimals === true) {
      this.mean = Math.round(this.mean * 100) / 100;
      this.smallestValue = Math.round(this.smallestValue * 100) / 100;
      this.highestValue = Math.round(this.highestValue * 100) / 100;
    }
  }

  changeThresholdValue(value: string): void {
    this.threshold = Number(value);
  }

  closeDialog() {
    this.dialogRef.close(this.threshold);
  }
}
