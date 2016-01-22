'use strict';

import './mixer.scss';

import React, { PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import store from 'root/store.js';
import * as actions from 'root/actions.js';

import ChannelStripComponent from 'components/mixer/channel-strip/channel-strip.component.js'

// reference function to unsubscribe from redux store
let unsubscribe;

export default React.createClass({

  getInitialState() {
    return store.getState();
  },

  componentDidMount() {
    unsubscribe = store.subscribe(this._onChange);
  },

  componentWillUnmount() {
    if (!unsubscribe) return;
    unsubscribe();
  },

  _onChange() {
    this.setState(store.getState());
  },

  addChannel() {
    store.dispatch(actions.mixer.addChannel());
  },

  render() {
    const mixer = this.state.mixer;

    return (
      <div className="mixer">
        {mixer.channels.map(channel => {
          return (
            <ChannelStripComponent
              key={channel.id}
              {...channel}>
            </ChannelStripComponent>
          );
        })}

        <div className="add" onClick={this.addChannel}>
          <i className="fa fa-plus"></i>
        </div>

        <div className="end">
          <ChannelStripComponent {...mixer.master}>
          </ChannelStripComponent>
        </div>
      </div>
    );
  },

});
