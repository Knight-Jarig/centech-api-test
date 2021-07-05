import CommomResolver from './commonResolvers';
import { version } from '../../../package.json';
import { DateTime } from 'luxon';

describe('CommomResolver', () => {
  const queryHello = CommomResolver.Query.hello as Function;
  const queryVersion = CommomResolver.Query.version as Function;
  const pageSize = CommomResolver.PageSize;
  const dateTime = CommomResolver.DateTime;
  it('Query hello', () => {
    expect(queryHello()).toBe('hello');
  });

  it('Query version', () => {
    expect(queryVersion()).toBe(version);
  });

  it('PageSize', () => {
    expect(pageSize.name).toBe('PageSize');
    expect(pageSize.description).toBe('Size for pagination');
    expect(pageSize.serialize(1)).toBe(1);
    expect(pageSize.parseValue(1)).toBe(1);
    expect(() => {
      pageSize.parseValue(201);
    }).toThrow();
    expect(pageSize.parseLiteral({ kind: 'IntValue', value: '1' }, {})).toBe(1);
    expect(() => {
      pageSize.parseLiteral({ kind: 'IntValue', value: '201' }, {});
    }).toThrow();
    expect(() => {
      pageSize.parseLiteral({ kind: 'StringValue', value: '1' }, {});
    }).toThrow();
  });

  it('DateTime', () => {
    const now = DateTime.fromISO(new Date().toISOString());
    expect(dateTime.name).toBe('DateTime');
    expect(dateTime.description).toBe('DateTime represents in ISO8601 format');
    expect(dateTime.serialize(now)).toBe(now.toISO());
    expect(dateTime.parseValue(now)).toEqual(now.toUTC());
    expect(dateTime.parseLiteral({ kind: 'StringValue', value: now.toString() }, {})).toBe(now.toString());
    expect(dateTime.parseLiteral({ kind: 'IntValue', value: now.toString() }, {})).toBe(null);
  });
});
