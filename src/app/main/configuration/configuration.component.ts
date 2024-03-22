import {Component, Input, OnInit} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ConfigService } from './config.service';
import {appConfigurationDefaults} from "../../../config/constants";
import {Configuration} from "../models/config";

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrl: './configuration.component.scss',
})
export class ConfigurationComponent implements OnInit {
  @Input() public localOnly: boolean = false

  public configForm = new FormGroup({
    isAltered: new FormControl(true),
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

  async ngOnInit() {
    this.configForm.setValue(appConfigurationDefaults );
    this.configForm.patchValue(this.configService.config);
  }

  async saveConfig() {
    await this.configService.saveConfig(this.configForm.value as any);
    this.configForm.markAsPristine();
    this.configForm.markAsUntouched();
  }

  async restore() {
    if (this.localOnly) {
      this.configForm.reset(this.configService.config);
      return
    }
    await this.configService.deleteConfig();
    await this.configService.getConfig();
    this.configForm.reset(this.configService.config);
  }

  constructor(public configService: ConfigService) {}
}
