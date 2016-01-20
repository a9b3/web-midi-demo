'use strict';

import './midi-device-options.scss';

import React, { PropTypes } from 'react';
import { findDOMNode } from 'react-dom';

export default React.createClass({

  // https://facebook.github.io/react/docs/reusable-components.html
  propTypes: {
    devices: React.PropTypes.array,
  },

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
    this.props.attach(event.target.value);
  },

  render() {
    const devices = this.props.devices;

    return (
      <span className="midi-device-options">
        <select onChange={this.onChange}>
          <option value="default">Select</option>
          {this.renderDevices(devices)}
        </select>
      </span>
    );
  },

});
