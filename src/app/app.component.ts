import {Component} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
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
export class AppComponent {
  title = 'Hex Impact';
  menuToggled = false;

  isSmallScreen$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.XSmall)
    .pipe(map((result) => result.matches));

  nameForm = new FormControl('', [Validators.required, Validators.minLength(4)]);

  constructor(private breakpointObserver: BreakpointObserver, public userService: UserService) {
  }


  login() {
    if (this.nameForm.valid && this.nameForm.value) {
      console.log('test')
      this.userService.user = this.nameForm.value
    }

  }

}
