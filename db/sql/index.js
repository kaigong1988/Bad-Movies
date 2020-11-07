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
  url: Sequelize.STRING,
  year: Sequelize.STRING,
  rating: Sequelize.INTEGER,
});

Movie.sync();
module.exports.db = db;
