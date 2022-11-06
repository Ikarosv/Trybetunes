import React, { Component } from 'react';
import './styles/scss/Logo.scss';
import svgTunes from '../assets/images/Group 3.svg';

export default class Logo extends Component {
  render() {
    return (
      <div className="logo">
        <div className="trybe-logo flex-align-end">
          <span className="trybe">trybe</span>
          <img src={ svgTunes } alt="Tunes" />
        </div>
        <span className="tunes">tunes</span>
      </div>
    );
  }
}
