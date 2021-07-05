import gql from 'graphql-tag';

export const vipList = gql`
  query vipList {
    vipList {
      status
      urls
    }
  }
`