import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../scss/Lines.scss';

export default class Lines extends Component {
  render() {
    const { className, blur, lineColor } = this.props;
    const styleLines = {
      backgroundColor: lineColor,
    };
    return (
      <div
        className={ `line-group ${className}` }
        style={ { filter: blur ? 'blur(4px)' : 'none' } }
      >
        <span className="line" style={ styleLines } />
        <span className="line" style={ styleLines } />
        <span className="line" style={ styleLines } />
        <span className="line" style={ styleLines } />
      </div>
    );
  }
}

Lines.propTypes = {
  className: PropTypes.string,
  blur: PropTypes.bool,
  lineColor: PropTypes.string.isRequired,
};

Lines.defaultProps = {
  className: '',
  blur: false,
};
