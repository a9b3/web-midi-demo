'use strict';

import './mixer.scss';

import React, { PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import store from 'root/store.js';

import ChannelStripComponent from 'components/mixer/channel-strip/channel-strip.component.js'

// reference function to unsubscribe from redux store
let unsubscribe;
import mixer from 'root/services/mixer.js';

export default React.createClass({

  getInitialState() {
    return store.getState();
  },

  componentDidMount() {
    unsubscribe = store.subscribe(this._onChange);
    mixer.addChannel('instrument');
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
        {/*  */}
        {/* <ChannelStripComponent> */}
        {/* </ChannelStripComponent> */}

        <div className="end">
          <ChannelStripComponent {...mixer.master}>
          </ChannelStripComponent>
        </div>
      </div>
    );
  },

});
