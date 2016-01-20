'use strict';

import './drum-machine.scss';

import React, { PropTypes } from 'react';
import { findDOMNode } from 'react-dom';

import PowerSwitchComponent from 'components/power-switch/power-switch.component.js';

export default React.createClass({

  renderPad(i, activeNotes) {
    let className = 'drumpad';

    if (~activeNotes.indexOf(i + 48)) {
      className += ' pressed';
    }

    return <div className={className}>
    </div>;
  },

  renderPads(rows, columns, activeNotes) {
    const rowElems = [];

    let counter = 0;
    for (let i = 0; i < rows; i++) {
      const colElem = [];

      for (let j = 0; j < columns; j++) {
        colElem.push(this.renderPad(counter++, activeNotes));
      }

      rowElems.push(
        <div className="drumpad-row">
          {colElem}
        </div>
      );
    }

    return rowElems;
  },

  render() {
    const activeNotes = this.props.activeNotes;
    const on = this.props.on;

    const rows = 4;
    const cols = 4;

    return (
      <div className="drum-machine">
        <div className="wooden-panel">
        </div>

        <div className="mid-section">
          <div className="sidepanel">
            <PowerSwitchComponent on={on}></PowerSwitchComponent>
          </div>

          <div className="drumpads">
            {this.renderPads(rows, cols, activeNotes)}
          </div>
        </div>

        <div className="wooden-panel">
        </div>
      </div>
    );
  },

});
