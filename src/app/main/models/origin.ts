import { ICareer } from './career';

export type OriginCareer = { id: string; origin: IOrigin; career: ICareer };

export interface IOrigin {
  name: string;
  desc: string;
  mechanicalDesc: string;
  probability: string;
}
