import { Component } from '@angular/core';
import {
  NavigationEnd,
  Router,
  RouterLink,
  RouterOutlet,
} from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { routes } from './app.routes';
import { CommonModule } from '@angular/common';

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
