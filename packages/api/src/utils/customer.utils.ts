import { IGender } from '../types/graphql';

const genderMapper = {
  0: null,
  1: IGender.Male,
  2: IGender.Female,
  3: IGender.Other,
  [IGender.Male]: 1,
  [IGender.Female]: 2,
  [IGender.Other]: 3,
};

export function mapGender(gender) {
  return genderMapper[gender] || null;
}
