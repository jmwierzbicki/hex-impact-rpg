import { Injectable } from '@angular/core';
import Papa from 'papaparse';

@Injectable({
  providedIn: 'root',
})
export class CsvParserService {
  public parse(data: string) {
    return Papa.parse(data, {
      header: true,
      delimiter: ',',
      dynamicTyping: true,
      skipEmptyLines: true,
    });
  }

  constructor() {}
}
