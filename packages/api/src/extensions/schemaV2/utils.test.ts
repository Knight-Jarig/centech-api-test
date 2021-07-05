import { min, minBy, max, maxBy, first, last, uniq, uniqBy } from './utils';

describe('utils', () => {
  const input = [1, 1, 2, 3];

  it('min function should run properly', async () => {
    const result = await min(input);
    expect(result).toEqual(0);
  });

  it('minBy function should run properly', async () => {
    const result = await minBy(input, e => e);
    expect(result).toEqual(1);
  });

  it('max function should run properly', async () => {
    const result = await max(input);
    expect(result).toEqual(3);
  });

  it('maxBy function should run properly', async () => {
    const result = await maxBy(input, e => e);
    expect(result).toEqual(3);
  });

  it('first function should run properly', async () => {
    const result = await first(input);
    expect(result).toEqual(1);
  });

  it('last function should run properly', async () => {
    const result = await last(input);
    expect(result).toEqual(3);
  });

  it('uniq function should run properly', async () => {
    const result = await uniq(input);
    expect(result).toEqual([1, 2, 3]);
  });

  it('uniqBy function should run properly', async () => {
    const result = await uniqBy(input, e => e);
    expect(result).toEqual([1, 2, 3]);
  });
});
