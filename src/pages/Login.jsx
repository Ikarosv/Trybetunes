import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loading from '../components/Loading';
import { createUser } from '../services/userAPI';
import Lines from '../components/styles/styledComponents/Lines';
import '../components/styles/scss/Login.scss';
import Logo from '../components/Logo';

const MIN_LENGTH_NAME = 3;
const COLOR_LINES_TOP_LEFT = '#00D5E2';
const COLOR_LINES_BOTTOM_RIGHT = '#003BE5';
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
      <div data-testid="page-login" className="loginPage bgGradient align-justify-center">
        {
          loading ? <Loading /> : (
            <form
              className="form-login align-justify-center"
              onSubmit={ this.handleClick }
            >
              <Logo />
              <input
                type="text"
                data-testid="login-name-input"
                placeholder="qual é o seu nome?"
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
        <Lines
          className="max-height top-left"
          blur
          lineColor={ COLOR_LINES_TOP_LEFT }
        />
        <Lines
          className="max-height bottom-right"
          blur
          lineColor={ COLOR_LINES_BOTTOM_RIGHT }
        />
        <span className="big-outlined-circle full-bottom-left" />
        <span className="big-filled-circle top-right" />
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape().isRequired,
};
