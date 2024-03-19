import { Injectable } from '@angular/core';
import { Hero } from '../models/Hero';

export enum STEPS {
  START_SCREEN,
  ROLL_ORIGIN,
  ROLL_ATTRS,
  ROLL_SPECIALITIES,
  ROLL_POWERS,
  APPLY_ORIGIN,
}

@Injectable({
  providedIn: 'root',
})
export class HeroBuilderService {
  hero: Hero = new Hero();
  step: STEPS = 0;

  constructor() {}
}
