'use strict';

import audioEngine from 'root/services/audio-engine/audio-engine.js';

import store from 'root/store.js';

function action(instrument) {
  return {
    type: 'UPDATE_INSTRUMENT',
    instrument,
  };
}

class Instrument {

  constructor() {
    if (!audioEngine.context) {
      throw new Error('Audio Engine must be initialized first.');
    }

    this.activeNotes = [];
    this.context = audioEngine.context;
  }

  mtof(note) {
    return 440 * Math.pow(2, (note - 69) / 12);
  }

  vtov(velocity) {
    return Number((velocity / 127).toFixed(2));
  }

  noteOn(note, velocity) {
    if (velocity === 0) {
      const position = this.activeNotes.indexOf(note);
      if (position === -1) return;
      this.activeNotes.splice(position, 1);
    } else {
      this.activeNotes.push(note);
    }

    store.dispatch(action(this));
  }

  onMIDIMessage(res) {
    const data = res.data;
    // on(144) / off(128) / detune(244)
    const type = data[0];
    const note = data[1];
    const velocity = data[2];

    if (note < 48 || note > 72) {
      return;
    }

    switch(type) {
      case 144:
        this.noteOn(note, velocity);
        break;
      case 128: // suppose to be noteOff
        break;
    }
  }

};

export default Instrument;
