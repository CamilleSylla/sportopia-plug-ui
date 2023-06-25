import { gql } from "@apollo/client";

export const ADMIN_USER_CLUB = gql`
  query findByUserId {
    findByUserId {
      id
      name
      adress
      city
      zip
      email
      phone
      createdAt
      sport {
        name
      }
    }
  }
`;
