import gql from 'graphql-tag';

export const deleteGiftWrapMessage = gql`
  mutation deleteGiftWrapMessage($input: DeleteGiftWrapMessageInput!) {
    deleteGiftWrapMessage(input: $input) {
      message
    }
  }
`;
