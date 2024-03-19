import { PowerSets } from './power';
import { ISpeciality, Speciality } from './speciality';
import { OriginCareer } from './origin';
import { IAttributes } from './attributes';
import { IImprovements } from './improvements';

export class Hero {
  public name: string = '';
  public surname: string = '';
  public age: number = 0;
  public bio: string = '';
  public gender?: 'MALE' | 'FEMALE' = undefined;

  public originCareer: OriginCareer[] = [];

  public attributes?: IAttributes;

  public powerSets: PowerSets = new Map();

  public specialitiesSets: ISpeciality[][] = [];

  public improvements: IImprovements[] = [];
}
