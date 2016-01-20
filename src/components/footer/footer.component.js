'use strict';

import './footer.scss';

import midiDevices from 'root/services/audio-engine/midi-devices.js';

import MidiDeviceOptions from 'components/midi-device-options/midi-device-options.component.js';

import React, { PropTypes } from 'react';
import { findDOMNode } from 'react-dom';

export default React.createClass({

  render() {
    const devices = midiDevices.devices;

    return (
      <div className="footer">
        <div className="item">
          <div className="title">
            Midi Device
          </div>
          <MidiDeviceOptions devices={devices}
            attach={midiDevices.setActiveDevice.bind(midiDevices)}>
          </MidiDeviceOptions>
        </div>
      </div>
    );
  },

});
