import { gql } from "@apollo/client";

export const GET_CHARACTERS = gql`
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
export const GET_CHARACTER = gql`
  query getCharacters($id: ID!) {
    character(id: $id) {
      id
      name
      status
      species
      type
      gender
      origin {
        name
      }
      location {
        name
      }
      image
      created
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

export const GET_LOCATIONS = gql`
  query getLocations($name: String) {
    locations(filter: { name: $name }) {
      results {
        name
        dimension
        created
        type
        residents {
          name
          id
          image
          status
          species
          gender
          origin {
            id
            name
          }
        }
      }
      info {
        count
        pages
      }
    }
  }
`;
