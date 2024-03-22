import { Injectable } from '@angular/core';
import { Hero } from '../models/Hero';

export enum STEPS {
  ROLL_ORIGIN,
  ROLL_ATTRS,
  ROLL_SPECIALITIES,
  ROLL_POWERS,
  ROLL_IMPROVEMENTS,
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
