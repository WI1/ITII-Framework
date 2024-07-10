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
    trend: false,
    weather: false
};
private temperaturChart: any;
private batteryChart: any;
private humidityChart: any;
private trendChart: any;

constructor(private http: HttpClient){
  Chart.register(...registerables);
}

  ngOnInit(): void {
    this.getMethod();
    //this.generateAndProcessFakeWeatherData();
    //this.generateFakeWeatherForecast();
    this.initializeCharts();
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

        //Batteriestatus
    const battery = batteryValues[batteryValues.length -1];
        this.createBatteryChart(battery);

            //Luftfeuchtigkeit
    const humidity = humidityValues[humidityValues.length -1];
    this.createHumidityChart(humidity);

        //Trendanalyse
        const forecastData = this.generateAndProcessFakeWeatherData();
        //rausgenommen wegen 2 Values
        //this.createTrendChart(timestamps, temperatureValues, humidityValues, forecastData);
        this.createTrendChart(timestamps, temperatureValues);

         
  }

  private generateAndProcessFakeWeatherData(): { timestamps: any[], temperatureValues: any[], humidityValues: any[] } {
    const data = this.getJsonValue; // Annahme: Hier sind die simulierten Wetterdaten oder von der API erhaltenen Daten
  
    const timestamps = data.map((item: any) => new Date(item.baseStations[0]?.rxTime / 1e6).toLocaleTimeString());
    const temperatureValues = data.map((item: any) => item.components?.internal_temp?.value ?? 0);
    const humidityValues = data.map((item: any) => item.components?.humidity?.value ?? 0);
  
    return { timestamps, temperatureValues, humidityValues };
  }
  
  private generateFakeWeatherForecast(): { forecastTimestamps: string[], forecastTemperatureValues: number[], forecastHumidityValues: number[] } {
    const forecastTimestamps: string[] = [];
    const forecastTemperatureValues: number[] = [];
    const forecastHumidityValues: number[] = [];
  
    for (let i = 1; i <= 5; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      forecastTimestamps.push(date.toISOString().split('T')[0]); // Datum im Format YYYY-MM-DD
  
      const fakeTemperature = Math.floor(Math.random() * 40); // Zufällige Temperatur zwischen 0 und 40°C
      const fakeHumidity = Math.floor(Math.random() * 100); // Zufällige Luftfeuchtigkeit zwischen 0 und 100%
  
      forecastTemperatureValues.push(fakeTemperature);
      forecastHumidityValues.push(fakeHumidity);
    }
  
    return { forecastTimestamps, forecastTemperatureValues, forecastHumidityValues };
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
    if (this.temperaturChart) {
      this.temperaturChart.destroy();
    }
    this.temperaturChart = new Chart('temperatureChart', {
      type: 'doughnut',
      data: {
        datasets: [{
          data: [temperature, 40 - temperature],
          backgroundColor: ['#FF7043', '#E0E0E0'],
          hoverBackgroundColor: ['#FF7043', '#E0E0E0'],
          borderWidth: 1
        }],
        labels: ['Temperatur', '']
      },
      options: {
        responsive: true,
        circumference: Math.PI,
        rotation: -Math.PI,
        cutout: '75%',
        plugins: {
          tooltip: {
            callbacks: {
              label: function(context) {
                return context.label + ': ' + context.raw + '°C';
               }
            }
          }
        }
      }
    });
  }

  private createBatteryChart(battery: number) {
    if (this.batteryChart) {
      this.batteryChart.destroy();
    }
    this.batteryChart = new Chart('batteryChart', {
      type: 'doughnut',
      data: {
        datasets: [{
          data: [battery, 100 - battery],
          backgroundColor: ['#66BB6A', '#E0E0E0'],
          hoverBackgroundColor: ['#66BB6A', '#E0E0E0'],
          borderWidth: 1
        }],
        labels: ['Batterie', '']
      },
      options: {
        responsive: true,
        circumference: Math.PI,
        rotation: -Math.PI,
        cutout: '75%',
        plugins: {
          tooltip: {
            callbacks: {
              label: function(context) {
                return context.label + ': ' + context.raw + '%';
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
        labels: ['<30%', '30-70%', '>70%'],
        datasets: [{
          data: [humidity < 30 ? humidity : 0, humidity >= 30 && humidity <= 70 ? humidity : 0, humidity > 70 ? humidity : 0],
          backgroundColor: ['#FF7043', '#66BB6A', '#FF7043'],
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
            beginAtZero: true
          }
        },
        plugins: {
          tooltip: {
            callbacks: {
              label: function(context) {
                return `Feuchtigkeit: ${context.raw}% um ${context.label}`;
              }
            }
          }
        }
      }
    });
  }

  /**
  generateAndProcessFakeWeatherData() {
    const currentData = this.generateAndProcessFakeWeatherData();
    const forecastData = this.generateFakeWeatherForecast();
    this.createTrendChart(currentData, forecastData);
  }
     */

  private initializeCharts() {
    const currentData = this.generateAndProcessFakeWeatherData();
    const forecastData = this.generateFakeWeatherForecast();

    console.log('Current Data:', currentData); // Debugging-Ausgabe
    console.log('Forecast Data:', forecastData); // Debugging-Ausgabe

    this.createTrendChart(currentData, forecastData);
}


private createTrendChart(currentData: { timestamps: any[], temperatureValues: any[], humidityValues: any[] }, forecastData: { forecastTimestamps: string[], forecastTemperatureValues: number[], forecastHumidityValues: number[] }) {
  console.log('Initializing Trend Chart...'); // Debugging-Ausgabe

  if (this.trendChart) {
      this.trendChart.destroy();
  }
  const { timestamps, temperatureValues, humidityValues } = currentData;
  const { forecastTimestamps, forecastTemperatureValues, forecastHumidityValues } = forecastData;

  this.trendChart = new Chart('trendChart', {
      type: 'line',
      data: {
          labels: [...timestamps, ...forecastTimestamps],
          datasets: [
              {
                  label: 'Current Temperature (°C)',
                  data: [...temperatureValues, ...Array(forecastTemperatureValues.length).fill(null)],
                  backgroundColor: 'rgba(255, 112, 67, 0.5)',
                  borderColor: 'rgba(255, 112, 67, 1)',
                  borderWidth: 2,
                  fill: true
              },
              {
                  label: 'Current Humidity (%)',
                  data: [...humidityValues, ...Array(forecastHumidityValues.length).fill(null)],
                  backgroundColor: 'rgba(102, 187, 255, 0.5)',
                  borderColor: 'rgba(102, 187, 255, 1)',
                  borderWidth: 2,
                  fill: true
              },
              {
                  label: 'Forecast Temperature (°C)',
                  data: [...Array(temperatureValues.length).fill(null), ...forecastTemperatureValues],
                  backgroundColor: 'rgba(255, 112, 67, 0.2)',
                  borderColor: 'rgba(255, 112, 67, 0.7)',
                  borderDash: [5, 5],
                  borderWidth: 2,
                  fill: true
              },
              {
                  label: 'Forecast Humidity (%)',
                  data: [...Array(humidityValues.length).fill(null), ...forecastHumidityValues],
                  backgroundColor: 'rgba(102, 187, 255, 0.2)',
                  borderColor: 'rgba(102, 187, 255, 0.7)',
                  borderDash: [5, 5],
                  borderWidth: 2,
                  fill: true
              }
          ]
      },
      options: {
          responsive: true,
          plugins: {
              legend: {
                  display: true,
                  position: 'top',
              },
              tooltip: {
                  callbacks: {
                      label: function(context: any) {
                          return context.dataset.label + ': ' + context.raw;
                      }
                  }
              }
          },
          scales: {
              x: {
                  beginAtZero: true,
                  title: {
                      display: true,
                      text: 'Time'
                  }
              },
              y: {
                  beginAtZero: true,
                  title: {
                      display: true,
                      text: 'Values'
                  }
              }
          }
      }
  });

  console.log('Trend Chart Initialized'); // Debugging-Ausgabe
}

  checkExtremeWeather(temperatureValues: number[], humidityValues: number[]): boolean {
    // Beispiel: Überprüfen, ob die Temperatur über 35°C oder unter 0°C liegt
    const extremeTemperature = temperatureValues.some(temp => temp > 35 || temp < 0);
    // Beispiel: Überprüfen, ob die Luftfeuchtigkeit über 80% oder unter 20% liegt
    const extremeHumidity = humidityValues.some(humidity => humidity > 80 || humidity < 20);

    return extremeTemperature || extremeHumidity;
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

