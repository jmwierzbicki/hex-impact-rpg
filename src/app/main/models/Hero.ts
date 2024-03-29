import { PowerSets } from './power';
import { ISpeciality } from './speciality';
import { IAttributes } from './attributes';
import { IImprovements } from './improvements';

export class Hero {
  public name: string = '';

  public attributes?: IAttributes;

  public powerSets: PowerSets = new Map();

  public specialitiesSets: ISpeciality[][] = [];

  public improvements: IImprovements[] = [];
}
