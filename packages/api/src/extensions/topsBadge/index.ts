/**
 * @title tops badge
 * @desc add seasonal badge and promotion badge in product type for Tops
 **/
import { gql } from 'apollo-server';

const typeDef = gql`
  extend type Product {
    badge: [TopsBadge]
  }

  type TopsBadge {
    label: String
    image: String
  }
`;

const resolver = {
  Product: {
    badge: _source => {
      return [
        {
          label: '11111',
          image: 'aaaaa',
        },
      ];
    },
  },
};

export { typeDef, resolver };
