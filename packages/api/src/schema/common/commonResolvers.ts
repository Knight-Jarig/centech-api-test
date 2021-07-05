import GraphQLJSON from 'graphql-type-json';
import { IQueryResolvers } from '../../types/graphql';
import { version } from '../../configs/version';
import { DateTimeScalarType, PageSizeScalarType } from '../../extensions/schemaV2/scalars';

const Query: IQueryResolvers = {
  hello(): string {
    return 'hello';
  },
  version(): string {
    return version;
  },
};

export default {
  Query,
  JSON: GraphQLJSON,
  DateTime: DateTimeScalarType,
  PageSize: PageSizeScalarType,
};
