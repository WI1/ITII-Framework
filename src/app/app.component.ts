import { Component, NgModule } from '@angular/core';
import {
  NavigationEnd,
  Router,
  RouterLink,
  RouterOutlet,
//  RouterModule,
  Routes,
  Route
} from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { CommonModule } from '@angular/common';
//neu
import { routes } from './app.routes';
//Meltem
/**
import { BrowserModule } from '@angular/platform-browser';

import { Aufgabe3Component } from './feature/aufgabe3/page/aufgabe3/aufgabe3.component';
import { DashboardComponent } from './feature/aufgabe3/page/aufgabe3/aufgabe3.component';
import { QualityChecksComponent } from './feature/aufgabe3/page/aufgabe3/aufgabe3.component';
import { ProductListComponent } from './feature/aufgabe3/page/aufgabe3/aufgabe3.component';
import { ReportsComponent } from './feature/aufgabe3/page/aufgabe3/aufgabe3.component';
import { SettingsComponent } from './feature/aufgabe3/page/aufgabe3/aufgabe3.component';
import { UserManagementComponent } from './feature/aufgabe3/page/aufgabe3/aufgabe3.component';
//bis hier
*/
@Component({

  selector: 'if-root',
  standalone: true,
  imports: [RouterOutlet, MatTabsModule, CommonModule, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  links: string[] = [];
  activeLink = '';

  constructor(private router: Router) {
    // Das Array für die Tabbar "links" wird mit den "path" Werten des "routes"-Arrays (app.routes.ts) befüllt.
    routes.map((item) => {
      if (item.path) {
        this.links.push(item.path);
      }
    });

    // Der aktive Link wird aus dem Router Event gesetzt. Somit wird auch nach einem Seitenreload der richtige Tab als der Aktive Tab angezeigt.
    router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.activeLink = event.url.replace('/', '');
      }
    });
  }
}
/**
//hier weiter Meltem
const routes: Routes = [
  { path: '', component: Aufgabe3Component },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'quality-checks', component: QualityChecksComponent },
  { path: 'product-list', component: ProductListComponent },
  { path: 'reports', component: ReportsComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'user-management', component: UserManagementComponent },
]

@NgModule({
  declarations: [
    AppComponent,
    Aufgabe3Component,
    DashboardComponent,
    QualityChecksComponent,
    ProductListComponent,
    ReportsComponent,
    SettingsComponent
    UserManagementComponent,
  ],
  imports: [
    BrowserModule,
    MatTabsModule,
    CommonModule,
    RouterModule, forRoot(routes),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppComponent { }
*/