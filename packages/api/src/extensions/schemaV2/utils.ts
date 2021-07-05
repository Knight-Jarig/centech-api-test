export function min(list: number[]): number {
  return list.reduce((minimum, item) => Math.min(minimum, item), 0);
}

export function minBy<T>(list: T[], prop: (item: T) => number): T | null {
  if (list.length === 0) return null;

  return list.reduce((minimum, item) => (prop(minimum) < prop(item) ? minimum : item));
}
export function max(list: number[]): number {
  return list.reduce((minimum, item) => Math.max(minimum, item), 0);
}

export function maxBy<T>(list: T[], prop: (item: T) => number): T | null {
  if (list.length === 0) return null;

  return list.reduce((maximum, item) => (prop(maximum) > prop(item) ? maximum : item));
}

export function first<T>(list: T[]): T {
  if (list.length === 0) {
    throw new Error('List is empty');
  }

  return list[0];
}

export function last<T>(list: T[]): T {
  if (list.length === 0) {
    throw new Error('List is empty');
  }

  return list[list.length - 1];
}

export function uniq<T>(list: T[]): T[] {
  return list.reduce(
    (all, item) => (all.some(previousItem => previousItem === item) ? all : all.concat(item)),
    [] as T[],
  );
}

export function uniqBy<T, R>(list: T[], prop: (item: T) => R): T[] {
  if (list.length === 0) return [];

  return list.reduce(
    (all, item) => (all.some(previousItem => prop(previousItem) === prop(item)) ? all : all.concat(item)),
    [] as T[],
  );
}

export type FromFieldResolver = any;
