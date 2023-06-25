import { gql } from "@apollo/client";

export const SIGN_IN = gql`
  query signIn($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
      id
      lastname
      firstname
      email
      accessToken
      refreshToken
      club {
        id
        name
      }
    }
  }
`;
