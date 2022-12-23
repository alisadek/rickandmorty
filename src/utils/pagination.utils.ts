import { Character, Maybe } from "../__generated__/graphql";

export const getNumOfPages = (
  recordsPerPage: number,
  numOfRecords: number
): number => {
  return Math.ceil(numOfRecords / recordsPerPage);
};

export const getCharsPerPage = (
  characters: Maybe<Character>[],
  recordsPerPage: number,
  currentPage: number
) => {
  return characters.slice(
    recordsPerPage * currentPage - recordsPerPage,
    recordsPerPage * currentPage
  );
};
