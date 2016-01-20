'use strict';

import './instruments.scss';

import React, { PropTypes } from 'react';
import { findDOMNode } from 'react-dom';

import KeyboardComponent from '../keyboard/keyboard.component.js';
import DrumMachineComponent from '../drum-machine/drum-machine.component.js';

import midiDevices from 'root/audio-engine/midi-devices.js';
import Keyboard from 'root/instruments/keyboard.js';
import DrumMachine from 'root/instruments/drum-machine.js';

export default React.createClass({

  selectChange(event) {
    const value = event.target.value;

    let instrument;
    switch(value) {
      case 'keyboard':
        instrument = new Keyboard();
        break;
      case 'drummachine':
        instrument = new DrumMachine();
        break;
      default:
        break;
    }

    if (!instrument) return;
    midiDevices.attach(instrument.onMIDIMessage.bind(instrument), value);
  },

  render() {
    const activeNotes = this.props.activeNotes;
    const on = this.props.on;
    const activeInstrument = this.props.activeInstrument;

    const instrumentChoices = [
      {
        displayName: 'Keyboard',
        value: 'keyboard',
      },
      {
        displayName: 'Drum Machine',
        value: 'drummachine',
      },
    ];

    const params = {
      activeNotes,
      on,
    };

    let instrumentElem;
    switch(activeInstrument) {
      case 'keyboard':
        instrumentElem = <KeyboardComponent {...params}>
        </KeyboardComponent>;
        break;
      case 'drummachine':
        instrumentElem = <DrumMachineComponent {...params}>
        </DrumMachineComponent>;
        break;
      default:
        instrumentElem = <div>
          Select an instrument
        </div>;
        break;
    }

    return (
      <div className="instruments">
        <select onChange={this.selectChange}>
          {instrumentChoices.map(instrumentChoice => {
            return (
              <option value={instrumentChoice.value}>
                {instrumentChoice.displayName}
              </option>
            );
          })}
        </select>

        {instrumentElem}
      </div>
    );
  },

});
