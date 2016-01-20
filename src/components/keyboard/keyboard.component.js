'use strict';

import './keyboard.scss';

import React, { PropTypes } from 'react';
import { findDOMNode } from 'react-dom';

import PowerSwitchComponent from 'components/power-switch/power-switch.component.js';

function isBlackKey(i) {
  const blackKeys = [1, 3, 6, 8, 10];
  const compare = i % 12;
  return ~blackKeys.indexOf(compare);
}

export default React.createClass({

  renderKey(i, keys) {
    let className = '';

    if (isBlackKey(i)) {
      className += 'blackkey'
    } else {
      className += 'whitekey';
    }

    if (keys.some(key => key === i + 48)) {
      className += ' pressed';
    }

    return <div className={className}></div>
  },

  renderKeys(octaves, keys = []) {
    // 48 - 60
    const keyLength = octaves * 12;

    let keyElems = [];
    for (let i = 0; i < keyLength; i++) {
      keyElems.push(this.renderKey(i, keys));
    }

    return (
      <div className="keys">
        {(() => keyElems.map(elem => elem))()}
      </div>
    );
  },

  render() {
    const activeNotes = this.props.activeNotes;
    const on = this.props.on;
    const octaves = 2;

    return (
      <div className="keyboard">
        <div className="dashboard">
          <PowerSwitchComponent on={on}></PowerSwitchComponent>
        </div>
        <div className="keys-wrapper">
          {this.renderKeys(octaves, activeNotes)}
        </div>
      </div>
    );
  },

});
