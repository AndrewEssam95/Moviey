import axios from "axios";

const apiKey = "28dc5194082af9da4c8348ca1085d8b2";
const baseURL = "https://api.themoviedb.org/3";
export const fallbackPersonImage =
  "https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png";

const trendingMoviesEndpoint = `${baseURL}/trending/movie/day?api_key=${apiKey}`;
const upcomingMoviesEndpoint = `${baseURL}/movie/upcoming?api_key=${apiKey}`;
const topRatedMoviesEndpoint = `${baseURL}/movie/top_rated?api_key=${apiKey}`;
const searchMovieEndpoint = `${baseURL}/search/movie?api_key=${apiKey}`;

const movieDetailsEndpoint = (id) => `${baseURL}/movie/${id}?api_key=${apiKey}`;
const movieCreditsEndpoint = (id) =>
  `${baseURL}/movie/${id}/credits?api_key=${apiKey}`;
const similarMoviesEndpoint = (id) =>
  `${baseURL}/movie/${id}/similar?api_key=${apiKey}`;
const personDetailsEndpoint = (id) =>
  `${baseURL}/person/${id}?api_key=${apiKey}`;
const personMoviesEndpoint = (id) =>
  `${baseURL}/person/${id}/movie_credits?api_key=${apiKey}`;

const apiCall = async (endpoint, params) => {
  const options = {
    method: "GET",
    url: endpoint,
    params: params ? params : {},
  };

  try {
    const response = await axios.request(endpoint);
    return response.data;
  } catch (error) {
    console.log("error =>", error);
    return {};
  }
};

export const image500 = (path) =>
  path ? `https://image.tmdb.org/t/p/w500${path}` : null;
export const image342 = (path) =>
  path ? `https://image.tmdb.org/t/p/w342${path}` : null;
export const image185 = (path) =>
  path ? `https://image.tmdb.org/t/p/w185${path}` : null;

export const fetchTrendingMovies = () => {
  return apiCall(trendingMoviesEndpoint);
};
export const fetchUpcomingMovies = () => {
  return apiCall(upcomingMoviesEndpoint);
};
export const fetchTopRatedMovies = () => {
  return apiCall(topRatedMoviesEndpoint);
};
export const fetchMoviesDetails = (id) => {
  return apiCall(movieDetailsEndpoint(id));
};
export const fetchMovieCredits = (id) => {
  return apiCall(movieCreditsEndpoint(id));
};
export const fetchSimilarMovies = (id) => {
  return apiCall(similarMoviesEndpoint(id));
};
export const fetchPersonDetails = (id) => {
  return apiCall(personDetailsEndpoint(id));
};
export const fetchPersonMovies = (id) => {
  return apiCall(personMoviesEndpoint(id));
};
export const searchMovies = (params) => {
  return apiCall(searchMovieEndpoint, params);
};
