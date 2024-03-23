import { count } from 'rxjs';
import {RNG} from "./rng";

export function getRandomSet(
  collection: any[],
  count: number,
  weightKey: string,
  idKey: string,
  unique: boolean = true
): any[] {
  const resultCollection: any[] = [];
  let weightedCollection: any[] = [];

  if (unique) {
    count = collection.length < count ? collection.length : count;
  }


  collection.forEach((item) => {
    weightedCollection.push(...new Array(Number(item[weightKey])).fill(item));
  });

  while (resultCollection.length < count) {
    const randomIndex = RNG.generate(weightedCollection.length);
    const randomItem = weightedCollection[randomIndex];
    resultCollection.push(randomItem);
    if (unique) {
      weightedCollection = weightedCollection.filter(
        (item) => item[idKey] !== randomItem[idKey],
      );
    }

  }

  return resultCollection;
}
