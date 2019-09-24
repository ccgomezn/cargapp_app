/* eslint-disable global-require */
import { combineReducers } from 'redux';

// import user from './user';

export default combineReducers({
  user: require('./UserRedux').reducer,
  driver: require('./DriverRedux').reducer,
});
