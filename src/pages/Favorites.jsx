import React, { Component } from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import MusicCard from '../components/MusicCard';
import '../components/styles/scss/Favorites.scss';
import Lines from '../components/styles/styledComponents/Lines';

const COLOR_LINES_TOP_LEFT = '#00D5E2';
const COLOR_LINES_BOTTOM_RIGHT = '#003BE5';
export default class Favorites extends Component {
  state = {
    favorites: [],
    loading: false,
  };

  async componentDidMount() {
    await this.loadFavoritesSongs();
  }

  setLoading = (isActive) => {
    this.setState({ loading: isActive });
  };

  loadFavoritesSongs = async () => {
    this.setLoading(true);
    const favorites = await getFavoriteSongs();
    this.setState({
      favorites,
    });
    this.setLoading(false);
  };

  reloadFavoritesSongs = (trackId) => {
    const { favorites } = this.state;
    const newArr = favorites;
    const index = newArr.findIndex((music) => music.trackId === trackId);
    newArr.splice(index, 1);
    this.setState({
      favorites: newArr,
    });
  };

  render() {
    const { favorites, loading } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        <section className="pageFavorites">
          <section className="horizontalHeader bgGradient">
            <h1>Musicas Favoritas</h1>
            <Lines
              className="max-height-and-width top-left"
              blur
              lineColor={ COLOR_LINES_TOP_LEFT }
            />
            <Lines
              className="max-height-and-width bottom-right-splited"
              blur
              lineColor={ COLOR_LINES_BOTTOM_RIGHT }
            />
            <span className="big-outlined-circle bottom-left-big-circle" />
            <span className="big-filled-circle top-right" />
          </section>
          <section className="favoritesMusics myMusics">
            {
              loading ? <Loading /> : (
                favorites.map((music, index) => (<MusicCard
                  key={ music.trackName + index }
                  { ...music }
                  isFavorite
                  attFavorite={ this.reloadFavoritesSongs }
                />))
              )
            }
          </section>
        </section>
      </div>
    );
  }
}
