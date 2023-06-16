import { gql } from "@apollo/client";

export const ALL_SPORTS = gql`
  query getAllSports {
    sports {
      id
      name
    }
  }
`;
