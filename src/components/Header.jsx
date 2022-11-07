import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Loading from './Loading';
import { getUser } from '../services/userAPI';
import Logo from './Logo';
import './styles/scss/Header.scss';
import { Search, Favoritas, Perfil } from '../assets/images/Exportation';

export default class Header extends Component {
  state = {
    user: {},
    loading: false,
  };

  async componentDidMount() {
    this.setState({ loading: true });
    const user = await getUser();
    this.setState({
      user,
      loading: false,
    });
  }

  render() {
    const { user, loading } = this.state;
    return (
      <header className="Header" data-testid="header-component">
        <Logo />
        <nav className="navegation">
          <NavLink
            to="/search"
            className="navLink"
            activeClassName="navLinkActive"
            data-testid="link-to-search"
          >
            <Search />
            Pesquisar
          </NavLink>
          <div>
            <NavLink
              to="/favorites"
              className="navLink"
              activeClassName="navLinkActive"
              data-testid="link-to-favorites"
            >
              <Favoritas />
              Favoritas
            </NavLink>
          </div>
          <div>
            <NavLink
              to="/profile"
              className="navLink"
              activeClassName="navLinkActive"
              data-testid="link-to-profile"
            >
              <Perfil />
              Perfil
            </NavLink>
          </div>
        </nav>
        {
          loading ? <Loading col={ false } /> : (
            <div className="userInfos">
              <img src={ user.image } alt={ user.name } />
              <h5 data-testid="header-user-name">{user.name}</h5>
            </div>
          )
        }
      </header>
    );
  }
}
