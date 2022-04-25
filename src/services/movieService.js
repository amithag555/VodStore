import omdbApi from "../omdbApi.js";

export const getMovieBySearchWord = async (_searchWord) => {
  return await omdbApi.get(`&s=${_searchWord}`);
};

export const getMovieByYear = async (_searchWord, _year) => {
  return await omdbApi.get(`&s=${_searchWord}&y=${_year}`);
};

export const getMovieById = async (_movieId) => {
  return await omdbApi.get(`&i=${_movieId}`);
};
