const request = require('request');
const axios = require('axios');
const { apikey } = require('../../config/apikey.js');

// write out logic/functions required to query TheMovieDB.org

// FOR REFERENCE:
// https://www.themoviedb.org/account/signup
// https://developers.themoviedb.org/3/discover/movie-discover
// Get your API Key and save it in your config file

// Don't forget to export your functions and require them within your server file
let getGenres = () => {
  let options = {
    type: 'GET',
    url: `https://api.themoviedb.org/3/genre/movie/list?api_key=${apikey}&language=en-US`,
  };
  return axios(options);
};

let SearchGenreMovies = (genreID) => {
  let options = {
    type: 'GET',
    url: `https://api.themoviedb.org/3/discover/movie?api_key=${apikey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=25&with_genres=${genreID}&with_original_language=en`,
  };
  return axios(options);
};
let getMovies = () => {
  let options = {
    type: 'GET',
    url: `https://api.themoviedb.org/3/discover/movie?api_key=${apikey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&release_date.gte=2020-10-22`,
  };
  return axios(options);
};
module.exports.getMovies = getMovies;
module.exports.SearchGenreMovies = SearchGenreMovies;
module.exports.getGenres = getGenres;
