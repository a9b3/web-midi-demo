'use strict';

import store from 'root/store.js';
import audioEngine from 'root/services/audio-engine/audio-engine.js';

import Channel from './channel.js';

class Mixer {

  constructor() {
    this.context = audioEngine.context;
    this.master = new Channel(this.context, {
      label: 'master',
    });

    this.channels = [];
  }

  getChannelById(id) {
    if (id === this.master.id) return this.master;
    return this.channels.find(channel => channel.id === id);
  }

  addChannel(label) {
    const channel = new Channel(this.context, {
      label,
    });

    channel.connect(this.master.getConnectNode());

    this.channels.push(channel);
  }

  removeChannel(id) {
    let idx;
    for (let i = 0; i < this.channels.length; i++) {
      if (this.channels[i].id === id) {
        idx = i;
        break;
      }
    }

    this.channels[i].disconnect();
    this.channels.splice(i, 1);
  }

};

export default new Mixer();
