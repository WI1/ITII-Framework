import { CUSTOM_ELEMENTS_SCHEMA, ChangeDetectionStrategy, Component, OnInit, HostListener, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'if-aufgabe5',
  standalone: true,
  imports: [CommonModule, RouterLink, MatCardModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './aufgabe5.component.html',
  styleUrls: ['./aufgabe5.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Aufgabe5Component implements OnInit {
  @ViewChild('productionChart', { static: true }) productionChart!: ElementRef;
  @ViewChild('errorChart', { static: true }) errorChart!: ElementRef;
  @ViewChild('alarmMessageContainer', { static: false }) alarmMessageContainer!: ElementRef;
  
  auftragsliste: { 
    auftragsnummer: number, 
    kundenname: string, 
    stueckzahlA: number, 
    stueckzahlB: number, 
    stueckzahlC: number,
    status: string 
  }[] = [
    { auftragsnummer: 1, kundenname: 'Audi AG', stueckzahlA: 100, stueckzahlB: 150, stueckzahlC: 120, status: 'Abgeschlossen' },
    { auftragsnummer: 2, kundenname: 'BMW', stueckzahlA: 80, stueckzahlB: 100, stueckzahlC: 90, status: 'In Bearbeitung' },
    { auftragsnummer: 3, kundenname: 'VW AG', stueckzahlA: 120, stueckzahlB: 130, stueckzahlC: 110, status: 'Offen' },
    { auftragsnummer: 4, kundenname: 'Mercedes-Benz', stueckzahlA: 90, stueckzahlB: 110, stueckzahlC: 100, status: 'Offen' }
  ];

  statuses: { id: string, alarm: boolean, name: string }[] = [
    { id: 'item2-1', alarm: false, name: 'Lager 1' },
    { id: 'item2-2', alarm: false, name: 'Lager 2' },
    { id: 'item2-3', alarm: false, name: 'Logistik' },
    { id: 'item2-4', alarm: false, name: 'Schweißerei' },
  ];

  contacts: { [key: string]: string } = {
    'Lager 1': 'Frau Sandra Tillmanns',
    'Lager 2': 'Herr Lukas Schneider',
    'Logistik': 'Frau Anna Maier',
    'Schweißerei': 'Herr Emir Yilmaz',
  };

  alarmMessage: string = '';

  errorData: { bereich1: number[], bereich2: number[], bereich3: number[], bereich4: number[] } = {
    bereich1: [5, 7, 6, 8, 5],
    bereich2: [4, 3, 5, 7, 4],
    bereich3: [6, 5, 4, 3, 7],
    bereich4: [3, 4, 5, 6, 2]
  };

  ngOnInit(): void {
    this.updateStatuses();
    this.createProductionChart();
    this.createErrorChart();
  }

  updateStatuses(): void {
    this.statuses.forEach(status => {
      const element = document.getElementById(status.id);
      if (element) {
        const correspondingItem1 = document.querySelector(`.container1 .item1:nth-child(${status.id.split('-')[1]})`);
        if (status.alarm) {
          element.innerHTML = 'Fehlermeldung';
          element.style.color = 'white';
          element.style.backgroundColor = '#EF0137';
          if (correspondingItem1) {
            correspondingItem1.classList.add('alarm');
            correspondingItem1.classList.remove('no-alarm');
          }
        } else {
          element.innerHTML = 'Keine Fehlermeldung';
          element.style.color = 'white';
          element.style.backgroundColor = '#14CE5E';
          if (correspondingItem1) {
            correspondingItem1.classList.add('no-alarm');
            correspondingItem1.classList.remove('alarm');
          }
        }
      }
    });

    const alarmedAreas = this.statuses.filter(status => status.alarm).map(status => status.name);
    if (alarmedAreas.length >= 2) {
      this.alarmMessage = `In den Bereichen ${alarmedAreas.join(' und ')} sind Fehler aufgetreten.`;
      this.showPopup(alarmedAreas);
    }
  }

  toggleAlarm(id: string): void {
    const status = this.statuses.find(s => s.id === id);
    if (status) {
      status.alarm = !status.alarm;
      this.updateStatuses();
      this.updateErrorData(status.name, status.alarm);
    }
  }

  showPopup(alarmedAreas: string[]): void {
    const modal = document.getElementById('myModal');
    if (modal) {
      modal.style.display = 'block';

      // Clear previous messages
      this.alarmMessageContainer.nativeElement.innerHTML = '';

      // Create and append first message paragraph
      const messageParagraph1 = document.createElement('p');
      messageParagraph1.textContent = `In den Bereichen ${alarmedAreas.join(' und ')} sind Fehler aufgetreten.`;
      this.alarmMessageContainer.nativeElement.appendChild(messageParagraph1);

      // Create and append second message paragraphs
      alarmedAreas.forEach(area => {
        const messageParagraph2 = document.createElement('p');
        messageParagraph2.textContent = `Bitte wenden Sie sich für den Bereich ${area} an ${this.contacts[area]}.`;
        this.alarmMessageContainer.nativeElement.appendChild(messageParagraph2);
      });

      // Event Listener für ESC-Taste hinzufügen
      document.addEventListener('keydown', this.onKeyDown);
    }
  }

  hidePopup(): void {
    const modal = document.getElementById('myModal');
    if (modal) {
      modal.style.display = 'none';

      // Event Listener für ESC-Taste entfernen
      document.removeEventListener('keydown', this.onKeyDown);
    }
  }

  // Methode für ESC-Taste Event
  @HostListener('document:keydown.escape', ['$event'])
  private onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      this.hidePopup();
    }
  }

  createProductionChart(): void {
    const ctx = this.productionChart.nativeElement.getContext('2d');

    new Chart(ctx, {
      type: 'line',
      data: {
        labels: [
          'Januar', 'Februar', 'März', 'April', 'Mai', 'Juni',
          'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'
        ],
        datasets: [
          {
            label: 'Variante 1',
            data: [10150, 10130, 10100, 10040, 10080, 10120, ], //10120, 10100, 10050, 10070, 10090, 10110
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 0.8)',
            borderWidth: 3,
            fill: false
          },
          {
            label: 'Variante 2',
            data: [10120, 10130, 10120, 10100, 10110, 10120, ], //10020, 10000, 9950, 9970, 9990, 10010
            backgroundColor: 'rgba(255, 159, 64, 0.2)',
            borderColor: 'rgba(255, 159, 64, 0.8)',
            borderWidth: 3,
            fill: false
          },
          {
            label: 'Variante 3',
            data: [10100, 10130, 10080, 10070, 10130, 10140], //10160, 10220, 10200, 10150, 10170, 10190, 10210
            backgroundColor: 'rgba(255, 0, 255, 0.2)',
            borderColor: 'rgba(255, 0, 255, 0.8)',
            borderWidth: 3,
            fill: false
          },
          {
            label: 'Soll Menge',
            data: [10200, 10150, 10170, 10180, 10150, 10170, 10160, 10000, 10000, 10000, 10000, 10000],
            backgroundColor: 'rgba(153, 102, 255, 0.2)',
            borderColor: 'rgba(153, 102, 255, 0.8)',
            borderWidth: 3,
            fill: false
          }
        ]
      },
      options: {
        scales: {
          x: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Monate',
              font: {
                size: 16,
                weight: 'bold'
              }
            }
          },
          y: {
            beginAtZero: true,
            min: 9500,
            max: 10500,
            title: {
              display: true,
              text: 'Stückzahl',
              font: {
                size: 16,
                weight: 'bold'
              }
            }
          }
        },
        plugins: {
          legend: {
            labels: {
              color: 'black',
              font: {
                size: 14
              }
            }
          }
        }
      }
    });
  }

  createErrorChart(): void {
    const ctx = this.errorChart.nativeElement.getContext('2d');

    const errorChart = Chart.getChart(ctx);
    if (!errorChart) {
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: this.generateLast5DaysLabels(),
          datasets: [
            {
              label: 'Lager 1',
              data: this.errorData.bereich1,
              backgroundColor: 'rgba(238, 83, 80, 0.5)',
              borderColor: 'rgba(238, 83, 80, 0.5)',
              borderWidth: 1
            },
            {
              label: 'Lager 2',
              data: this.errorData.bereich2,
              backgroundColor: 'rgba(233, 30, 99, 0.5)',
              borderColor: 'rgba(233, 30, 99, 0.5)',
              borderWidth: 1
            },
            {
              label: 'Logistik',
              data: this.errorData.bereich3,
              backgroundColor: 'rgba(156, 39, 176, 0.5)',
              borderColor: 'rgba(156, 39, 176, 0.5)',
              borderWidth: 1
            },
            {
              label: 'Schweißerei',
              data: this.errorData.bereich4,
              backgroundColor: 'rgba(103, 58, 183, 0.5)',
              borderColor: 'rgba(103, 58, 183, 0.5)',
              borderWidth: 1
            }
          ]
        },
        options: {
          scales: {
            x: {
              title: {
                display: true,
                text: 'Tage',
                font: {
                  size: 16,
                  weight: 'bold'
                }
              }
            },
            y: {
              beginAtZero: true,
              min: 0,
              max: 10,
              title: {
                display: true,
                text: 'Fehleranzahl',
                font: {
                  size: 16,
                  weight: 'bold'
                }
              }
            }
          },
          plugins: {
            legend: {
              labels: {
                color: 'black',
                font: {
                  size: 14
                }
              }
            }
          }
        }
      });
    } else {
      this.updateErrorChart();
    }
  }

  updateErrorData(area: string, alarm: boolean): void {
    const today = new Date();
    const dateStr = today.toLocaleDateString('de-DE', { month: 'short', day: 'numeric' });
    const labels = this.generateLast5DaysLabels();
    const index = labels.indexOf(dateStr);

    if (index !== -1) {
      switch (area) {
        case 'Lager 1':
          this.errorData.bereich1[index] += alarm ? 1 : 0;
          break;
        case 'Lager 2':
          this.errorData.bereich2[index] += alarm ? 1 : 0;
          break;
        case 'Logistik':
          this.errorData.bereich3[index] += alarm ? 1 : 0;
          break;
        case 'Schweißerei':
          this.errorData.bereich4[index] += alarm ? 1 : 0;
          break;
      }
      this.updateErrorChart();
    }
  }

  updateErrorChart(): void {
    const ctx = this.errorChart.nativeElement.getContext('2d');

    const errorChart = Chart.getChart(ctx);
    if (errorChart) {
      errorChart.data.labels = this.generateLast5DaysLabels();
      errorChart.data.datasets[0].data = this.errorData.bereich1;
      errorChart.data.datasets[1].data = this.errorData.bereich2;
      errorChart.data.datasets[2].data = this.errorData.bereich3;
      errorChart.data.datasets[3].data = this.errorData.bereich4;
      errorChart.update();
    }
  }

  generateLast5DaysLabels(): string[] {
    const labels: string[] = [];
    const today = new Date();
    for (let i = 4; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      labels.push(date.toLocaleDateString('de-DE', { month: 'short', day: 'numeric' }));
    }
    return labels;
  }
}

