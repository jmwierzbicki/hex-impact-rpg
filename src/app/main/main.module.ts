import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataBaseService } from './services/data-base.service';
import { CsvParserService } from './services/csv-parser.service';
import { HeroCreatorComponent } from './hero-creator/hero-creator.component';
import { MainComponent } from './main.component';
import { OriginRollerComponent } from './hero-creator/origin-roller/origin-roller.component';
import { CharacterNameFormComponent } from './hero-creator/character-name-form/character-name-form.component';
import { AttributeScalerComponent } from './hero-creator/attribute-scaler/attribute-scaler.component';
import { SpecialitiesSelectorComponent } from './hero-creator/specialities-selector/specialities-selector.component';
import { PowerFactoryComponent } from './hero-creator/power-factory/power-factory.component';
import { OriginConfiguratorComponent } from './hero-creator/origin-configurator/origin-configurator.component';
import { OriginSelectorComponent } from './hero-creator/origin-selector/origin-selector.component';
import { SplashScreenComponent } from './hero-creator/splash-screen/splash-screen.component';
import { MarkdownComponent, MarkdownModule } from 'ngx-markdown';
import { HttpClientModule } from '@angular/common/http';
import { RandomizerApiService } from './services/randomizer-api.service';
import { PageComponent } from './pdf-creator/page/page.component';
import { BulkHeroCreateComponent } from './hero-bulk-creator/bulk-hero-create/bulk-hero-create.component';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatFormField,
  MatInput,
  MatInputModule,
} from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatCardHeader, MatCardModule } from '@angular/material/card';
import { HeroResultCardComponent } from './hero-creator/hero-result-card/hero-result-card.component';
import { ConfigurationComponent } from './configuration/configuration.component';

@NgModule({
  declarations: [
    HeroCreatorComponent,
    MainComponent,
    OriginRollerComponent,
    CharacterNameFormComponent,
    AttributeScalerComponent,
    SpecialitiesSelectorComponent,
    PowerFactoryComponent,
    OriginConfiguratorComponent,
    OriginSelectorComponent,
    SplashScreenComponent,
    PageComponent,
    BulkHeroCreateComponent,
    HeroResultCardComponent,
    ConfigurationComponent,
  ],
  imports: [
    CommonModule,
    MarkdownModule.forRoot(),
    HttpClientModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCardModule,
  ],
  providers: [DataBaseService, CsvParserService, RandomizerApiService],
})
export class MainModule {}
