import { gql } from "@apollo/client";

export const GET_ALL_CHARACTERS = gql`
  query getCharacters($page: Int, $name: String) {
    characters(page: $page, filter: { name: $name }) {
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
      info {
        count
        pages
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
      info {
        count
        pages
      }
    }
  }
`;
