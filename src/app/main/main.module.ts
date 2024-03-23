import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DataBaseService} from './services/data-base.service';
import {CsvParserService} from './services/csv-parser.service';
import {HeroCreatorComponent} from './hero-creator/hero-creator.component';
import {MainComponent} from './main.component';
import {OriginRollerComponent} from './hero-creator/origin-roller/origin-roller.component';
import {CharacterNameFormComponent} from './hero-creator/character-name-form/character-name-form.component';
import {AttributeScalerComponent} from './hero-creator/attribute-scaler/attribute-scaler.component';
import {SpecialitiesSelectorComponent} from './hero-creator/specialities-selector/specialities-selector.component';
import {PowerFactoryComponent} from './hero-creator/power-factory/power-factory.component';
import {HttpClientModule} from '@angular/common/http';
import {RandomizerApiService} from './services/randomizer-api.service';
import {PageComponent} from './pdf-creator/page/page.component';
import {BulkHeroCreateComponent} from './hero-bulk-creator/bulk-hero-create/bulk-hero-create.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule,} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {HeroResultCardComponent} from './hero-creator/hero-result-card/hero-result-card.component';
import {ConfigurationComponent} from './configuration/configuration.component';
import {ModalComponent} from './helpers/modal/modal.component';
import {ImprovementsComponent} from './hero-creator/improvements/improvements.component';
import {WatchObjectDirective} from "./helpers/watch-object.directive";
import { PowerMediaComponent } from './shared-components/power-media/power-media.component';
import { PowerBrowserComponent } from './shared-components/power-browser/power-browser.component';
import { DeactivateRouteComponent } from './deactivate-route-warning/deactivate-route/deactivate-route.component';
import { UserListComponent } from './user-list/user-list.component';
import { AttributeSetComponent } from './shared-components/attribute-set/attribute-set.component';
import {AttrDescPipe} from "./shared-components/attribute-set/attr-desc.pipe";
import {FilterEmptyPipe} from "./helpers/filter-empty.pipe";
import {MarkdownModule} from "ngx-markdown";
import { GuidePageComponent } from './guide-page/guide-page.component';
import { DummyPageComponent } from './dummy-page/dummy-page.component';

@NgModule({
  declarations: [
    HeroCreatorComponent,
    MainComponent,
    OriginRollerComponent,
    CharacterNameFormComponent,
    AttributeScalerComponent,
    SpecialitiesSelectorComponent,
    PowerFactoryComponent,
    PageComponent,
    BulkHeroCreateComponent,
    HeroResultCardComponent,
    ConfigurationComponent,
    ModalComponent,
    ImprovementsComponent,
    WatchObjectDirective,
    PowerMediaComponent,
    PowerBrowserComponent,
    DeactivateRouteComponent,
    UserListComponent,
    AttributeSetComponent,
    GuidePageComponent,
    DummyPageComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCardModule,
    FormsModule,
    AttrDescPipe,
    FilterEmptyPipe,
    MarkdownModule.forRoot()

  ],
  providers: [DataBaseService, CsvParserService, RandomizerApiService],
  exports: [
    DeactivateRouteComponent,
    HeroCreatorComponent
  ]
})
export class MainModule {
}
