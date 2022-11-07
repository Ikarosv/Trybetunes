import React, { Component } from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import MusicCard from '../components/MusicCard';

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
      </div>
    );
  }
}
