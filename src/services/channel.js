'use strict';

import store from 'root/store.js';

class Channel {

  constructor(context) {
    if (!context) throw new Error('Must pass in instance of audioContext');
    this.context = context;

    // gain
    this.gain = this.context.createGain();
    this.gain.gain.value = 1;
    this.gain.connect(this.context.destination);
  }

};

export default Channel;
