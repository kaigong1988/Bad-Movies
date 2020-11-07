import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
// import AnyComponent from './components/filename.jsx'
import Search from './components/Search.jsx';
import Movies from './components/Movies.jsx';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [{ deway: 'movies' }],
      favorites: [{ deway: 'favorites' }],
      showFaves: false,
    };

    // you might have to do something important here!
    this.getMovies = this.getMovies.bind(this);
    this.getDefaultMoives = this.getDefaultMoives.bind(this);
    this.swapFavorites = this.swapFavorites.bind(this);
    this.saveMovie = this.saveMovie.bind(this);
    this.deleteMovie = this.deleteMovie.bind(this);
    this.getFavMovies = this.getFavMovies.bind(this);
  }

  getDefaultMoives() {
    return axios
      .get('/default')
      .then((results) => {
        this.setState({ movies: results.data.results });
        console.log('ok');
        console.log(results.data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getFavMovies() {
    // get fav movies from our database
    return axios
      .get('/movies')
      .then((results) => {
        console.log(results.data);
        this.setState({
          favorites: results.data,
        });
      })
      .catch((err) => console.log(err));
  }

  componentDidMount() {
    this.getDefaultMoives();
    this.getFavMovies();
  }
  getMovies(genreID) {
    // ** get movies from TMDB
    // make an axios request to your server on the GET SEARCH endpoint
    console.log('genre id: ' + genreID + ' is selected!');
    return axios
      .get('/search', { params: { id: genreID } })
      .then((results) => {
        this.setState({ movies: results.data.results });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  saveMovie(movie) {
    // same as above but do something diff
    return axios
      .post('/save', movie)
      .then((response) => {
        consol.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  deleteMovie(movie) {
    // same as above but do something diff
    return axios
      .post('/delete', movie)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  swapFavorites() {
    //dont touch
    this.setState({
      showFaves: !this.state.showFaves,
    });
  }

  render() {
    return (
      <div className="app">
        <header className="navbar">
          <h1>Bad Movies</h1>
        </header>

        <div className="main">
          <Search
            swapFavorites={this.swapFavorites}
            showFaves={this.state.showFaves}
            getMovies={this.getMovies}
          />
          <Movies
            movies={
              this.state.showFaves ? this.state.favorites : this.state.movies
            }
            showFaves={this.state.showFaves}
            deleteMovie={this.deleteMovie}
            saveMovie={this.saveMovie}
            getFavMovies={this.getFavMovies}
          />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
