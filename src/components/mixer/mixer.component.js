'use strict';

import './mixer.scss';

import React, { PropTypes } from 'react';
import { findDOMNode } from 'react-dom';

import ChannelStripComponent from 'components/mixer/channel-strip/channel-strip.component.js'

export default React.createClass({

  render() {
    return (
      <div className="mixer">
        <ChannelStripComponent>
        </ChannelStripComponent>
        <ChannelStripComponent>
        </ChannelStripComponent>

        <div className="end">
          <ChannelStripComponent>
          </ChannelStripComponent>
        </div>
      </div>
    );
  },

});
