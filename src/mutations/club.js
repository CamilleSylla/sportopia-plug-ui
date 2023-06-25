import { gql } from "@apollo/client";

export const CREATE_CLUB = gql`
  mutation createClub($club: CreateClubInput!, $sportId: String!) {
    createClub(club: $club, sportId: $sportId) {
      id
      name
    }
  }
`;
