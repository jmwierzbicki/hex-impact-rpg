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
    if (storedConfig) {
      const finalConfig: Configuration = {...appConfigurationDefaults, ...storedConfig}
      finalConfig.attributes = {...appConfigurationDefaults.attributes, ...storedConfig.attributes}
      finalConfig.specialities = {...appConfigurationDefaults.specialities, ...storedConfig.specialities}
      finalConfig.careers = {...appConfigurationDefaults.careers, ...storedConfig.careers}
      finalConfig.powers = {...appConfigurationDefaults.powers, ...storedConfig.powers}
      finalConfig.improvements = {...appConfigurationDefaults.improvements, ...storedConfig.improvements}
      return finalConfig
    }


    return appConfigurationDefaults;
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
