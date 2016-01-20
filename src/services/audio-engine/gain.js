'use strict';

class Gain {

  constructor(context, opts = {}) {
    if (!context.createGain) {
      throw new Error('You must pass in an valid AudioContext.');
    }

    this.gain = context.createGain();
    return this;
  }

  connect(node) {
    this.gain.connect(node);
  }

};

export default Gain;
