import { GraphQLScalarType, Kind } from 'graphql';
import { DateTime } from 'luxon';
import { ApplicationError } from '../../error/ApplicationError';
import config from '../../configs/vars';

export const DateTimeScalarType = new GraphQLScalarType({
  name: 'DateTime',
  description: 'DateTime represents in ISO8601 format',
  serialize(value: DateTime) {
    return value.toISO();
  },
  parseValue(value) {
    return DateTime.fromISO(value).toUTC();
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.STRING) {
      return ast.value;
    }

    return null;
  },
});

export const PageSizeScalarType = new GraphQLScalarType({
  name: 'PageSize',
  description: 'Size for pagination',
  serialize(value: number) {
    return value;
  },
  parseValue(value) {
    if (value <= config.maxPageSize) {
      return value;
    } else {
      throw new ApplicationError('PageSize greater than max size');
    }
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      const value = parseInt(ast.value);
      if (value <= config.maxPageSize) {
        return value;
      } else {
        throw new ApplicationError('PageSize greater than max size page');
      }
    } else {
      throw new ApplicationError('size should be Integer');
    }
  },
});
