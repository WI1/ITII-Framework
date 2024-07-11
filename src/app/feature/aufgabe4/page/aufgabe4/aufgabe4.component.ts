import { CUSTOM_ELEMENTS_SCHEMA, ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Aufgabe4Service } from '../../data/aufgabe4.service';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';

interface Tile {
  title: string;
  content: string;
  expanded: boolean;
  minValue?: number;
  maxValue?: number;
  warning?: string;
  description?: string;
  imageUrl?: string;
}

@Component({
  selector: 'if-aufgabe4',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatCardModule,
    MatGridListModule,
    FontAwesomeModule // Hinzufügen des FontAwesomeModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './aufgabe4.component.html',
  styleUrls: ['./aufgabe4.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Aufgabe4Component implements OnInit {
  tiles: Tile[] = [
    {
      title: 'Temperatur',
      content: 'Alle wichtigen Informationen finden sie hier.. ',
      expanded: false,
      description: 'Die Arbeitsstättenverordnung (ArbStättV) und ASR A3.5 regeln die Temperatur und Luftfeuchtigkeit in Arbeitsräumen. Diesen Vorgaben zufolge sollen zusätzliche Maßnahmen ergriffen werden, wenn die Raumtemperatur über 26 °C steigt, besonders bei schwerer körperlicher Arbeit, um Gesundheitsgefahren zu vermeiden.',
      imageUrl: 'https://cdn.pixabay.com/photo/2017/01/31/20/11/gear-2024496_960_720.png'
    },
    {
      title: 'CO2',
      content: 'Alle wichtigen Informationen finden sie hier.. ',
      expanded: false,
      description: 'Laut TRGS 900 liegt der Arbeitsplatzgrenzwert (AGW) für Kohlendioxid (CO2) bei 5000 ppm. Dieser Wert gibt die durchschnittliche Konzentration an, die über einen 8-Stunden-Arbeitstag und 40 Stunden pro Woche eingehalten werden kann, ohne gesundheitliche Beeinträchtigungen zu verursachen.',
      imageUrl: '🛟'
    },
    {
      title: 'Luftfeuchtigkeit',
      content: 'Alle wichtigen Informationen finden sie hier.. ',
      expanded: false,
      description: 'Laut ASR A3.5 sollte die relative Luftfeuchtigkeit in Arbeitsräumen zwischen 40 % und 60 % liegen, da dies als optimal für das Wohlbefinden und die Gesundheit der Beschäftigten gilt.',
      imageUrl: 'https://cdn.pixabay.com/photo/2017/01/31/20/11/gear-2024496_960_720.png'
    },
    {
      title: 'Schweißrauch',
      content: 'Alle wichtigen Informationen finden sie hier.. ',
      expanded: false,
      description: 'Die TRGS 528 regelt die Exposition gegenüber Schweißrauchen und -gasen und legt Maßnahmen zur Minimierung fest. Der allgemeine AGW (Arbeitsplatzgrenzwert) für Schweißrauche beträgt 1,25 mg/m3.',
      imageUrl: 'https://cdn.pixabay.com/photo/2017/01/31/20/11/gear-2024496_960_720.png'
    },
    {
      title: 'Druck',
      content: 'Alle wichtigen Informationen finden sie hier.. ',
      expanded: false,
      description: 'Der Standardwert für den atmosphärischen Druck liegt bei etwa 1013 hPa und gilt üblicherweise für die meisten Arbeitsumgebungen, einschließlich Schweißereien. Normale Schwankungen des atmosphärischen Drucks sind im allgemeinen Arbeitsumfeld unproblematisch.',
      imageUrl: 'https://cdn.pixabay.com/photo/2017/01/31/20/11/gear-2024496_960_720.png'
    }
  ];

  dynamicTiles: Tile[] = [
    {
      title: 'Home',
      content: 'Informationen zur Unserer Homepage und allen wichtigen details.. ',
      expanded: false,
      description: 'Detaillierte Informationen zum Home.',
      imageUrl: 'https://cdn.pixabay.com/photo/2017/01/31/20/11/gear-2024496_960_720.png'
    },
    {
      title: 'Telefon',
      content: '+49 123 4567890',
      expanded: false,
      description: 'Kontaktieren Sie uns unter dieser Nummer.',
      imageUrl: 'https://cdn.pixabay.com/photo/2017/01/31/20/11/gear-2024496_960_720.png'
    },
    {
      title: 'Email',
      content: 'email@example.com',
      expanded: false,
      description: 'Erreichen Sie uns unter dieser E-Mail-Adresse.',
      imageUrl: 'https://cdn.pixabay.com/photo/2017/01/31/20/11/gear-2024496_960_720.png'
    },
    {
      title: 'Info',
      content: 'Informationen über unsere Zukunft wie wird sich das Projekt in zukunft weiter entwicklen, wie sind wir auf unsere idee gekommen.',
      expanded: false,
      description: 'Detaillierte Informationen zum Projekt.',
      imageUrl: 'https://cdn.pixabay.com/photo/2017/01/31/20/11/gear-2024496_960_720.png'
    }
  ];

  displayedTile: string = '';

  constructor(private http: HttpClient, public history: Aufgabe4Service, library: FaIconLibrary) {
    library.addIconPacks(fas);
  }

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    const apiKey = 'it2sose2024!';
    const topics = [
      'mioty/70-b3-d5-67-70-0e-ff-03/fc-a8-4a-03-00-00-0e-66/uplink'
    ];

    topics.forEach((topic, index) => {
      const url = `https://it2.ecosystem-tools.de/php/get-data?key=${encodeURIComponent(apiKey)}&topic=${encodeURIComponent(topic)}`;
      this.http.get(url).subscribe({
        next: (data: any) => {
          console.log(`Daten empfangen für Kachel ${index}:`, data);
          this.tiles[index].minValue = data.min;
          this.tiles[index].maxValue = data.max;
          this.tiles[index].content = `Min: ${data.min}, Max: ${data.max}`;

          // Grenzwerte prüfen und Warnungen hinzufügen
          if (index === 0 && data.max > 26) {
            this.tiles[index].warning = 'Warnung: Temperatur über 26°C';
          } else if (index === 1 && data.max > 25) {
            this.tiles[index].warning = 'Warnung: CO2 über 5000 ppm';
          } else if (index === 2 && (data.min < 40 || data.max > 60)) {
            this.tiles[index].warning = 'Warnung: Luftfeuchtigkeit außerhalb des Bereichs 40-60%';
          } else if (index === 3 && data.max > 1.25) {
            this.tiles[index].warning = 'Warnung: Schweißrauch über 1,25 mg/m³';
          }
        },
        error: (error) => {
          console.error(`Fehler beim Abrufen der Daten für Kachel ${index}:`, error);
        }
      });
    });
  }

  toggleTile(tile: Tile) {
    tile.expanded = !tile.expanded;
  }

  toggleDynamicTile(tileTitle: string) {
    if (this.displayedTile === tileTitle) {
      this.displayedTile = '';
    } else {
      this.displayedTile = tileTitle;
    }
  }
}
