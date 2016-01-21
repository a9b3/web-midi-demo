'use strict';

import './channel-strip.scss';

import React, { PropTypes } from 'react';
import { findDOMNode } from 'react-dom';

import SoundMeterComponent from '../sound-meter/sound-meter.component.js';
import MidiDeviceOptionsComponent from 'components/midi-device-options/midi-device-options.component.js';

function levelToPercent(value) {
  return value;
}

export default React.createClass({

  changeGain(e) {
    const value = e.target.value;
    if (Boolean(Number(value))) {
      const gain = Number(value);
      if (gain >= 0 && gain < 1) {
        console.log(gain);
        // doit here
      }
    }
  },

  render() {
    const label = 'testasjdhasuidhiasdhiuashd';
    const levels = {
      left: '50%',
      right: '80%',
    };
    const muteOn = true;
    const midiOn = true;

    return (
      <div className="channel-strip">
        <div className="label">
          {label}
        </div>

        <div className="sound-meter">
          <div className="controls">
            <div className="gain item">
              <input type="text" placeholder="gain" onChange={this.changeGain}/>
            </div>

            <div className="midi item">
              <div className="title">
                <div className={'midi-indicator' + ((midiOn) ? ' on' : '')}>
                </div>
                Midi
              </div>
              <MidiDeviceOptionsComponent>
              </MidiDeviceOptionsComponent>
            </div>

            <div className="end">
              <div className={'item button mute' + ((muteOn) ? ' on' : '')}>
                Mute
              </div>
            </div>
          </div>

          <div className="level-bars">
            <div className="level-indicator">
              <div className="level-indicator-bar" style={{
                height: levels.left,
              }}>
              </div>
            </div>
            <div className="level-indicator">
              <div className="level-indicator-bar" style={{
                height: levels.right,
              }}>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },

});
