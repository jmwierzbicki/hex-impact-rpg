import { Configuration } from '../app/main/models/config';

export const appConfigurationDefaults: Configuration = {
  attributes: {
    initialValue: 4,
    maxValue: 8,
    minValue: 1,
    iterations: 3,
  },
  careers: {
    count: 3,
  },
  specialities: {
    count: 3,
    sets: 12,
  },
  powers: {
    count: 3,
    sets: 4,
  },
  improvements: { count: 10 },
};
