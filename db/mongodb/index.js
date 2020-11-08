//
const mongoose = require('mongoose');
if (process.env.MONGODB_URI) {
  mongoose.connect(process.env.MONGODB_URI);
} else {
  mongoose.connect('mongodb://localhost:27017/badmovies', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

const db = mongoose.connection;

mongoose.Promise = Promise;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', () => {
  console.log('Connected to db...');
});

const movieSchema = new mongoose.Schema({
  title: String,
  poster_path: String,
  release_date: String,
  vote_average: Number,
});

const Movie = mongoose.model('Movie', movieSchema);

const showMovies = () => {
  return Movie.find();
};

const save = (movie) => {
  let params = {
    title: movie.title,
    poster_path: movie.poster_path,
    release_date: movie.release_date,
    vote_average: movie.vote_average,
  };
  return Movie.create(params);
};

const deleteMovie = (movie) => {
  return Movie.findOneAndDelete({ title: movie.title });
};
module.exports.showMovies = showMovies;
module.exports.deleteMovie = deleteMovie;
module.exports.save = save;
module.exports.db = db;
