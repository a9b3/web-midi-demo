'use strict';

import store from 'root/store.js';
import audioEngine from 'root/services/audio-engine/audio-engine.js';

import Channel from './channel.js';

class Mixer {

  constructor() {
    this.context = audioEngine.context;
    this.master = new Channel(this.context);
    this.channels = [];
  }

  addChannel() {

  }

  removeChannel() {

  }

};

export default new Mixer();
