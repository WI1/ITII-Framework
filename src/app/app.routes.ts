import { Routes } from '@angular/router';

// Hier werden alle aufrufbaren Routen für unsere Seite definiert. Unsere Anwendung hat aktuell 5 Ansichten, wobei die 'overview' als Startpunkt definiert ist.
export const routes: Routes = [
  { path: '', redirectTo: 'aufgabe5', pathMatch: 'full' },
  {
    path: 'aufgabe5',
    loadChildren: () =>
      import('./feature/aufgabe5/aufgabe5.routes').then(
        (m) => m.AUFGABE5_ROUTES
      ),
  },
  {
    path: 'aufgabe1',
    loadChildren: () =>
      import('./feature/aufgabe1/aufgabe1.routes').then((m) => m.AUFGABE1_ROUTES),
  },
  {
    path: 'aufgabe2',
    loadChildren: () =>
      import('./feature/aufgabe2/aufgabe2.routes').then((m) => m.AUFGABE2_ROUTES),
  },
  {
    path: 'aufgabe3',
    loadChildren: () =>
      import('./feature/aufgabe3/aufgabe3.routes').then((m) => m.AUFGABE3_ROUTES),
  },
  {
    path: 'aufgabe4',
    loadChildren: () =>
      import('./feature/aufgabe4/aufgabe4.routes').then((m) => m.AUFGABE4_ROUTES),

    
  },
  {
    path: 'example',
    loadChildren: () =>
      import('./feature/example/example.routes').then((m) => m.EXAMPLE_ROUTES),
  },
];
