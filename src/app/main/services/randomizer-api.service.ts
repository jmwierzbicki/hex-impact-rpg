import { Injectable } from '@angular/core';
import { IAttributes } from '../models/attributes';
import { getRandomSet } from '../helpers/get-random-set';
import { DataBaseService } from './data-base.service';
import { IOrigin, OriginCareer } from '../models/origin';
import { ICareer } from '../models/career';
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

@Injectable({
  providedIn: 'root',
})
export class RandomizerApiService {
  constructor(public db: DataBaseService) {}

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
      let randomUpgradeIndex = Math.floor(
        Math.random() * upgradableAttributes.length,
      );
      let downgradableAttributes = Object.entries(attributeList).filter(
        ([a, b]) => b > minValue,
      );
      let randomDowngradeIndex = Math.floor(
        Math.random() * downgradableAttributes.length,
      );
      let [upgradeProperty] = upgradableAttributes[randomUpgradeIndex];
      attributeList[upgradeProperty as AttributeKeys] += 1;

      let [downgradeProperty] = downgradableAttributes[randomDowngradeIndex];
      attributeList[downgradeProperty as AttributeKeys] -= 1;
    }

    return attributeList;
  }

  getOriginCareerSet(config: CareersCfg): OriginCareer[] {
    const { count } = config;
    let careers = this.db.careers;
    let origins = this.db.origins;

    careers = getRandomSet(careers, 3, 'probability', 'name');
    origins = getRandomSet(origins, 3, 'probability', 'name');

    const result: any[] = [];

    while (result.length < count) {
      const origin: IOrigin = getRandomSet(
        origins,
        1,
        'probability',
        'name',
      )[0];
      const career: ICareer = getRandomSet(
        careers,
        1,
        'probability',
        'name',
      )[0];

      const newOb = {
        id: `${origin.name}-${career.name}`,
        origin: origin,
        career: career,
      };
      if (!result.find((item) => item.id === newOb.id)) {
        result.push(newOb);
      }
    }

    return result;
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

  getRandomPowerSets(config: PowersCfg): PowerSets {
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
            'difficulty',
            'powerID',
          ),
        });
      }
      return accumulator;
    };

    let allPowers = this.db.powers.filter((pwr) => pwr.active);

    let types: string[] = allPowers.map((pwr) => pwr.powerType);
    types = Array.from(new Set(types)); // unique values

    let powerByTypeSet = types.reduce(
      (map, type) =>
        map.set(
          type,
          allPowers.filter((pwr) => pwr.powerType === type),
        ),
      new Map(),
    );
    const powerSets: PowerSets = new Map();
    types.forEach((type) => {
      powerSets.set(type, { sets: genSetsByType(type, sets, count) });
    });

    for (let i = 0; i < types.length; i++) {}

    return powerSets;
  }

  getRandomImprovements(config: ImprovementsCfg): IImprovements[] {
    const { count } = config;

    let improvements = this.db.improvements;
    return getRandomSet(improvements, count, 'probability', 'id');
  }
}
