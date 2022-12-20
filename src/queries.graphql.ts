import { gql } from "@apollo/client";

export const GET_ALL_CHARACTERS = gql`
  query getCharacters {
    characters {
      results {
        id
        name
        species
        image
        status
        location {
          id
          name
        }
      }
    }
  }
`;
