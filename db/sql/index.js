const mysql = require('mysql');
const mysqlConfig = require('../../config.js');
const Sequelize = require('Sequelize');
const connection = mysql.createConnection(mysqlConfig);
const MY_SQL_PW = require('../../config/mysqlpw.js');

const db = new Sequelize('badmovies', 'root', MY_SQL_PW, {
  dialect: 'mysql',
});

const Movie = db.define('movie', {
  title: Sequelize.STRING,
  poster_path: Sequelize.STRING,
  release_date: Sequelize.STRING,
  vote_average: Sequelize.INTEGER,
});

const showMovies = () => {
  return Movie.findAll();
};

const saveMovie = (movie) => {
  let params = {
    title: movie.title,
    poster_path: movie.poster_path,
    release_date: movie.release_date,
    vote_average: movie.vote_average,
  };
  return Movie.create(params);
};

const deleteMovie = (movie) => {
  return Movie.destroy({
    where: {
      title: movie.title,
    },
  });
};
Movie.sync();
module.exports.db = db;
module.exports.showMovies = showMovies;
module.exports.saveMovie = saveMovie;
module.exports.deleteMovie = deleteMovie;
