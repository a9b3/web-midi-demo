'use strict';

import './social.scss';

import React, { PropTypes } from 'react';
import { findDOMNode } from 'react-dom';

export default React.createClass({

  render() {
    return (
      <div className="social">
        <a href="https://github.com/esayemm/web-midi-demo">
          <i className="fa fa-github">
          </i>
        </a>
      </div>
    );
  },

});
