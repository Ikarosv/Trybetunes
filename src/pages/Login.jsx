import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loading from '../components/Loading';
import { createUser } from '../services/userAPI';

const MIN_LENGTH_NAME = 3;

export default class Login extends Component {
  state = {
    name: '',
    disabled: true,
    loading: false,
  };

  handleChange = ({ target }) => {
    const { name: inputName, value } = target;
    this.setState({
      [inputName]: value,
    }, () => {
      const { name } = this.state;
      this.setState({
        disabled: name.length < MIN_LENGTH_NAME,
      });
    });
  };

  handleClick = async () => {
    const { name } = this.state;
    const { history } = this.props;
    this.setState({ loading: true });
    await createUser({ name });
    this.setState({ loading: false });
    history.push('/search');
  };

  render() {
    const { name, disabled, loading } = this.state;
    return (
      <div data-testid="page-login">
        {
          loading ? <Loading /> : (
            <form>
              <input
                type="text"
                data-testid="login-name-input"
                placeholder="Nome"
                name="name"
                value={ name }
                onChange={ this.handleChange }
              />
              <button
                type="button"
                data-testid="login-submit-button"
                disabled={ disabled }
                onClick={ this.handleClick }
              >
                Entrar

              </button>
            </form>
          )
        }
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape().isRequired,
};
