'use strict';

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
  }

};

export default new AudioEngine();
