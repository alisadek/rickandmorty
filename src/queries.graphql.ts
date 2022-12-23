import { gql } from "@apollo/client";

export const GET_ALL_CHARACTERS = gql`
  query getCharacters($page: Int) {
    characters(page: $page) {
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

export const GET_EPISODES = gql`
  query getEpisodes($name: String, $episode: String) {
    episodes(filter: { name: $name, episode: $episode }) {
      results {
        id
        name
        air_date
        created
        episode
        characters {
          id
          name
          species
          status
          image
        }
      }
    }
  }
`;
