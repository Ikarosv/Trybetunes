import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { addSong, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

export default class MusicCard extends Component {
  constructor(props) {
    super(props);
    const { isFavorite } = props;
    this.state = {
      check: isFavorite,
      loading: false,
    };
  }

  favoriteSong = async ({ target }) => {
    const { checked } = target;
    const { attFavorite, trackId } = this.props;
    this.setState({
      check: checked,
      loading: true,
    });
    if (checked) {
      await addSong({ ...this.props, isFavorite: true });
    } else {
      await removeSong({ ...this.props, isFavorite: false });
      attFavorite(trackId);
    }
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
            Favorita
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
  isFavorite: PropTypes.bool,
}.isRequired;

MusicCard.propTypes = {
  attFavorite: PropTypes.func,
};

MusicCard.defaultProps = {
  attFavorite: () => {},
};
