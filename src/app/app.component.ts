import {Component, OnInit} from '@angular/core';
import {Router, RouterLink, RouterOutlet} from '@angular/router';
import {MainModule} from './main/main.module';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButton} from '@angular/material/button';
import {MatSidenavModule,} from '@angular/material/sidenav';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {map, Observable} from 'rxjs';
import {AsyncPipe, NgIf, NgTemplateOutlet} from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {UserService} from "./main/services/user.service";
import {FormControl, ReactiveFormsModule, Validators} from "@angular/forms";
import {ConfigService} from "./main/configuration/config.service";

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
    ReactiveFormsModule,
  ],
  providers: [UserService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'Hex Impact';
  menuToggled = false;

  isSmallScreen$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.XSmall)
    .pipe(map((result) => result.matches));

  nameForm = new FormControl('', [Validators.required, Validators.minLength(4)]);

  creatorVisible?: boolean;

  constructor(public cfg: ConfigService, private breakpointObserver: BreakpointObserver, public userService: UserService, public router: Router) {

    router.events.subscribe(() => {
      this.creatorVisible = this.router.url === '/hero-creator'
    });
  }

  async ngOnInit() {
    await this.cfg.getConfig();
  }

  login() {
    if (this.nameForm.valid && this.nameForm.value) {
      this.userService.user = this.nameForm.value
    }

  }

}
