import { Injectable, WritableSignal, signal } from '@angular/core';
import { ApiClass } from '../../../shared/abstract/api';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DataObject, Components } from './model';

@Injectable({ providedIn: 'root' })
export class Aufgabe2Service extends ApiClass {
  private apiUrl = 'https://it2.ecosystem-tools.de/php/get-data';
  private topic = 'mioty/70-b3-d5-67-70-0e-ff-03/fc-a8-4a-03-00-00-0e-67/uplink';
  private apiKey = 'it2sose2024!';

  constructor() {
    super();
  }

  // Im Service werden die Funktionen für die Datenabfrage vom Server erstellt.

  // In größeren Projekten würde man noch eine eigene API "Schicht" heraus-extrahieren
  // und damit die fachliche Logik von der API trennen

  public fetchData(): Observable<DataObject[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const params = new HttpParams()
      .set('topic', this.topic)
      .set('key', this.apiKey);

    const apiCall = this.http.get<DataObject[]>(this.apiUrl, { headers, params });
    return this.handleApiCall<DataObject[]>(apiCall);
  } 
}