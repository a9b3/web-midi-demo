'use strict';

import React, { PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import store from 'root/store.js';

import midiDevices from 'root/services/audio-engine/midi-devices.js';
import Keyboard from 'root/services/instruments/keyboard.js';

// React Components
import InstrumentsComponent from 'components/instruments/instruments.component.js';
import MidiDeviceOptions from 'components/midi-device-options/midi-device-options.component.js';
import Social from 'components/social/social.component.js';
import FooterComponent from 'components/footer/footer.component.js';
import MixerComponent from 'components/mixer/mixer.component.js';

// reference function to unsubscribe from redux store
let unsubscribe;

const keyboard = new Keyboard();

export default React.createClass({

  getInitialState() {
    return store.getState();
  },

  componentDidMount() {
    unsubscribe = store.subscribe(this._onChange);

    midiDevices.getDevices();
    midiDevices.attach(keyboard.onMIDIMessage.bind(keyboard), 'keyboard');
  },

  componentWillUnmount() {
    if (!unsubscribe) return;
    unsubscribe();
  },

  _onChange() {
    this.setState(store.getState());
  },

  render() {
    const devices = this.state.midiDevices.devices;
    const activeDevice = this.state.midiDevices.activeDevice;
    const activeNotes = this.state.instrument.activeNotes;
    const activeInstrument = this.state.activeInstrument;

    return (
      <div className="app">
        <Social>
        </Social>

        <div style={{
          flexGrow: '1',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <InstrumentsComponent activeNotes={activeNotes}
            on={Boolean(activeDevice)}
            activeInstrument={activeInstrument}>
          </InstrumentsComponent>
        </div>

        <div style={{
          width: '100%',
          marginTop: 'auto',
        }}>
          <MixerComponent>
          </MixerComponent>
        </div>

        {/* <FooterComponent> */}
        {/* </FooterComponent> */}
      </div>
    );
  },

});
