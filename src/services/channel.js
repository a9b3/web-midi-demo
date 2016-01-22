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

let _count = 0;

class Channel {

  /**
   * @param {AudioContext} context
   * @param {=Object} opts
   * @param {=String} opts.label
   */
  constructor(context, opts = {}) {
    if (!context) throw new Error('Must pass in instance of audioContext');
    this.context = context;

    this.label = opts.label || 'default';
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

    this._analyserCallbacks = [];
    this._initAnalyser();

    this.midiDevice = undefined;
  }

  _initAnalyser() {
    // javascript node
    this._javascriptNode = this.context.createScriptProcessor(2048, 1 ,1);
    this._javascriptNode.connect(this.context.destination);

    // http://www.smartjava.org/content/exploring-html5-web-audio-visualizing-sound
    this._onAudioProcess = function() {
      const array = new Uint8Array(this._analyser.frequencyBinCount);
      this._analyser.getByteFrequencyData(array);
      const average = getAverageVolume(array);

      const arrayRight = new Uint8Array(this._analyserRight.frequencyBinCount);
      this._analyserRight.getByteFrequencyData(arrayRight);
      const averageRight = getAverageVolume(arrayRight);

      if (average !== this.currentGain.left || averageRight !== this.currentGain.right) {
        this.currentGain.left = average;
        this.currentGain.right = averageRight;

        if (_count === 50) {
          this.currentMax.left = 0;
          this.currentMax.right = 0;
          _count = 0;
        }
        _count++;

        if (this.currentGain.left > this.currentMax.left) {
          this.currentMax.left = this.currentGain.left;
        }
        if (this.currentGain.right > this.currentMax.right) {
          this.currentMax.right = this.currentGain.right;
        }

        this._analyserCallbacks.forEach(cb => cb(this.currentGain, this.currentMax));
      }
    }.bind(this);
    this._javascriptNode.onaudioprocess = this._onAudioProcess;

    // analyser
    this._analyser = this.context.createAnalyser();
    this._analyser.smoothingTimeConstant = 0.3;
    this._analyser.fftSize = 1024;
    this._analyserRight = this.context.createAnalyser();
    this._analyserRight.smoothingTimeConstant = 0.0;
    this._analyserRight.fftSize = 1024;

    this._splitter = this.context.createChannelSplitter();
    this._splitter.connect(this._analyser, 0, 0);
    this._splitter.connect(this._analyserRight, 1, 0);

    this._analyser.connect(this._javascriptNode);
    this.gain.connect(this._splitter);
  }

  analyser(cb) {
    this._analyserCallbacks.push(cb);
  }

  removeAnalyserCb(cb) {
    const i = this._analyserCallbacks.indexOf(cb);
    this._analyserCallbacks.splice(i, 1);
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
