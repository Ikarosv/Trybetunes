import React, { Component } from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import '../components/styles/scss/Album.scss';
import Lines from '../components/styles/styledComponents/Lines';

const COLOR_LINES_TOP_LEFT = '#00D5E2';
const COLOR_LINES_BOTTOM_RIGHT = '#003BE5';
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
          <section className="horizontalHeader bgGradientInverted">
            <img
              className="artistImage"
              src={ albumInfo.artworkUrl100 }
              alt={ albumInfo.artistName }
            />
            <Lines
              className="max-height-and-width bottom-right"
              blur
              lineColor={ COLOR_LINES_TOP_LEFT }
            />
            <Lines
              className="max-height-and-width top-left"
              blur
              lineColor={ COLOR_LINES_BOTTOM_RIGHT }
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
          <section className="Musics myMusics">
            {
              musics.map((music) => {
                const favorite = favoritesSongs
                  .some((song) => song.trackId === music.trackId);
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
