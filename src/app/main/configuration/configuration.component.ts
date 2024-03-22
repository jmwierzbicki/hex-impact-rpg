import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ConfigService } from './config.service';
import {appConfigurationDefaults} from "../../../config/constants";

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrl: './configuration.component.scss',
})
export class ConfigurationComponent implements OnInit {
  public configForm = new FormGroup({
    attributes: new FormGroup({
      sets: new FormControl(),
      initialValue: new FormControl(),
      maxValue: new FormControl(),
      minValue: new FormControl(),
      iterations: new FormControl(),
      enabled: new FormControl(),
    }),
    careers: new FormGroup({
      count: new FormControl(),
      enabled: new FormControl(),
    }),
    specialities: new FormGroup({
      initialChoices: new FormControl(),
      count: new FormControl(),
      sets: new FormControl(),
      enabled: new FormControl(),
    }),
    powers: new FormGroup({
      count: new FormControl(),
      sets: new FormControl(),
      enabled: new FormControl(),
    }),
    improvements: new FormGroup({
      count: new FormControl(),
      enabled: new FormControl(),
    }),
  });

  ngOnInit() {
    this.configForm.setValue(appConfigurationDefaults);
    this.configForm.patchValue(this.configService.config);
  }

  saveConfig() {
    this.configService.saveConfig(this.configForm.value);
    this.configForm.markAsPristine();
    this.configForm.markAsUntouched();
  }

  restore() {
    this.configService.clearConfig();
    this.configForm.reset(this.configService.config);
  }

  constructor(public configService: ConfigService) {}
}
