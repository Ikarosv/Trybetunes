import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

export default class MusicCard extends Component {
  state = {
    check: false,
    loading: false,
  };

  favoriteSong = async ({ target }) => {
    const { checked } = target;
    this.setState({
      check: checked,
    });
    this.setState({ loading: true });
    await addSong(this.props);
    this.setState({ loading: false });
  };

  render() {
    const { trackName, previewUrl, trackId } = this.props;
    const { check, loading } = this.state;
    return (
      <section>
        <h6>{trackName}</h6>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          {' '}
          <code>audio</code>
          .
        </audio>
        {loading ? <Loading /> : (
          <label htmlFor="favorite">
            <input
              id="favorite"
              type="checkbox"
              checked={ check }
              data-testid={ `checkbox-music-${trackId}` }
              onChange={ this.favoriteSong }
            />
          </label>
        )}
      </section>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string,
  previewUrl: PropTypes.string,
  trackId: PropTypes.number,
}.isRequired;
