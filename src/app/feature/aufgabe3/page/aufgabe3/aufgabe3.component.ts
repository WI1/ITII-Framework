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
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'if-aufgabe3',
  standalone: true,
  imports: [CommonModule, RouterLink, MatCardModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './aufgabe3.component.html',
 styleUrls: ['./aufgabe3.component.scss'],
 // styleUrls: './aufgabe3.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Aufgabe3Component implements OnInit {
  public getJsonValue: any;
  public alerts: { [key: string]: boolean } = {
    temperature: false,
    battery: false,
    humidity: false,
};
private temperaturChart: any;
private batteryChart: any;
private humidityChart: any;
private correlationChart: any;

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

    
    // Überprüfen der Qualitätskriterien und Auslösen von Alarme
    this.checkQualityCriteria(temperatureValues, humidityValues, batteryValues, alarmStatusValues);

    //Thermometer-Anzeige
    const temperature = temperatureValues[temperatureValues.length - 1];
    this.createTemperatureChart(temperature);

     // Batteriestatus
    const battery = batteryValues.slice(-5); // Die letzten fünf Batteriestatus-Werte
    this.createBatteryChart(battery);

            //Luftfeuchtigkeit
    const humidity = humidityValues[humidityValues.length -1];
    this.createHumidityChart(humidity);

      // Berechne und visualisiere Korrelationen
      this.calculateAndDisplayCorrelations(temperatureValues, humidityValues);
  }

    private checkQualityCriteria(temperatureValues: number[], humidityValues: number[], batteryValues: number[], alarmStatusValues: number[]) {
    const latestTemperature = temperatureValues[temperatureValues.length - 1];
    const latestHumidity = humidityValues[humidityValues.length - 1];
    const latestBattery = batteryValues[batteryValues.length - 1];
    const latestAlarmStatus = alarmStatusValues[alarmStatusValues.length - 1];

        // Überprüfen der Temperatur
        if (latestTemperature < 0 || latestTemperature > 40 || (latestTemperature < 15 || latestTemperature > 25)) {
          this.triggerAlarm('temperature', 'Temperature out of range');
        }
    
        // Überprüfen der Feuchtigkeit
        if (latestHumidity < 30 || latestHumidity > 70 || (latestHumidity < 40 || latestHumidity > 60)) {
          this.triggerAlarm('humidity', 'Humidity out of range');
        }
    
        // Überprüfen der Batterie
        if (latestBattery < 20) { // Beispielschwelle für niedrigen Batteriestatus
          this.triggerAlarm('battery', 'Battery low');
        }
    
        // Überprüfen des Alarmstatus
        if (latestAlarmStatus > 0) { // Annahme, dass ein Alarmstatus > 0 einen Alarm darstellt
          this.triggerAlarm('trend', 'Alarm status triggered');
        }
      }
    
      private triggerAlarm(key: string, message: string) {
        // Hier können Sie die Logik für die Benachrichtigung hinzufügen, z.B. ein Popup, eine E-Mail oder eine Push-Benachrichtigung
        this.alerts[key] = true;
        console.warn(message); // Einfacher Alert als Beispiel
      }
    
      private createTemperatureChart(temperature: number) {
        const canvas: any = document.getElementById('temperatureCanvas');
        if (canvas.getContext) {
            const ctx = canvas.getContext('2d');
            const width = canvas.width;
            const height = canvas.height;
    
            // Hintergrundfarbe
            ctx.fillStyle = 'white';
            ctx.fillRect(0, 0, width, height);
    
            // Farbverlauf erstellen
            const gradient = ctx.createLinearGradient(0, 0, width, 0);
            gradient.addColorStop(0, '#FF0000');
            gradient.addColorStop(0.33, '#FFFF00');
            gradient.addColorStop(0.66, '#00FF00');
            gradient.addColorStop(1, '#FF0000');
    
            // Farbverlauf anwenden
            ctx.fillStyle = gradient;
            ctx.fillRect(10, height / 2 - 15, width - 20, 30);
    
            // Temperaturpunkt zeichnen
            const tempPosition = (temperature / 40) * (width - 20) + 10;
            ctx.beginPath();
            ctx.arc(tempPosition, height / 2, 10, 0, 2 * Math.PI);
            ctx.fillStyle = '#000000';
            ctx.fill();
    
            // Text für die Temperaturmarkierungen hinzufügen
            ctx.fillStyle = '#000000';
            ctx.font = '16px Arial';
            ctx.fillText('0°C', 10, height / 2 + 40);
            ctx.fillText('15°C', (width - 20) * 0.375 + 10, height / 2 + 40);
            ctx.fillText('25°C', (width - 20) * 0.625 + 10, height / 2 + 40);
            ctx.fillText('40°C', width - 40, height / 2 + 40);
        }
    }

  private createBatteryChart(batteryData: number[]) {
    if (this.batteryChart) {
        this.batteryChart.destroy();
    }

    this.batteryChart = new Chart('batteryChart', {
        type: 'bar',
        data: {
//Prüfen, wie die Batterie vor 15 Tagen war, da ich in den letzten Tagen nur eine schwache Batterie erhalte
          //    labels: Array.from({ length: 15}, (_, i) => `Tag ${i + 1}`),
            labels: ['Tag 1', 'Tag 2', 'Tag 3', 'Tag 4', 'Tag 5'],
            datasets: [{
                data: batteryData,
                backgroundColor: batteryData.map(value => {
                    if (value > 60) {
                        return '#66BB6A'; // Grün für Normal
                    } else if (value > 20) {
                        return '#FFEB3B'; // Gelb für Mittel
                    } else {
                        return '#FF5252'; // Rot für Kritisch
                    }
                }),
                borderColor: '#E0E0E0',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                        stepSize: 20, //Y-Achse in 20er Schritten
                        callback: function(value) {
                            return value + '%';
                        }
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return 'Tag ' + (context.dataIndex + 1) + ': ' + context.raw + '%';
                        }
                    }
                }
            }
        }
    });
}
private createHumidityChart(humidity: number) {
  if (this.humidityChart) {
    this.humidityChart.destroy();
  }

  this.humidityChart = new Chart('humidityChart', {
    type: 'bar',
    data: {
      labels: ['< 30 %', '30 % - 70 %', '> 70 %'],
      datasets: [{
        data: [
          humidity < 30 ? humidity : 0,
          humidity >= 30 && humidity <= 70 ? humidity : 0,
          humidity > 70 ? humidity : 0
        ],
        backgroundColor: [
          humidity < 30 ? '#FF0000' : '#EEEEEE',
          humidity >= 30 && humidity <= 70 ? '#00FF00' : '#EEEEEE',
          humidity > 70 ? '#FF0000' : '#EEEEEE'
        ],
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      indexAxis: 'y',
      scales: {
        x: {
          beginAtZero: true,
          display: false
        },
        y: {
          beginAtZero: true,
          grid: {
            display: false
          }
        }
      },
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              return `${context.raw} %`;
            }
          }
        }
      }
    }
  });
}
  private calculateAndDisplayCorrelations(temperatureValues: number[], humidityValues: number[]) {
    // Berechne die Lags (Verzögerungen) für die letzten fünf Tage
    const lagDays = 5;
    const temperatureLags = Array.from({ length: lagDays }, (_, i) => temperatureValues.slice(i, temperatureValues.length - lagDays + i));
    const humidityLags = Array.from({ length: lagDays }, (_, i) => humidityValues.slice(i, humidityValues.length - lagDays + i));

    // Berechne die Korrelationen
    const correlations = temperatureLags.map((lag, i) => {
      return this.calculateCorrelation(lag, humidityValues.slice(lagDays));
    });

    // Erstelle das Korrelationen-Diagramm
    this.createCorrelationChart(correlations);
  }

  private calculateCorrelation(arr1: number[], arr2: number[]): number {
    const n = arr1.length;
    const mean1 = arr1.reduce((a, b) => a + b, 0) / n;
    const mean2 = arr2.reduce((a, b) => a + b, 0) / n;
    const numerator = arr1.reduce((sum, val, i) => sum + (val - mean1) * (arr2[i] - mean2), 0);
    const denominator = Math.sqrt(arr1.reduce((sum, val) => sum + (val - mean1) ** 2, 0) * arr2.reduce((sum, val) => sum + (val - mean2) ** 2, 0));
    return numerator / denominator;
  }

  private createCorrelationChart(correlations: number[]) {
    if (this.correlationChart) {
      this.correlationChart.destroy();
    }
    this.correlationChart = new Chart('correlationChart', {
      type: 'bar',
      data: {
        labels: ['Tag -1', 'Tag -2', 'Tag -3', 'Tag -4', 'Tag -5'],
        datasets: [{
          data: correlations,
          backgroundColor: '#66BB6A',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        scales: {
          x: {
            beginAtZero: true
          },
          y: {
            beginAtZero: true,
            max: 1,
            min: -1
          }
        },
        plugins: {
          tooltip: {
            callbacks: {
              label: function(context) {
                return `Korrelation: ${(context.raw as number).toFixed(2)}`;
              }
            }
          }
        }
      }
    });
  }

  public showDetails(type: string) {
    if (this.alerts[type]) {
      const messages: { [key: string]: string } = {
        temperature: 'Die Temperatur liegt außerhalb des zulässigen Bereichs. Überprüfen Sie die Kühlung oder Heizung.',
        battery: 'Der Batteriestand ist niedrig. Bitte ersetzen Sie die Batterie oder laden Sie das Gerät auf.',
        humidity: 'Die Luftfeuchtigkeit liegt außerhalb des zulässigen Bereichs. Überprüfen Sie die Feuchtigkeitskontrolle.',
        trend: 'Ein Alarm wurde ausgelöst. Bitte überprüfen Sie die spezifischen Alarmmeldungen für weitere Details.'
      };

      alert(messages[type]);
    }
  }
}

