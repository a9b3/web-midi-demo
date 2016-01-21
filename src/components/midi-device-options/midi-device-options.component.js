'use strict';

import './midi-device-options.scss';

import React, { PropTypes } from 'react';
import { findDOMNode } from 'react-dom';

import midiDevices from 'root/services/audio-engine/midi-devices.js';

export default React.createClass({

  renderDevices(devices) {
    if (!devices || !devices.length) {
      return (
        <option value="none">
          No MIDI devices detected
        </option>
      )
    }
    return devices.map((device, i) => {
      return (
        <option value={i}>
          {device.manufacturer}: {device.name}
        </option>
      );
    });
  },

  onChange(event) {
    midiDevices.setActiveDevice(event.target.value);
  },

  render() {
    const devices = midiDevices.devices;

    return (
      <span className="midi-device-options">
        <select onChange={this.onChange}>
          <option value="default">...</option>
          {this.renderDevices(devices)}
        </select>
      </span>
    );
  },

});
