import { mapGender } from '../../src/utils/customer.utils';
import { IGender } from '../../src/types/graphql';

describe('Convert Gender from MDC', () => {
  it(`0 should null`, async () => {
    const result = mapGender(0);
    expect(result).toBeNull();
  });

  it(`1 should Male`, async () => {
    const result = mapGender(1);
    expect(result).toEqual(IGender.Male);
  });

  it(`2 should Female`, async () => {
    const result = mapGender(2);
    expect(result).toEqual(IGender.Female);
  });

  it(`3 should Other`, async () => {
    const result = mapGender(3);
    expect(result).toEqual(IGender.Other);
  });
});

describe('Convert Gender from ENUM', () => {
  it(`null should 0`, async () => {
    const result = mapGender(null);
    expect(result).toBeNull();
  });

  it(`Male should 1`, async () => {
    const result = mapGender(IGender.Male);
    expect(result).toEqual(1);
  });

  it(`Female should 2`, async () => {
    const result = mapGender(IGender.Female);
    expect(result).toEqual(2);
  });

  it(`Other should 3`, async () => {
    const result = mapGender(IGender.Other);
    expect(result).toEqual(3);
  });
});
