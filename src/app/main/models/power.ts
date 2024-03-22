export type PowerSet = { powers: IPower[] };
export type PowerSets = Map<string, { sets: PowerSet[] }>;

export interface IPower {
  samePowerCount: number;
  id: string;
  probability:number;
  active: boolean;
  name: string;
  type: string;
  difficulty: string;
  startingLvl: number;
  description: string;
  example: string;
  mechanics: string;
  choiceText: string;
  extrasText: string;
  mechanicalTags: string;
}
