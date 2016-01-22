'use strict';

import './channel-strip.scss';

import React, { PropTypes } from 'react';
import { findDOMNode } from 'react-dom';

import SoundMeterComponent from '../sound-meter/sound-meter.component.js';
import MidiDeviceOptionsComponent from 'components/midi-device-options/midi-device-options.component.js';

import mixer from 'root/services/mixer.js';

function levelToPercent(value) {
  return value;
}

function maxToHeight(value) {
  return (100 - value) + '%';
}

export default React.createClass({

  getInitialState() {
    return {
      channel: mixer.getChannelById(this.props.id),
      gain: {
        left: 0,
        right: 0,
      },
      max: {
        left: maxToHeight(levelToPercent(0)),
        right: maxToHeight(levelToPercent(0)),
      },
    };
  },

  componentDidMount() {
    const channel = this.state.channel;
    channel.analyser(this.analyserCallback.bind(this));
  },

  componentWillUnmount() {
    const channel = this.state.channel;
    channel.removeAnalyserCb(this.analyserCallback.bind(this));
  },

  analyserCallback(gain, max) {
    this.setState({
      channel: this.state.channel,
      gain: {
        left: levelToPercent(gain.left) + '%',
        right: levelToPercent(gain.right) + '%',
      },
      max: {
        left: maxToHeight(levelToPercent(max.left)),
        right: maxToHeight(levelToPercent(max.right)),
      }
    });
  },

  changeGain(channel, e) {
    const value = e.target.value;
    if (Boolean(Number(value))) {
      const gain = Number(value);
      if (gain >= 0 && gain <= 1) {
        console.log(gain);
        // doit here
      }
    }
  },

  muteHandler(channel) {
    channel.mute();
  },

  render() {
    const channel = this.state.channel;
    const levels = this.state.gain;
    const maxLevels = this.state.max;
    const label = channel.label;
    const gainValue = channel.gainValue;
    const muteOn = channel.isMute;
    const midiOn = true;

    return (
      <div className={'channel-strip' + ((label === 'master') ? ' master' : '')}>
        <div className="label">
          {label || 'label...'}
        </div>

        {(() => {
          if (label === 'master') return;
          return (
            <div className="instruments-choices">
              Keyboard
            </div>
          );
        })()}

        <div className="sound-meter">
          <div className="controls">
            <div className="gain item">
              <div className="title">
                {gainValue || 'value'}
              </div>
              <input type="text" placeholder="gain"
                onChange={this.changeGain.bind(this, channel)}/>
            </div>

            {(() => {
              if (label === 'master') return;
              return (
                <div className="midi item">
                  <div className="title">
                    <div className={'midi-indicator' + ((midiOn) ? ' on' : '')}>
                    </div>
                    Midi
                  </div>
                  <MidiDeviceOptionsComponent>
                  </MidiDeviceOptionsComponent>
                </div>
              );
            })()}

            <div className="end">
              <div className={'item button mute' + ((muteOn) ? ' on' : '')}
                onClick={this.muteHandler.bind(null, channel)}>
                Mute
              </div>
            </div>
          </div>

          <div className="level-bars">
            <div className="level-indicator">
              <div className="level-indicator-max-bar" style={{
                transform: `translate(0, ${maxLevels.left})`
              }}>
              </div>
              <div className="level-indicator-bar" style={{
                height: levels.left,
              }}>
              </div>
            </div>
            <div className="level-indicator">
              <div className="level-indicator-max-bar" style={{
                transform: `translate(0, ${maxLevels.right})`
              }}>
              </div>
              <div className="level-indicator-bar" style={{
                height: levels.right,
              }}>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },

});
