import { Injectable } from '@angular/core';
import { CsvParserService } from './csv-parser.service';
import { ISpeciality } from '../models/speciality';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject, firstValueFrom, Subject} from 'rxjs';
import { ParseResult } from 'papaparse';
import { IOrigin } from '../models/origin';
import { IPower } from '../models/power';
import { IImprovements } from '../models/improvements';

@Injectable({
  providedIn: 'root',
})
export class DataBaseService {
  public specialities: ISpeciality[] = [];
  public origins: IOrigin[] = [];
  public powers: IPower[] = [];
  public improvements: IImprovements[] = [];
  public dbPopulated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    public parser: CsvParserService,
    private client: HttpClient,
  ) {
    (async () => {
      await this.getSpecialities();
      await this.getOrigins();
      await this.getPowers();
      await this.getImprovements();
      this.dbPopulated.next(true);
    })();
  }

  async getSpecialities() {
    const defaultCsv = await firstValueFrom(
      this.client.get('/assets/csv/speciality.csv', {
        responseType: 'text',
      }),
    );
    const parsed = this.parser.parse(defaultCsv) as ParseResult<ISpeciality>;
    this.specialities = parsed.data;
  }

  async getOrigins() {
    const defaultCsv = await firstValueFrom(
      this.client.get('/assets/csv/origins.csv', {
        responseType: 'text',
      }),
    );
    const parsed = this.parser.parse(defaultCsv) as ParseResult<IOrigin>;
    this.origins = parsed.data;
  }

  async getPowers() {
    const defaultCsv = await firstValueFrom(
      this.client.get('/assets/csv/powers.csv', {
        responseType: 'text',
      }),
    );
    const parsed = this.parser.parse(defaultCsv) as ParseResult<IPower>;
    this.powers = parsed.data;
  }

  async getImprovements() {
    const defaultCsv = await firstValueFrom(
      this.client.get('/assets/csv/improvements.csv', {
        responseType: 'text',
      }),
    );
    const parsed = this.parser.parse(defaultCsv) as ParseResult<IImprovements>;
    this.improvements = parsed.data;
  }
}
