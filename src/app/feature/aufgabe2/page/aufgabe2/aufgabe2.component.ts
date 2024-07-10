import {
  CUSTOM_ELEMENTS_SCHEMA,
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ChangeDetectorRef,
  signal
} from '@angular/core';
import { Aufgabe2Service } from '../../data/aufgabe2.service';
import {MatGridListModule} from '@angular/material/grid-list';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { 
  DataObject, 
  Components, 
  ComponentDetail 
} from '../../data/model';
import { SensorItemComponent } from '../sensor-item/sensor-item.component';
import { AlertDialogComponent } from'../alert-dialog/alert-dialog.component';

@Component({
  selector: 'if-aufgabe2',
  standalone: true,
  imports: [
    CommonModule, 
    RouterLink, 
    AlertDialogComponent,
    SensorItemComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './aufgabe2.component.html',
  styleUrl: './aufgabe2.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Aufgabe2Component implements OnInit {
  logoUrl: string = '../../../assets/logo.png';
  alertUrl: string = '../../../assets/alert.png';

  alerts = signal<string[]>([]);

  // save all data
  sensorData: DataObject[] = [];

  // save most recent sensor reading
  components: {key: string, value: ComponentDetail}[] = [];
  
  constructor(
    public dataService: Aufgabe2Service,
    public dialog: MatDialog,
    private cdr: ChangeDetectorRef
  ) {}

  // Hier werden später die Funktionen für die History Seite der Anwendung stehen
  // do not fetch data here
  // do it in service
  // here fetch all the "components (divs) for the dashbord"
  //i.e. one list containing all the items to dispaly on the dashboard

  ngOnInit() {
    this.dataService.fetchData().subscribe(
      (response: DataObject[]) => {
        this.sensorData = response;
        const comps = response[0].components;
        this.components = this.convertComponentsToArray(comps);

        console.log('components: ', this.components);
        console.log('sensor Data: ', this.sensorData);
        
        this.cdr.markForCheck();
      },
      (error: any) => {
        console.error('Error fetching data:', error);
      }
    );
  }

  addAlert(message: string) {
    this.alerts.set([...this.alerts(), message]);
  }

  clearAlerts() {
    this.alerts.set([]);
  }

  openAlert(): void {
    const dialogRef = this.dialog.open(AlertDialogComponent, {
      width: '40%',
      height: '40%',
      data: {
        alerts: this.alerts(),
      }
    });

    dialogRef.afterClosed().subscribe(() => {
      this.clearAlerts();
    });
  }

  convertComponentsToArray(components: Components): {key: string, value: ComponentDetail}[] {
    return (Object.keys(components) as Array<keyof Components>).map(
      key => ({
        key: key,
        value: components[key]
      })
    );
  }

  get24HourHistory(key: string): number[] {
    if (this.isComponentKey(key)) {
      return this.calculateMeanValuesForComponent(key, 0);
    } 
    else {
      console.error(`Invalid component key: ${key}`);
      return [];
    }
  }

  get7DayHistory(key: string): number[] {
    if (this.isComponentKey(key)) {
      let meanValues = [];
      let index = 0;

      for(let i = 0; i < 7; i++){
        const oneDayMeans = this.calculateMeanValuesForComponent(key, index);
        let mean = 0;

        for(let j = 0; j < oneDayMeans.length; j++) {
          mean += oneDayMeans[j];
        }

        //console.log('sum: ', mean);

        // calculate mean and add to array
        mean /= oneDayMeans.length;
        meanValues.push(mean);

        //update index for original array
        index += 48;

        //console.log('length: ', oneDayMeans.length);
        //console.log('mean: ', mean);
      }

      return meanValues
    } 
    else {
      console.error(`Invalid component key: ${key}`);
      return [];
    }
  }

  private isComponentKey(key: string): key is keyof Components {
    return ['alarmstatus', 'battery', 'co2', 'humidity', 'internal_temp', 'pressure', 'ul_counter'].includes(key);
  }

  private calculateMeanValuesForComponent(componentKey: keyof Components, startIndex: number): number[] {
    const values = this.sensorData.slice(startIndex, (startIndex + 48)).map(dataObj => dataObj.components[componentKey].value);

    const meanValues = [];
    for (let i = 0; i < values.length; i += 2) {
      if (i + 1 < values.length) {
        const meanValue = (values[i] + values[i + 1]) / 2;
        meanValues.push(meanValue);
      }
    }
    return meanValues;
  }
}
