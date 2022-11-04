import React, { Component } from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';

export default class Album extends Component {
  state = {
    albumInfo: {},
    musics: [],
  };

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const [albumInfo, ...musics] = await getMusics(id);
    this.setState({
      albumInfo,
      musics,
    });
  }

  render() {
    const { albumInfo, musics } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <section>
          <h2 data-testid="album-name">{albumInfo.collectionName}</h2>
          <h3 data-testid="artist-name">{albumInfo.artistName}</h3>
        </section>
        <section>
          {
            musics.map((music, index) => (
              <MusicCard key={ music.trackName + index } { ...music } />
            ))
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
