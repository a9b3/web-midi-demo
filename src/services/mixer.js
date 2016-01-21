'use strict';

import store from 'root/store.js';
import audioEngine from 'root/services/audio-engine/audio-engine.js';

import Channel from './channel.js';

class Mixer {

  constructor() {
    this.context = audioEngine.context;
    this.master = new Channel(this.context, {
      label: 'Master',
    });

    this.channels = [];
  }

  getChannelById(id) {
    if (id === this.master.id) return this.master;
    return this.channels.find(channel => channel.id === id);
  }

  addChannel() {

  }

  removeChannel() {

  }

};

export default new Mixer();
