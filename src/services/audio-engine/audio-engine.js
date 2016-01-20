'use strict';

import Osc from 'root/services/audio-engine/osc.js';
import store from 'root/store.js';

export function action(audioEngine) {
  return {
    type: 'UPDATE_AUDIOENGINE',
    audioEngine,
  };
}

function makeDistortionCurve(amount) {
  var k = typeof amount === 'number' ? amount : 50,
    n_samples = 44100,
    curve = new Float32Array(n_samples),
    deg = Math.PI / 180,
    i = 0,
    x;
  for ( ; i < n_samples; ++i ) {
    x = i * 2 / n_samples - 1;
    curve[i] = ( 3 + k ) * x * 20 * deg / ( Math.PI + k * Math.abs(x) );
  }
  return curve;
};

/*
 * Usage:
 *  const audioEngine = new AudioEngine();
 *  audioEngine.wire();
 *
 * // run noteOn in an eventlistener
 */
class AudioEngine {

  constructor() {
    if (!window.AudioContext) {
      throw Error('Your browser does not have support for AudioContext')
    }

    this.context = new window.AudioContext();
    this.activeNotes = [];
    this.osc = {};
  }

  mtof(note) {
    return 440 * Math.pow(2, (note - 69) / 12);
  }

  vtov(velocity) {
    return Number((velocity / 127).toFixed(2));
  }

  wire() {
    this.gain = this.context.createGain();
    this.gain.connect(this.context.destination);

    this.filter = this.context.createBiquadFilter();
    // this.filter.type = 'lowshelf';
    // this.filter.frequency.value = 1000; // frequency
    // this.filter.Q.value = 300; // resonance
    this.filter.gain.value = 50;
    this.filter.connect(this.gain);

    this.distortion = this.context.createWaveShaper();
    this.distortion.curve = makeDistortionCurve(400);
    this.distortion.oversample = '1x';
    this.distortion.connect(this.filter);
  }

  noteOn(note, velocity) {
    if (velocity === 0) {
      const position = this.activeNotes.indexOf(note);
      if (position === -1) return;
      this.activeNotes.splice(position, 1);
    } else {
      this.activeNotes.push(note);
    }

    const currFreq = this.mtof(note);
    const currVelocity = this.vtov(velocity);
    this.gain.value = currVelocity;

    store.dispatch(action(this));

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

export default new AudioEngine();
