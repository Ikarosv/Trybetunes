import React, { Component } from 'react';
import PropTypes from 'prop-types';
import svgLoading from '../assets/images/Vector.svg';
import './styles/scss/Loading.scss';

export default class Loading extends Component {
  render() {
    const { col } = this.props;
    const column = col ? 'Column' : '';
    const color = col ? '#C0C3C9' : '#003BE5';
    return (
      <div
        className={ `Loading ${column}` }
        style={ { color } }
      >
        <img src={ svgLoading } alt="Loading" />
        <h2>Carregando...</h2>
      </div>
    );
  }
}

Loading.propTypes = {
  col: PropTypes.bool,
};

Loading.defaultProps = {
  col: true,
};
