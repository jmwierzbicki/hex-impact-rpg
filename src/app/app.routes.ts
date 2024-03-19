import { Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { BulkHeroCreateComponent } from './main/hero-bulk-creator/bulk-hero-create/bulk-hero-create.component';
import { ConfigurationComponent } from './main/configuration/configuration.component';

export const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'bulk-create', component: BulkHeroCreateComponent },
  { path: 'config', component: ConfigurationComponent },
];