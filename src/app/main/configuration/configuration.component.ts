import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ConfigService } from './config.service';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrl: './configuration.component.scss',
})
export class ConfigurationComponent implements OnInit {
  public configForm = new FormGroup({
    attributes: new FormGroup({
      initialValue: new FormControl(),
      maxValue: new FormControl(),
      minValue: new FormControl(),
      iterations: new FormControl(),
    }),
    careers: new FormGroup({
      count: new FormControl(),
    }),
    specialities: new FormGroup({
      count: new FormControl(),
      sets: new FormControl(),
    }),
    powers: new FormGroup({
      count: new FormControl(),
      sets: new FormControl(),
    }),
    improvements: new FormGroup({
      count: new FormControl(),
    }),
  });

  ngOnInit() {
    this.configForm.setValue(this.configService.config);
  }

  saveConfig() {
    this.configService.saveConfig(this.configForm.value);
  }

  restore() {
    this.configService.clearConfig();
    this.configForm.reset(this.configService.config);
  }

  constructor(public configService: ConfigService) {}
}
