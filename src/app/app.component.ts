import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MainModule } from './main/main.module';
import { MatToolbar, MatToolbarModule } from '@angular/material/toolbar';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';
import {
  MatSidenav,
  MatSidenavContainer,
  MatSidenavModule,
} from '@angular/material/sidenav';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map, Observable } from 'rxjs';
import { AsyncPipe, NgIf, NgTemplateOutlet } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MainModule,
    MatToolbarModule,
    MatIconModule,
    MatButton,
    MatSidenavModule,
    NgIf,
    AsyncPipe,
    NgTemplateOutlet,
    RouterLink,
    MatCardModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'Hex Impact';
  menuToggled = false;

  isSmallScreen$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.XSmall)
    .pipe(map((result) => result.matches));

  constructor(private breakpointObserver: BreakpointObserver) {}
}
