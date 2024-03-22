import { Routes } from '@angular/router';
import { BulkHeroCreateComponent } from './main/hero-bulk-creator/bulk-hero-create/bulk-hero-create.component';
import { ConfigurationComponent } from './main/configuration/configuration.component';
import {HeroCreatorComponent} from "./main/hero-creator/hero-creator.component";
import {adminGuardGuard} from "./admin-guard.guard";

export const routes: Routes = [
  { pathMatch: 'full', path: '', redirectTo: 'hero-creator' },
  { path: 'bulk-create', component: BulkHeroCreateComponent, canActivate: [adminGuardGuard] },
  { path: 'config', component: ConfigurationComponent, canActivate: [adminGuardGuard] },
  { path: 'hero-creator', component: HeroCreatorComponent },
];
