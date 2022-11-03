import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

const MIN_LENGTH_NAME = 2;
export default class Search extends Component {
  state = {
    artistName: '',
    disabled: true,
    loading: false,
    albums: [],
    artistSearched: '',
    result: '',
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

  clearInput = () => {
    this.setState({
      artistName: '',
    });
  };

  setLoading = (isLoading) => {
    this.setState({
      loading: isLoading,
    });
  };

  loadAlbums = () => {
    const { albums, artistSearched } = this.state;
    this.setState({
      result: (
        !(albums.length) ? <h1>Nenhum álbum foi encontrado</h1> : (
          <section>
            <h3>
              Resultado de álbuns de:
              {' '}
              {artistSearched}
            </h3>
            {
              albums.map((infos) => (
                <section key={ infos.artistId }>
                  <img src={ infos.artworkUrl100 } alt={ infos.collectionName } />
                  <h6>{infos.collectionName}</h6>
                  <Link
                    to={ `/album/${infos.collectionId}` }
                    data-testid={ `link-to-album-${infos.collectionId}` }
                  >
                    Ver Álbum
                  </Link>
                </section>
              ))
            }
          </section>
        )),
    });
  };

  handleSearch = async (event) => {
    event.preventDefault();
    const { artistName } = this.state;
    this.setLoading(true);
    const albumsResult = await searchAlbumsAPI(artistName);
    this.setState({
      albums: albumsResult,
      artistSearched: artistName,
    }, this.loadAlbums);
    this.clearInput();
    this.setLoading(false);
  };

  render() {
    const { artistName, disabled, loading, result } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        {
          loading ? <Loading /> : (
            <form onSubmit={ this.handleSearch }>
              <input
                type="text"
                name="artistName"
                value={ artistName }
                onChange={ this.handleChange }
                data-testid="search-artist-input"
                placeholder="Nome do Artista"
              />
              <button
                type="submit"
                data-testid="search-artist-button"
                disabled={ disabled }
                onClick={ this.handleSearch }
              >
                Pesquisar

              </button>
            </form>
          )
        }
        {
          result
        }
      </div>
    );
  }
}
