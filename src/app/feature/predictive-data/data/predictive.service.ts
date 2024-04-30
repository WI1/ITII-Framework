import { Injectable } from '@angular/core';
import { ApiClass } from '../../../shared/abstract/api';

@Injectable({ providedIn: 'root' })
export class PredictiveService extends ApiClass {
  constructor() {
    super();
  }

  // Definition verschiedener Seitenspezifischer Api Observables

  // Im Service werden die Funktionen für die Datenabfrage vom Server erstellt.
}
