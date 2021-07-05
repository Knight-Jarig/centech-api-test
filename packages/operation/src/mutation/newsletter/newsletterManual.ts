import gql from 'graphql-tag';

export const newsletterManual = gql`
  mutation newsletterManual($email: String!, $gender: Gender!) {
    newsletter(email: $email, optional: {
      gender: $gender
    })
  }
`;
