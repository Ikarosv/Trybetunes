import React, { Component } from 'react';
import Header from '../components/Header';

const MIN_LENGTH_NAME = 2;
export default class Search extends Component {
  state = {
    artistName: '',
    disabled: true,
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => {
      const { artistName } = this.state;
      this.setState({
        disabled: artistName.length < MIN_LENGTH_NAME,
      });
    });
  };

  render() {
    const { artistName, disabled } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <input
            type="text"
            name="artistName"
            value={ artistName }
            onChange={ this.handleChange }
            data-testid="search-artist-input"
            placeholder="Artist Name"
          />
          <button
            type="button"
            data-testid="search-artist-button"
            disabled={ disabled }
          >
            Pesquisar

          </button>
        </form>
      </div>
    );
  }
}
