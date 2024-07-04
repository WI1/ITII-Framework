import {
  CUSTOM_ELEMENTS_SCHEMA,
  ChangeDetectionStrategy,
  Component,
  OnInit,
  importProvidersFrom,
  NgModule
} from '@angular/core';
import { Aufgabe3Service } from '../../data/aufgabe3.service';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';
//für die Charts
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'if-aufgabe3',
  standalone: true,
  imports: [CommonModule, RouterLink, MatCardModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './aufgabe3.component.html',
  //styleUrls? -> styleUrls: ['./aufgabe3.component.scss'], 
  styleUrl: './aufgabe3.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
//M: implements OnInit habe ich hinzugefügt
export class Aufgabe3Component implements OnInit {
 //M: hab ich ausgeklammert, war bereits gestanden
 // constructor(public history: Aufgabe3Service) {}

  // Hier werden später die Funktionen für die History Seite der Anwendung stehen
//sensorData:  any;

public getJsonValue: any;
public postJsonValue: any;
private chart: any;

constructor(private http: HttpClient){
  Chart.register(...registerables);
}

  ngOnInit(): void {
    this.getMethod();
  }

  public getMethod() {
    const apiKey = 'it2sose2024!';
    const topic = 'mioty/70-b3-d5-67-70-0e-ff-03/fc-a8-4a-03-00-00-0e-67/uplink';
    const params = new HttpParams().set('key', apiKey).set('topic', topic);
    const url = 'https://it2.ecosystem-tools.de/php/get-data';
    
    console.log('Sende GET-Anfrage an:', url);
    console.log('Mit Parametern:', params.toString());

    this.http.get(url, { params }).subscribe((data) => {
      console.log('Erhaltene Daten:', data);
      this.getJsonValue = data;
      this.updateChartData(data);
    },
  (error) => {
    console.error('Fehler bei der GET-Anfrage', error);
  }
  );
  }

  private updateChartData(data: any){
    const timestamps = data.map((item: any) => new Date(item.baseStations[0]?.rxTime / 1e6).toLocaleTimeString());
    const temperatureValues = data.map((item: any) => item.components?.internal_temp?.value ?? 0);
    const pressureValues = data.map((item: any) => item.components?.pressure?.value ?? 0);
    const co2Values = data.map((item: any) => item.components?.co2?.value ?? 0);
    const humidityValues = data.map((item: any) => item.components?.humidity?.value ?? 0);
    const batteryValues = data.map((item: any) => item.components?.battery?.value ?? 0);
    const alarmStatusValues = data.map((item: any) => item.components?.alarm?.value ?? 0);

    const tempQualityCriteria = temperatureValues.map((temp: number) => temp >= 10 && temp <= 30 ? 1 : 0);
    const humidityQualityCriteria = humidityValues.map((humidity: number) => humidity >= 40 && humidity <= 60 ? 1 : 0);

    if (this.chart) {
      this.chart.destroy();
    }

    this.chart = new Chart('myChart', {
      type: 'line',
      data: {
        labels: timestamps,
        datasets: [
          {
            data: temperatureValues,
            label: 'Temperatur (°C)',
            borderColor: '#FF7043',
            fill: false
          },
          {
            data: pressureValues,
            label: 'Luftdruck (Pa)',
            borderColor: '#42A5F5',
            fill: false
          },
          {
            data: co2Values,
            label: 'CO2 (ppm)',
            borderColor: '#66BB6A',
            fill: false
          },
          {
            data: humidityValues,
            label: 'Feuchtigkeit (%)',
            borderColor: '#FFA726',
            fill: false
          },
          {
            data: batteryValues,
            label: 'Batterie (V)',
            borderColor: '#8E24AA',
            fill: false
          },
          {
            data: alarmStatusValues,
            label: 'Alarmstatus',
            borderColor: '#D32F2F',
            fill: false
          },
          {
            data: tempQualityCriteria,
            label: 'Temp Qualität',
            borderColor: '#FF0000',
            fill: false,
            borderDash: [10, 5]
          },
          {
            data: humidityQualityCriteria,
            label: 'Feuchtigkeit Qualität',
            borderColor: '#00FF00',
            fill: false,
            borderDash: [10, 5]
          }
        ]
      },
      options: {
        responsive: true,
        scales: {
          x: {
            type: 'category',
          }
        }
      }
    });
  }
}
/**
  loadSensorData(): void {
    const topics: { [key: string]: string} = {
      temperatur: 'mioty/70-b3-d5-67-70-0e-ff-03/fc-a8-4a-03-00-00-0e-67/uplink',
      druck: 'mioty/70-b3-d5-67-70-0e-ff-03/fc-a8-4a-01-00-00-10-ff/uplink',
      co2: 'mioty/70-b3-d5-67-70-0e-ff-03/fc-a8-4a-03-00-00-0e-66/uplink',
      feuchtigkeit: 'mioty/70-b3-d5-67-70-0e-ff-03/fc-a8-4a-03-00-00-0e-81/uplink'
    };

    for(const key in topics) {
      if (Object.prototype.hasOwnProperty.call(topics, key)) {
        this.aufgabe3Service.getSensorData(topics[key]).subscribe(data => {
          console.log('Data for ${key}:', data );
          this.sensorData[key] = data;
        }, error => {
          console.error('Error fetching data for ${key}:', console.error);
        });
      }
    }
  } 
}

//Dashboard Komponente
@Component({
  selector: 'app-dashboard',
  template: `
  <div class="dashboard">
    <div class="widget sensor-card">
      <h2>Aktuelle Prüfungen</h2>
      <p>Anzahl der derzeit durchführten Qualitätsüberprüfungen: 5</p>
    </div>
    <div class="widget sensor-card">
      <h2>Ergebnisse</h2>
      <p>Bestanden: 10, Nicht-bestanden: 2</p>
    </div>
    <div class="widget sensor-card">
      <h2>Warnungen</h2>
      <p>Es gibt 3 potenzielle Probleme oder Qualitätabweichungen</p>
    </div>
    <div class="widget sensor-card">
      <h2>Statistiken</h2>
      <!-- hier Diagramme und Grafiken hinzufügen -->
      <p>Diagramme und Grafiken zur Visualisierung der Qaulitätskennzahlen</p>
    </div>
  </div>
`,
  styleUrls: ['./aufgabe3.component.scss']
})
export class DashboardComponent{}

//Qualitätsprüfungen-Komponente
@Component({
  selector: 'app-quality-checks',
  template: `
    <div class="quality-checks">
      <h2>Qualitätprüfungen</h2>
      <ul>
        <li *ngFor="let item of qualityCheckList">
          <h3>{{ item.warenBeschreibung }}</h3>
          <p>ID: {{ item.warenID}}</p>
          <p>Status: {{ item.status }}</p>
          <p>Pruefergebnisse: {{ item.pruefergebnisse }}</p>
        </li>
      </ul>
    </div>
  `,
  styleUrls: ['./aufgabe3.component.scss']
})
export class QualityChecksComponent implements OnInit {
  qualityCheckList = [
    { warenId: '001', warenBeschreibung: 'Produkt A', status: 'In Bearbeitung', prüfergebnisse: 'Bestanden' },
    { warenId: '002', warenBeschreibung: 'Produkt B', status: 'Abgeschlossen', prüfergebnisse: 'Nicht-bestanden' }
  ];

  constructor() {}

  ngOnInit(): void {}
}

// Warenverzeichnis-Komponente
@Component({
  selector: 'app-product-list',
  template: `
    <div class="product-list">
      <h2>Warenverzeichnis</h2>
      <!-- Warenliste und Such- und Filterfunktionen hier -->
    </div>
  `,
  styleUrls: ['./aufgabe3.component.scss']
})
export class ProductListComponent {}

// Berichte-Komponente
@Component({
  selector: 'app-reports',
  template: `
    <div class="reports">
      <h2>Berichte</h2>
      <!-- Berichtserstellung und Anzeige hier -->
    </div>
  `,
  styleUrls: ['./aufgabe3.component.scss']
})
export class ReportsComponent {}

// Einstellungen-Komponente
@Component({
  selector: 'app-settings',
  template: `
    <div class="settings">
      <h2>Einstellungen</h2>
      <!-- Einstellungen für Qualitätskriterien, Toleranzgrenzen und Benachrichtigungen hier -->
    </div>
  `,
  styleUrls: ['./aufgabe3.component.scss']
})
export class SettingsComponent {}

// Benutzerverwaltung-Komponente
@Component({
  selector: 'app-user-management',
  template: `
    <div class="user-management">
      <h2>Benutzerverwaltung</h2>
      <!-- Benutzerliste, Rollen und Berechtigungen hier -->
    </div>
  `,
  styleUrls: ['./aufgabe3.component.scss']
})
   */
//export class UserManagementComponent {}
