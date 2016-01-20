'use strict';

class Osc {

  /**
   * @param {AudioContext} context
   * @param {Object} opts
   * @param {AudioNode} opts.connect - like a gain node
   * @param {=String} opts.type
   */
  constructor(context, opts = {}) {
    if (!context.createOscillator) {
      throw new Error('You must pass in an valid AudioContext.');
    }

    this.osc = context.createOscillator();
    this.osc.type = opts.type || 'sine';
    this.osc.connect(opts.connect);
    return this;
  }

  setFreq(freq) {
    this.osc.frequency.setTargetAtTime(freq, 0, .05);
    return this;
  }

  start(n = 0) {
    this.osc.start(n);
    return this;
  }

  stop(n = 0) {
    this.osc.stop(n);
    return this;
  }

};

export default Osc;
