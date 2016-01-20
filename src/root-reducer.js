'use strict';

import { combineReducers } from 'redux';
import { routeReducer } from 'redux-simple-router';

const reducers = {};

reducers.activeInstrument = (state = 'keyboard', action) => {
  switch(action.type) {
  case 'CHANGE_ACTIVE_INSTRUMENT':
    return action.activeInstrument;
  default:
    return state;
  }
};

reducers.instrument = (state = {
  activeNotes: [],
}, action) => {
  switch(action.type) {
    case 'UPDATE_INSTRUMENT':
      return Object.assign({}, state, action.instrument);
    default:
      return state;
  }
};

reducers.midiDevices = (state = {
  devices: [],
  activeDevice: undefined,
}, action) => {
  switch(action.type) {
    case 'UPDATE_DEVICES':
      return Object.assign({}, state, action.midiDevices);
    default:
      return state;
  }
};

const combinedReducers = Object.keys(reducers).reduce((obj, key) => {
  if (obj[key]) return obj;
  obj[key] = reducers[key];
  return obj;
}, {
  routing: routeReducer,
});

const rootReducer = combineReducers(combinedReducers);

export default rootReducer;
