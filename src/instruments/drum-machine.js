'use strict';

import Instrument from './instrument.js';
import Osc from 'root/audio-engine/osc.js';

class DrumMachine extends Instrument {

  constructor() {
    super();

    this.osc = {};

    this.gain = this.context.createGain();
    this.gain.connect(this.context.destination);

    this.filter = this.context.createBiquadFilter();
    this.filter.gain.value = 50;
    this.filter.connect(this.gain);
  }

  noteOn(note, velocity) {
    super.noteOn(note, velocity);

    const currFreq = this.mtof(note);
    const currVelocity = this.vtov(velocity);
    this.gain.value = currVelocity;

    if (!this.osc[note]) {
      this.osc[note] = new Osc(this.context, {
        connect: this.gain,
      })
      .setFreq(currFreq)
      .start();
    } else {
      this.osc[note].stop(.05);
      delete this.osc[note];
    }
  }

};

export default DrumMachine;
