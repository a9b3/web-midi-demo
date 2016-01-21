'use strict';

import './sound-meter.scss';

import React, { PropTypes } from 'react';
import { findDOMNode } from 'react-dom';

export default React.createClass({

  render() {
    const levels = {
      left: '70%',
      right: '80%',
    };

    return (
      <div className="sound-meter">
        <div className="label">
          Sam
        </div>

        <div className="meters">

          <div className="levels">
            <div className="level-indicator" style={{
              height: levels.left,
            }}>
            </div>
            <div className="level-indicator" style={{
              height: levels.right,
            }}>
            </div>
          </div>
        </div>
      </div>
    );
  },

});
