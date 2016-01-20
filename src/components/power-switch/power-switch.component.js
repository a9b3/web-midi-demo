'use strict';

import './power-switch.scss';

import React, { PropTypes } from 'react';
import { findDOMNode } from 'react-dom';

export default React.createClass({

  renderSwitch(on) {
    let className = 'power-switch';
    if (on) {
      className += ' on';
    }

    return (
      <div className={className}>
        <div className="light">
        </div>
        <div className="button">
        </div>
      </div>
    );
  },

  render() {
    const on = this.props.on;
    return this.renderSwitch(on);
  },

});
