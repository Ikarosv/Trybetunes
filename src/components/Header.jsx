import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Loading from './Loading';
import { getUser } from '../services/userAPI';

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
      <header data-testid="header-component">
        {
          loading ? <Loading /> : (
            <h5 data-testid="header-user-name">{user.name}</h5>
          )
        }
        <nav>
          <NavLink
            to="/search"
            activeClassName="navLinkActive"
            data-testid="link-to-search"
          >
            Search
          </NavLink>
          <NavLink
            to="/favorites"
            activeClassName="navLinkActive"
            data-testid="link-to-favorites"
          >
            Favorites
          </NavLink>
          <NavLink
            to="/profile"
            activeClassName="navLinkActive"
            data-testid="link-to-profile"
          >
            Profile
          </NavLink>
        </nav>
      </header>
    );
  }
}
