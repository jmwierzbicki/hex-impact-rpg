import { Injectable } from '@angular/core';
import { Hero } from '../models/Hero';

export enum STEPS {
  IMPROVEMENTS,
  ROLL_ORIGIN,
  ROLL_ATTRS,
  ROLL_SPECIALITIES,
  ROLL_POWERS,
  SUMMARY,
}

@Injectable({
  providedIn: 'root',
})
export class HeroBuilderService {
  hero: Hero = new Hero();
  step: STEPS = 0;

  adjustments: any = {};

  constructor() {}
}
