/*
 * Entry point for all exported actions.
 * Import actions and export them here. This will simplify the dependencies from
 * components that require them. React components can simply do the following:
 *
 *    import { foo } from 'root/actions.js';
 *
 * Seperate logic between services and react/redux components. Services that
 * want to communicate will have to expose actions and reducers. This file will
 * handle the actions.
 */
'use strict';

import axios from 'axios';
import { pushPath } from 'redux-simple-router';

import { actions as mixer } from 'services/mixer.js';
exports['mixer'] = mixer;
