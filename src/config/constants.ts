import { Configuration } from '../app/main/models/config';

export const appConfigurationDefaults: Configuration = {
  attributes: {
    initialValue: 4,
    maxValue: 8,
    minValue: 1,
    iterations: 3,
    enabled: true
  },
  careers: {
    count: 3,
    enabled: true
  },
  specialities: {
    count: 3,
    sets: 12,
    enabled: true
  },
  powers: {
    count: 3,
    sets: 4,
    enabled: true
  },
  improvements: { count: 10, enabled: true },
};
