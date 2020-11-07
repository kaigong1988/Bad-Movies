import React from 'react';
import axios from 'axios';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      genres: [],
    };
    this.getGenres = this.getGenres.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  getGenres() {
    //make an axios request in this component to get the list of genres from your endpoint GET GENRES
    return axios
      .get('/genres')
      .then((results) => {
        this.setState({ genres: results.data.genres });
        console.log('ok');
        console.log(results);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  handleChange(e) {
    this.setState({ value: e.target.value });
  }
  componentWillMount() {
    this.getGenres();
  }
  render() {
    return (
      <div className="search">
        <button
          onClick={() => {
            this.props.swapFavorites();
          }}
        >
          {this.props.showFaves ? 'Show Results' : 'Show Favorites'}
        </button>
        <br />
        <br />

        {/* Make the select options dynamic from genres !!! */}
        {/* How can you tell which option has been selected from here? */}

        <select onChange={this.handleChange} value={this.state.value}>
          {this.state.genres.map((genre, index) => {
            return (
              <option
                onClick={() => console.log(genre.id)}
                key={index}
                id={genre.id}
                value={genre.id}
              >
                {genre.name}
              </option>
            );
          })}
        </select>
        <br />
        <br />

        <button onClick={() => this.props.getMovies(this.state.value)}>
          Search
        </button>
      </div>
    );
  }
}

export default Search;
