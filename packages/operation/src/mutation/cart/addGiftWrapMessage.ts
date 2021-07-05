import gql from 'graphql-tag';

export const addGiftWrapMessage = gql`
  mutation addGiftWrapMessage($input: AddGiftWrapMessageInput!) {
    addGiftWrapMessage(input: $input) {
      message
    }
  }
`;
