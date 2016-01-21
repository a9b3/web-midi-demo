'use strict';

import uuid from 'node-uuid';
import store from 'root/store.js';

class Channel {

  constructor(context, opts = {}) {
    if (!context) throw new Error('Must pass in instance of audioContext');
    this.context = context;

    this.label = opts.label;
    this.gainValue = .5;
    this.isMute = false;

    // gain
    this.gain = this.context.createGain();
    this.gain.gain.value = .5;
    this.gain.connect(this.context.destination);
    this.id = uuid.v4();
  }

  changeGain(value) {
    if (value >= 0 && value <=1) {
      this.gainValue = value;
      if (this.isMute) {
        store.dispatch({type: ''});
        return;
      }

      this.gain.gain.value = this.gainValue;
    }

    store.dispatch({type: ''});
  }

  mute() {
    this.isMute = !this.isMute;
    if (this.isMute) {
      this.gain.gain.value = 0;
    } else {
      this.gain.gain.value = this.gainValue;
    }

    store.dispatch({type: ''});
  }

  getConnectNode() {
    return this.gain;
  }

};

export default Channel;
