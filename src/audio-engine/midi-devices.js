'use strict';

import audioEngine from 'root/audio-engine/audio-engine.js';
import store from 'root/store.js';

export function action(midiDevices) {
  return {
    type: 'UPDATE_DEVICES',
    midiDevices,
  };
};

export function changeActiveInstrument(activeInstrument) {
  return {
    type: 'CHANGE_ACTIVE_INSTRUMENT',
    activeInstrument,
  };
};

class MidiDevices {

  constructor() {
    if (!navigator) throw new Error('You must run this in a browser.');
    if (!navigator.requestMIDIAccess) throw new Error('No MIDI support in your browser.');
    this.devices = [];
    this.activeDevice = undefined;
    this.onMIDIMessage = undefined;
    this.activeInstrument = undefined;
  }

  clearActiveDevice() {
    if (!this.activeDevice) return;
    this.activeDevice.onmidimessage = undefined;
    this.activeDevice = undefined;
    store.dispatch(action(this));
  }

  getDevices() {
    return navigator.requestMIDIAccess({
      syntax: false,
    })
    .then(access => {
      if (!(access.inputs && access.inputs.size > 0)) {
        store.dispatch(action(this));
        return this.devices;
      }

      this.clearActiveDevice();
      const inputs = access.inputs.values();
      for (let input = inputs.next(); input && !input.done; input = inputs.next()) {
        this.devices.push(input.value);
      }

      store.dispatch(action(this));
      return this.devices;
    });
  }

  setActiveDevice(i) {
    this.clearActiveDevice();

    if (!this.devices[i]) {
      store.dispatch(action(this));
      return;
    }

    this.activeDevice = this.devices[i];
    this.activeDevice.onmidimessage = this.onMIDIMessage;
    store.dispatch(action(this));
  }

  attach(onMIDIMessage, activeInstrument) {
    this.onMIDIMessage = onMIDIMessage;
    this.activeInstrument = activeInstrument;

    store.dispatch(changeActiveInstrument(activeInstrument));
    if (!this.activeDevice) return;
    this.activeDevice.onmidimessage = onMIDIMessage;
  }

};

export default new MidiDevices();
