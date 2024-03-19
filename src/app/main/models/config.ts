export type Configuration = {
  attributes: AttributesCfg;
  careers: CareersCfg;
  specialities: SpecialitiesCfg;
  powers: PowersCfg;
  improvements: ImprovementsCfg;
};

export type AttributesCfg = {
  initialValue: number;
  maxValue: number;
  minValue: number;
  iterations: number;
};

export type CareersCfg = {
  count: number;
};
export type SpecialitiesCfg = {
  count: number;
  sets: number;
};
export type PowersCfg = {
  count: number;
  sets: number;
};
export type ImprovementsCfg = {
  count: number;
};
