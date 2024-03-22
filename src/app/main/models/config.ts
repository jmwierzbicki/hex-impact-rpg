export type Configuration = {
  isAltered: any;
  attributes: AttributesCfg;
  careers: CareersCfg;
  specialities: SpecialitiesCfg;
  powers: PowersCfg;
  improvements: ImprovementsCfg;
};

export type AttributesCfg = {
  sets: number;
  initialValue: number;
  maxValue: number;
  minValue: number;
  iterations: number;
  enabled: boolean;
};

export type CareersCfg = {
  count: number;
  enabled:boolean
};
export type SpecialitiesCfg = {
  initialChoices: number;
  count: number;
  sets: number;
  enabled:boolean;
};
export type PowersCfg = {
  count: number;
  sets: number;
  enabled:boolean
};
export type ImprovementsCfg = {
  count: number;
  enabled: boolean
};
