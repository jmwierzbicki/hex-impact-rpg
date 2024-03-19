import { count } from 'rxjs';

export function getRandomSet(
  collection: any[],
  count: number,
  weightKey: string,
  idKey: string,
): any[] {
  const resultCollection: any[] = [];
  let weightedCollection: any[] = [];
  count = collection.length < count ? collection.length : count;

  collection.forEach((item) => {
    weightedCollection.push(...new Array(Number(item[weightKey])).fill(item));
  });

  while (resultCollection.length < count) {
    const randomIndex = Math.floor(Math.random() * weightedCollection.length);
    const randomItem = weightedCollection[randomIndex];
    resultCollection.push(randomItem);
    weightedCollection = weightedCollection.filter(
      (item) => item[idKey] !== randomItem[idKey],
    );
  }

  return resultCollection;
}
