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
    this.currentGain = {
      left: 0,
      right: 0,
    };
    this.currentMax = {
      left: 0,
      right: 0,
    };

    // gain
    this.gain = this.context.createGain();
    this.gain.gain.value = this.gainValue;
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

      const arrayRight = new Uint8Array(this.analyserRight.frequencyBinCount);
      this.analyserRight.getByteFrequencyData(arrayRight);
      const averageRight = getAverageVolume(arrayRight);

      if (average !== this.currentGain.left || averageRight !== this.currentGain.right) {
        this.currentGain.left = average;
        this.currentGain.right = averageRight;
        if (this.currentGain.left > this.currentMax.left) {
          this.currentMax.left = this.currentGain.left;
        }
        if (this.currentGain.right > this.currentMax.right) {
          this.currentMax.right = this.currentGain.right;
        }
        store.dispatch({type: ''});
      }
    }.bind(this);
    this.javascriptNode.onaudioprocess = this.onAudioProcess;

    // analyser
    this.analyser = this.context.createAnalyser();
    this.analyser.smoothingTimeConstant = 0.3;
    this.analyser.fftSize = 1024;
    this.analyserRight = this.context.createAnalyser();
    this.analyserRight.smoothingTimeConstant = 0.0;
    this.analyserRight.fftSize = 1024;

    this.splitter = this.context.createChannelSplitter();
    this.splitter.connect(this.analyser, 0, 0);
    this.splitter.connect(this.analyserRight, 1, 0);

    // this.analyser.connect(this.javascriptNode);
    this.analyserRight.connect(this.javascriptNode);
    this.gain.connect(this.splitter);
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

  connect(node) {
    this.gain.connect(node);
  }

  disconnect() {
    this.gain.disconnect();
  }

  getConnectNode() {
    return this.gain;
  }

};

export default Channel;
