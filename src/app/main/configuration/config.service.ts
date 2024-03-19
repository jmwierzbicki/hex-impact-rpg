import { Injectable } from '@angular/core';
import { appConfigurationDefaults } from '../../../config/constants';
import { Configuration } from '../models/config';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  get isCustomConfig(): boolean {
    return !!localStorage.getItem('config');
  }

  get config(): Configuration {
    let storedConfig = undefined;
    const localStorageConfig = localStorage.getItem('config');
    if (localStorageConfig) {
      storedConfig = JSON.parse(localStorageConfig);
    }

    return storedConfig || appConfigurationDefaults;
  }

  saveConfig(config: any) {
    const json = JSON.stringify(config);
    localStorage.setItem('config', json);
  }

  clearConfig() {
    localStorage.removeItem('config');
  }

  constructor() {}
}
