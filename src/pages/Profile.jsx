import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';

export default class Profile extends Component {
  state = {
    loading: true,
    userInfos: {},
  };

  async componentDidMount() {
    const userInfos = await getUser();
    this.setState({
      loading: false,
      userInfos,
    });
  }

  render() {
    const { loading, userInfos } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        {
          loading ? <Loading /> : (
            <section>
              <img
                data-testid="profile-image"
                src={ userInfos.image }
                alt={ userInfos.name }
              />
              <Link to="/profile/edit">
                Editar perfil
              </Link>
              <h5>Nome</h5>
              <h6>{ userInfos.name }</h6>
              <h5>Email</h5>
              <h6>{ userInfos.email }</h6>
              <h5>Descrição</h5>
              <p>{userInfos.description}</p>
            </section>
          )
        }
      </div>
    );
  }
}
