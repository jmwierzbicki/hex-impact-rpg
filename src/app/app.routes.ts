import { Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { BulkHeroCreateComponent } from './main/hero-bulk-creator/bulk-hero-create/bulk-hero-create.component';
import { ConfigurationComponent } from './main/configuration/configuration.component';
import {HeroCreatorComponent} from "./main/hero-creator/hero-creator.component";

export const routes: Routes = [
  { pathMatch: 'full', path: '', redirectTo: 'bulk-create' },
  { path: 'bulk-create', component: BulkHeroCreateComponent },
  { path: 'config', component: ConfigurationComponent },
  { path: 'hero-creator', component: HeroCreatorComponent },
];
