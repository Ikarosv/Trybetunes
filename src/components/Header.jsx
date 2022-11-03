import React, { Component } from 'react';
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
      loading ? <Loading /> : (
        <header data-testid="header-component">
          <h5 data-testid="header-user-name">{user.name}</h5>
        </header>
      )
    );
  }
}
