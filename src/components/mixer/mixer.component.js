'use strict';

import './mixer.scss';

import React, { PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import store from 'root/store.js';

import ChannelStripComponent from 'components/mixer/channel-strip/channel-strip.component.js'
import { mixer as mixerActions } from 'root/actions.js';

// reference function to unsubscribe from redux store
let unsubscribe;

export default React.createClass({

  getInitialState() {
    return store.getState();
  },

  componentDidMount() {
    unsubscribe = store.subscribe(this._onChange);

    store.dispatch(mixerActions.addChannel('keyboard'));
  },

  componentWillUnmount() {
    if (!unsubscribe) return;
    unsubscribe();
  },

  _onChange() {
    this.setState(store.getState());
  },

  render() {
    const mixer = this.state.mixer;

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
