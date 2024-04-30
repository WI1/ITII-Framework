import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone, inject } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })

//Insgesamt bietet diese Klasse eine Struktur für die Behandlung von API-Aufrufen und Fehlern auf eine Weise,
// die Angular-spezifische Aspekte berücksichtigt, insbesondere das Ausführen von Code außerhalb der Angular-Zone,
// um die Leistung zu optimieren. Klassen, die von ApiClass erben, können diese Methoden verwenden und bei Bedarf anpassen.
export abstract class ApiClass {
  protected http = inject(HttpClient);
  private zone = inject(NgZone);

  public handleApiCall<T>(apiCall: Observable<T>): Observable<T> {
    return apiCall.pipe(
      catchError((error) => {
        this.handleError(error.message);
        return throwError(() => error);
      })
    );
  }

  private handleError(errorMessage: string): void {
    this.zone.runOutsideAngular(() => {
      alert(errorMessage);
    });
  }
}
