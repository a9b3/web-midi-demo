'use strict';

import './mixer.scss';

import React, { PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import store from 'root/store.js';
import { mixer as mixerActions } from 'root/actions.js';

import ChannelStripComponent from 'components/mixer/channel-strip/channel-strip.component.js'

// reference function to unsubscribe from redux store
let unsubscribe;
import mixer from 'root/services/mixer.js';

export default React.createClass({

  getInitialState() {
    return store.getState();
  },

  componentDidMount() {
    console.log('mixerActions', mixerActions);
    unsubscribe = store.subscribe(this._onChange);
    mixer.addChannel('instrument');
    mixer.addChannel('vocals');
    mixer.addChannel('drums');
    mixer.addChannel('guitars');
    mixer.addChannel('bass');
  },

  componentWillUnmount() {
    if (!unsubscribe) return;
    unsubscribe();
  },

  _onChange() {
    this.setState(store.getState());
  },

  render() {
    return (
      <div className="mixer">
        {mixer.channels.map(channel => {
          return (
            <ChannelStripComponent {...channel}>
            </ChannelStripComponent>
          );
        })}

        <div className="end">
          <ChannelStripComponent {...mixer.master}>
          </ChannelStripComponent>
        </div>
      </div>
    );
  },

});
