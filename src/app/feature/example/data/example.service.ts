import { Injectable, WritableSignal, signal } from '@angular/core';
import { Films } from '../model/film';
import { ApiClass } from '../../../shared/abstract/api';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ExampleService extends ApiClass {
  // Signals können in Components (und Services...) als Daten verwendet werden
  public films: WritableSignal<Films | undefined> = signal<Films | undefined>(
    undefined
  );

  // In größeren Projekten würde man noch eine eigene API "Schicht" heraus-extrahieren
  // und damit die fachliche Logik von der API trennen
  private getFilmsFromBackend(): Observable<Films> {
    return this.handleApiCall<Films>(this.http.get<Films>('/api/films'));
  }

  // Nach außen für die Components verfügbar machen
  public getAllFilms() {
    return this.getFilmsFromBackend().subscribe((films) => {
      this.films.set(films);
    });
  }
}
