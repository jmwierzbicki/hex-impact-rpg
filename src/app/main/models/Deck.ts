import { PowerSets } from './power';
import { ISpeciality } from './speciality';
import { IAttributes } from './attributes';
import { IImprovements } from './improvements';
import {IOrigin} from "./origin";

export class Deck {
  public name: string = '';

  public origin: IOrigin[] = [];

  public attributes: IAttributes[] = [];

  public powerSets: PowerSets = new Map();
  public powerTypes: string[] = [];

  public specialitiesSets: ISpeciality[][] = [];

  public improvements: IImprovements[] = [];
}
