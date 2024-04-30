import { Routes } from '@angular/router';

// Hier werden alle aufrufbaren Routen für unsere Seite definiert. Unsere Anwendung hat aktuell 5 Ansichten, wobei die 'overview' als Startpunkt definiert ist.
export const routes: Routes = [
  { path: '', redirectTo: 'overview', pathMatch: 'full' },
  {
    path: 'overview',
    loadChildren: () =>
      import('./feature/overview/overview.routes').then(
        (m) => m.OVERVIEW_ROUTES
      ),
  },
  {
    path: 'realtime',
    loadChildren: () =>
      import('./feature/realtime-data/realtime.routes').then(
        (m) => m.REALTIME_ROUTES
      ),
  },
  {
    path: 'predictive',
    loadChildren: () =>
      import('./feature/predictive-data/predictive.routes').then(
        (m) => m.PREDICTIVE_ROUTES
      ),
  },
  {
    path: 'history',
    loadChildren: () =>
      import('./feature/history/history.routes').then((m) => m.HISTORY_ROUTES),
  },
  {
    path: 'example',
    loadChildren: () =>
      import('./feature/example/example.routes').then((m) => m.EXAMPLE_ROUTES),
  },
];
