import gql from 'graphql-tag';

// TODO: Convert the variable name format to camel case
export const loginMutation = gql`
  mutation loginMutation(
    $username: String!
    $password: String!
    $guestToken: String
    $is_jwt: Boolean
  ) {
    login(
      input: {
        username: $username
        password: $password
        guestToken: $guestToken
        is_jwt: $is_jwt 
      }
    ) {
      token
    }
  }
`;
