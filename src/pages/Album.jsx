import React, { Component } from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

export default class Album extends Component {
  state = {
    albumInfo: {},
    musics: [],
    favoritesSongs: {},
  };

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const [albumInfo, ...musics] = await getMusics(id);
    const favoritesSongs = await getFavoriteSongs();
    this.setState({
      albumInfo,
      musics,
      favoritesSongs,
    });
  }

  async componentDidUpdate() {
    const favoritesSongs = await getFavoriteSongs();
    this.setState({
      favoritesSongs,
    });
  }

  render() {
    const { albumInfo, musics, favoritesSongs } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <section>
          <h2 data-testid="album-name">{albumInfo.collectionName}</h2>
          <h3 data-testid="artist-name">{albumInfo.artistName}</h3>
        </section>
        <section>
          {
            musics.map((music, index) => {
              const favorite = !!favoritesSongs
                .find((song) => song.trackId === music.trackId);

              return (<MusicCard
                key={ music.trackName + index }
                isFavorite={ favorite }
                { ...music }
              />);
            })
          }
        </section>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.number,
    }),
  }),
}.isRequired;
