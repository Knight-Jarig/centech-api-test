import gql from 'graphql-tag';

export const restoreShippingAssignment = gql`
  mutation restoreShippingAssignment($input: RestoreShippingAssignmentInput!){
    restoreShippingAssignment(input: $input) {
      message
    }
  }
`;


