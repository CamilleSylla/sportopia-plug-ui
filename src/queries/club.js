import { gql } from "@apollo/client";

export const GET_CLUB_BY_ID = gql`
  query getClubByID($id: String!) {
    getClubByID(id: $id) {
      id
      name
      adress
      city
      zip
      email
      phone
    }
  }
`;
