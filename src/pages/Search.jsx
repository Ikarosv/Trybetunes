import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import { Search as SvgSearch, Error as NotFound } from '../assets/images/Exportation';
import Lines from '../components/styles/styledComponents/Lines';
import '../components/styles/scss/Search.scss';

const COLOR_LINES_TOP_LEFT = '#00D5E2';
const COLOR_LINES_BOTTOM_RIGHT = '#003BE5';
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
        !(albums.length) ? (
          <div className="Error">
            <NotFound />
            <h1>Nenhum álbum foi encontrado</h1>
          </div>
        ) : (
          <section className="all-results">
            <h3>
              Resultado de álbuns de
              {' '}
              {artistSearched}
              :
            </h3>
            <section className="Results">
              {
                albums.map((infos) => (
                  <Link
                    key={ `${infos.trackId}` }
                    to={ `/album/${infos.collectionId}` }
                    data-testid={ `link-to-album-${infos.collectionId}` }
                    className="Card"
                  >
                    <section>
                      <img src={ infos.artworkUrl100 } alt={ infos.collectionName } />
                      <h6>{infos.collectionName}</h6>
                      <span>{infos.artistName}</span>
                    </section>
                  </Link>
                ))
              }
            </section>
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
      <div className="pageSearch" data-testid="page-search">
        <Header />
        <section>
          <div className="searchForm bgGradient">
            <form onSubmit={ this.handleSearch }>
              <label htmlFor="search">
                {/* eslint-disable-next-line react/jsx-max-depth */}
                <input
                  type="text"
                  id="search"
                  name="artistName"
                  value={ artistName }
                  onChange={ this.handleChange }
                  data-testid="search-artist-input"
                  placeholder="Nome do Artista"
                />
                {/* eslint-disable-next-line react/jsx-max-depth */}
                <SvgSearch />
              </label>
              <button
                type="submit"
                data-testid="search-artist-button"
                disabled={ disabled }
                onClick={ this.handleSearch }
              >
                Procurar
              </button>
            </form>
            <Lines
              className="max-height-and-width top-left animated"
              blur
              lineColor={ COLOR_LINES_TOP_LEFT }
            />
            <Lines
              className="max-height-and-width bottom-right-splited animated"
              blur
              lineColor={ COLOR_LINES_BOTTOM_RIGHT }
            />
            <span className="big-filled-circle" />
            <span className="big-outlined-circle top-right-splited" />
          </div>
          <div className="w-100 align-justify-center">
            {
              loading ? <Loading /> : result
            }
          </div>
        </section>
      </div>
    );
  }
}
