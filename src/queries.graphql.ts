import { gql } from "@apollo/client";

export const GET_ALL_CHARACTERS = gql`
  query getCharacters(
    $page: Int
    $name: String
    $status: String
    $species: String
    $gender: String
  ) {
    characters(
      page: $page
      filter: {
        name: $name
        status: $status
        species: $species
        gender: $gender
      }
    ) {
      results {
        id
        name
        species
        image
        gender
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
