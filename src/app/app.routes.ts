import { Routes } from '@angular/router';
import { BulkHeroCreateComponent } from './main/hero-bulk-creator/bulk-hero-create/bulk-hero-create.component';
import { ConfigurationComponent } from './main/configuration/configuration.component';
import {HeroCreatorComponent} from "./main/hero-creator/hero-creator.component";
import {adminGuardGuard} from "./admin-guard.guard";
import {PowerBrowserComponent} from "./main/shared-components/power-browser/power-browser.component";
import {confirmDeactivateGuard} from "./main/deactivate-route-warning/deactivate-route/comfirm-deactivate.guard";
import {UserListComponent} from "./main/user-list/user-list.component";
import {GuidePageComponent} from "./main/guide-page/guide-page.component";

export const routes: Routes = [
  { pathMatch: 'full', path: '', redirectTo: 'hero-creator' },
  { path: 'bulk-create', component: BulkHeroCreateComponent, canActivate: [adminGuardGuard] },
  { path: 'config', component: ConfigurationComponent, canActivate: [adminGuardGuard] },
  { path: 'hero-creator', component: HeroCreatorComponent, canDeactivate: [confirmDeactivateGuard] },
  { path: 'power-browser', component: PowerBrowserComponent },
  { path: 'user-list', component: UserListComponent, canActivate: [adminGuardGuard] },
  { path: 'guide-page', component: GuidePageComponent },
];
