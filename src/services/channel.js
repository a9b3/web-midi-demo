'use strict';

import uuid from 'node-uuid';
import store from 'root/store.js';

function getAverageVolume(array) {
  var values = 0;
  var average;

  var length = array.length;

  // get all the frequency amplitudes
  for (var i = 0; i < length; i++) {
    values += array[i];
  }

  average = values / length;
  return average;
}

class Channel {

  constructor(context, opts = {}) {
    if (!context) throw new Error('Must pass in instance of audioContext');
    this.context = context;

    this.label = opts.label;
    this.gainValue = .5;
    this.isMute = false;
    this.currentAverage = 0;

    // gain
    this.gain = this.context.createGain();
    this.gain.gain.value = .5;
    this.gain.connect(this.context.destination);
    this.id = uuid.v4();

    // javascript node
    this.javascriptNode = this.context.createScriptProcessor(2048, 1 ,1);
    this.javascriptNode.connect(this.context.destination);

    // http://www.smartjava.org/content/exploring-html5-web-audio-visualizing-sound
    this.onAudioProcess = function() {
      const array = new Uint8Array(this.analyser.frequencyBinCount);
      this.analyser.getByteFrequencyData(array);
      const average = getAverageVolume(array);
      this.currentAverage = average;
    }.bind(this);
    this.javascriptNode.onaudioprocess = this.onAudioProcess;

    // analyser
    this.analyser = this.context.createAnalyser();
    this.analyser.smoothingTimeConstant = 0.3;
    this.analyser.fftSize = 1024;

    this.sourceNode = this.context.createBufferSource();
    this.sourceNode.connect(this.analyser);

    this.analyser.connect(this.javascriptNode);

    this.sourceNode.connect(this.gain)
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
