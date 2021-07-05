/**
 * @title example extension
 * @desc Example extension boilerplate.
 **/
import { gql } from 'apollo-server';

const typeDef = gql`
  type Example {
    message: String
  }

  extend type Query {
    example: Example
  }
`;

const resolver = {
  Query: {
    example: () => {
      return {
        message: 'this is example extension',
      };
    },
  },
};

export { typeDef, resolver };
