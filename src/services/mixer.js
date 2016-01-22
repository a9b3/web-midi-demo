'use strict';

import audioEngine from 'root/services/audio-engine/audio-engine.js';
import Channel from './channel.js';


/******************************
    Actions
******************************/

export const actions = {

  addChannel(label) {
    mixer.addChannel(label);

    return {
      type: 'UPDATE_MIXER',
    };
  },

  removeChannel(id) {
    mixer.removeChannel(id);

    return {
      type: 'UPDATE_MIXER',
    };
  },

  selectChannel(id) {
    mixer.selectChannel(id);

    return {
      type: 'UPDATE_MIXER',
    };
  },

};


/******************************
    Reducer
******************************/

export function reducer(state = mixer, action) {
  switch(action.type) {
  case 'UPDATE_MIXER':
    return Object.assign({}, state, mixer);
  default:
    return state;
  }
};


class Mixer {

  constructor() {
    this.context = audioEngine.context;
    this.master = new Channel(this.context, {
      label: 'master',
    });

    this.channels = [];
    this.selectedChannel = [];
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

    this.channels[idx].disconnect();
    this.channels.splice(idx, 1);
    this.selectedChannel = [];
  }

  selectChannel(id) {
    this.selectedChannel = [];
    let found;
    this.channels.some(c => {
      if (c.id === id) {
        found = c;
      }
    });
    this.selectedChannel.push(found);
  }

};

// expose singleton, there should only be one instance of Mixer
const mixer = new Mixer();
export default mixer;
