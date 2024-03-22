import {Injectable} from '@angular/core';
import {appConfigurationDefaults} from '../../../config/constants';
import {Configuration} from '../models/config';
import {HttpClient} from "@angular/common/http";
import {firstValueFrom} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class ConfigService {

  public config: Configuration = appConfigurationDefaults

  async getConfig() {
    this.config = await firstValueFrom(this.client.get<Configuration>(`/api/get-config`))
    return this.config
  }

  async saveConfig(cfg: Configuration) {
    cfg.isAltered = true;
    await firstValueFrom(this.client.post<Configuration>(`/api/set-config`, cfg))
    await this.getConfig()
  }
  async deleteConfig() {
    await firstValueFrom(this.client.delete<Configuration>(`/api/set-config`))
    await this.getConfig()
  }

  constructor(public client: HttpClient) {}
}
