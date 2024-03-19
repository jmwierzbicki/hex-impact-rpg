export type PowerSet = { powers: IPower[] };
export type PowerSets = Map<string, { sets: PowerSet[] }>;

export interface IPower {
  powerID: string;
  active: boolean;
  powerName: string;
  powerType: string;
  difficulty: string;
  startingLvl: number;
  powerDesc: string;
  powerExample: string;
  powerChoiceText: string;
  powerExtrasText: string;
}
