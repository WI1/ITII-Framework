import { Injectable } from '@angular/core';
import { ApiClass } from '../../../shared/abstract/api';

@Injectable({ providedIn: 'root' })
export class RealtimeService extends ApiClass {
  constructor() {
    super();
  }

  // Im Service werden die Funktionen für die Datenabfrage vom Server erstellt.

  // In größeren Projekten würde man noch eine eigene API "Schicht" heraus-extrahieren
  // und damit die fachliche Logik von der API trennen
}
