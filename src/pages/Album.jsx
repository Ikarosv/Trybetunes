import React, { Component } from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import '../components/styles/scss/Album.scss';

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
        <section className="albumPage">
          <section className="horizontalHeader bgGradient">
            <img
              className="artistImage"
              src={ albumInfo.artworkUrl100 }
              alt={ albumInfo.artistName }
            />
            <div>
              <h2
                className="albumName"
                data-testid="album-name"
              >
                {albumInfo.collectionName}

              </h2>
              <h3
                className="artistName"
                data-testid="artist-name"
              >
                {albumInfo.artistName}

              </h3>
            </div>
          </section>
          <section>
            {
              musics.map((music) => {
                const favorite = !!favoritesSongs
                  .find((song) => song.trackId === music.trackId);
                return (<MusicCard
                  key={ music.trackId }
                  isFavorite={ favorite }
                  { ...music }
                />);
              })
            }
          </section>
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
