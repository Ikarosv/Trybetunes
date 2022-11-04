import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser, updateUser } from '../services/userAPI';

export default class ProfileEdit extends Component {
  state = {
    loading: true,
    userInfos: {},
    isDisabled: true,
  };

  async componentDidMount() {
    const userInfos = await getUser();
    this.setState({
      loading: false,
      userInfos,
    });
  }

  isEmpty = (...states) => !states.every((actual) => actual.length);

  handleChangeEdit = ({ target }) => {
    const { name: inputName, value } = target;
    this.setState(({ userInfos }) => ({
      userInfos: { ...userInfos, [inputName]: value },
    }), () => {
      const { userInfos } = this.state;
      const { name, email, image, description } = userInfos;
      this.setState({
        isDisabled: this.isEmpty(name, email, image, description),
      });
    });
  };

  saveButton = async () => {
    const { userInfos } = this.state;
    const { history } = this.props;
    this.setState({ loading: true });
    await updateUser(userInfos);
    this.setState({ loading: false });
    history.push('/profile');
  };

  render() {
    const { loading, userInfos, isDisabled } = this.state;
    const { name, email, image, description } = userInfos;
    return (
      <div data-testid="page-profile-edit">
        <Header />
        {
          loading ? <Loading /> : (
            <form>
              <label htmlFor="image">
                <img src={ image } alt={ name } />
                <input
                  type="url"
                  id="image"
                  data-testid="edit-input-image"
                  value={ image }
                  name="image"
                  onChange={ this.handleChangeEdit }
                  required
                />
              </label>
              <label htmlFor="name">
                Nome:
                <input
                  type="text"
                  id="name"
                  data-testid="edit-input-name"
                  value={ name }
                  name="name"
                  required
                  onChange={ this.handleChangeEdit }
                />
              </label>
              <label htmlFor="email">
                Email:
                <input
                  type="email"
                  id="email"
                  data-testid="edit-input-email"
                  value={ email }
                  name="email"
                  required
                  onChange={ this.handleChangeEdit }
                />
              </label>
              <label htmlFor="description">
                Description:
                <input
                  type="text"
                  id="description"
                  data-testid="edit-input-description"
                  value={ description }
                  name="description"
                  required
                  onChange={ this.handleChangeEdit }
                />
              </label>
              <button
                type="button"
                data-testid="edit-button-save"
                disabled={ isDisabled }
                onClick={ this.saveButton }
              >
                Salvar
              </button>
            </form>
          )
        }
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  history: PropTypes.shape().isRequired,
};
