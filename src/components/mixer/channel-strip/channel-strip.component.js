'use strict';

import './channel-strip.scss';

import React, { PropTypes } from 'react';
import { findDOMNode } from 'react-dom';

import SoundMeterComponent from '../sound-meter/sound-meter.component.js';

export default React.createClass({

  render() {
    const label = 'testasjdhasuidhiasdhiuashd';

    return (
      <div className="channel-strip">
        <div className="label">
          {label}
        </div>

        <div className="sound-meter">
          <div className="controls">
            <div className="button mute on">
              Mute
            </div>
          </div>

          <div className="level-bars">
            <div className="level-indicator">
              <div className="level-indicator-bar">
              </div>
            </div>
            <div className="level-indicator">
              <div className="level-indicator-bar">
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },

});
