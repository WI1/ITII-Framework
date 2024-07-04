import { Injectable } from '@angular/core';
//Mel
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
//bis hier
import { ApiClass } from '../../../shared/abstract/api';

@Injectable({ providedIn: 'root' })
export class Aufgabe3Service extends ApiClass {
  //Mel
  //rausgenommen: /php/get-data
  private baseUrl = 'https://it2.ecosystem-tools.de/php/get-data';
  private apiKey = 'it2sose2024!';

  constructor(http: HttpClient) {
    super();
  }

  // Im Service werden die Funktionen für die Datenabfrage vom Server erstellt.
//Mel
  getSensorData(topic: string): Observable<any> {
    // benutze HttpParams und mache mit set
    const url = `${this.baseUrl}?key=${this.apiKey}&topic=${topic}`;
    console.log(`Making API call to: ${url}`);
    return this.http.get<any>(url);
  }
  // In größeren Projekten würde man noch eine eigene API "Schicht" heraus-extrahieren
  // und damit die fachliche Logik von der API trennen
}
