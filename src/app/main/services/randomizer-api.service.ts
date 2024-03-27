import { Injectable } from '@angular/core';
import { IAttributes } from '../models/attributes';
import { getRandomSet } from '../helpers/get-random-set';
import { DataBaseService } from './data-base.service';
import { IOrigin } from '../models/origin';
import { ISpeciality } from '../models/speciality';
import { IPower, PowerSet, PowerSets } from '../models/power';
import { type } from 'node:os';
import { IImprovements } from '../models/improvements';
import {
  AttributesCfg,
  CareersCfg,
  Configuration,
  ImprovementsCfg,
  PowersCfg,
  SpecialitiesCfg,
} from '../models/config';
import {RNG} from "../helpers/rng";

@Injectable({
  providedIn: 'root',
})
export class RandomizerApiService {
  constructor(public db: DataBaseService) {}

  getAttributeSets(config: AttributesCfg): IAttributes[] {
    const sets = []
    for (let i = 0; i < config.sets; i++) {
      sets.push(this.getRandomizedAttributes(config))
    }
    return sets
  }

  getRandomizedAttributes(config: AttributesCfg): IAttributes {
    const { initialValue, maxValue, minValue, iterations } = config;

    const attributeList: IAttributes = {
      prowess: initialValue,
      coordination: initialValue,
      strength: initialValue,
      intellect: initialValue,
      awareness: initialValue,
      willpower: initialValue,
    };
    type AttributeKeys = keyof IAttributes;

    for (let i = 0; i < iterations; i++) {
      let upgradableAttributes = Object.entries(attributeList).filter(
        ([a, b]) => b < maxValue,
      );
      let randomUpgradeIndex = RNG.generate(upgradableAttributes.length)
      let downgradableAttributes = Object.entries(attributeList).filter(
        ([a, b]) => b > minValue,
      );
      let randomDowngradeIndex = RNG.generate(downgradableAttributes.length)
      let [upgradeProperty] = upgradableAttributes[randomUpgradeIndex];
      attributeList[upgradeProperty as AttributeKeys] += 1;

      let [downgradeProperty] = downgradableAttributes[randomDowngradeIndex];
      attributeList[downgradeProperty as AttributeKeys] -= 1;
    }

    return attributeList;
  }

  getOriginSet(config: CareersCfg): IOrigin[] {
    const { count } = config;
    let origins = this.db.origins;

    origins = getRandomSet(origins, 3, 'probability', 'name');


    return origins;
  }

  getSpecialitySets(config: SpecialitiesCfg) {
    const { sets, count } = config;
    let specialities = this.db.specialities;

    const result: ISpeciality[][] = [];

    for (let i = 0; i < sets; i++) {
      result.push(getRandomSet(specialities, count, 'probability', 'name'));
    }

    return result;
  }

  getRandomPowerSets(config: PowersCfg): {powerTypes: string[], powerSets:PowerSets } {
    const { sets, count } = config;
    const genSetsByType = (
      type: string,
      setCount: number,
      pwrCount: number,
    ) => {
      let accumulator: PowerSet[] = [];
      for (let i = 0; i < setCount; i++) {
        accumulator.push({
          powers: getRandomSet(
            powerByTypeSet.get(type),
            pwrCount,
            'probability',
            'id',
          ),
        });
      }
      return accumulator;
    };

    let allPowers = this.db.powers.filter((pwr) => pwr.active);

    let types: string[] = allPowers.map((pwr) => pwr.type);
    types = Array.from(new Set(types)); // unique values
    types.push('Any type')

    let powerByTypeSet = types.reduce(
      (map, type) =>
        map.set(
          type,
          allPowers.filter((pwr) => pwr.type === type),
        ),
      new Map(),
    );
    powerByTypeSet.set('Any type', allPowers)
    const powerSets: PowerSets = new Map();
    types.forEach((type) => {
      powerSets.set(type, { sets: genSetsByType(type, sets, count) });
    });

    for (let i = 0; i < types.length; i++) {}

    // console.log(types)
    // console.log(powerSets)

    return {powerSets, powerTypes: types};
  }

  getRandomImprovements(config: ImprovementsCfg): IImprovements[] {
    const { count } = config;

    let improvements = this.db.improvements;
    return getRandomSet(improvements, count, 'probability', 'id', false);
  }
}
