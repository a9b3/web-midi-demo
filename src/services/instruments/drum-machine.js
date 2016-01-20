'use strict';

import Instrument from './instrument.js';
import Osc from 'root/services/audio-engine/osc.js';

class DrumMachine extends Instrument {

  constructor() {
    super();

    this.gain = this.context.createGain();
    this.gain.connect(this.context.destination);

    this.filter = this.context.createBiquadFilter();
    this.filter.gain.value = 50;
    this.filter.connect(this.gain);
  }

  noteToSample(note) {
    let source = 'sounds/';

    switch(note) {
    case 48:
      source += 'kick.wav';
      break;
    case 49:
      source += 'hh.wav';
      break;
    case 50:
      source += 'hh_2.wav';
      break;
    case 51:
      source += 'snare.wav';
      break;
    default:
      return '';
    }

    return source;
  }

  noteOn(note, velocity) {
    super.noteOn(note, velocity);

    const currFreq = this.mtof(note);
    const currVelocity = this.vtov(velocity);
    this.gain.value = currVelocity;

    if (velocity === 0) return;

    const audio = new Audio();
    audio.src = this.noteToSample(note);
    audio.controls = true;
    audio.autoplay = true;

    const source = this.context.createMediaElementSource(audio);
    source.connect(this.context.destination);
  }

};

export default DrumMachine;
