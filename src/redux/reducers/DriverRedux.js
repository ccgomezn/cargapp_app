/* eslint-disable arrow-body-style */
import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* -------------- Types and Actions Creators --------------- */
export const { Types, Creators } = createActions({
  postDriverMeRequest: ['params'],
  postDriverMeSuccess: ['data'],
  postDriverFailure: null,
});

export const DriverTypes = Types;
export default Creators;

/* ----------- INITIAL STATE ----------- */
export const INITIAL_STATE = Immutable({
  me: null,
  fetching: false,
  error: false,
});

/* ----------- Reducers ------------- */


export const postDriverMeSuccess = (state, { data }) => {
  return {
    ...state,
    fetching: false,
    error: false,
    me: data,
  };
};

export const postDriverFailure = (state) => {
  return {
    ...state,
    fetching: false,
    error: true,
  };
};

export const postDriverMeRequest = (state) => {
  return {
    ...state,
    fetching: true,
    error: false,
  };
};

/* ----------- Reducers to types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.POST_DRIVER_FAILURE]: postDriverFailure,
  [Types.POST_DRIVER_ME_SUCCESS]: postDriverMeSuccess,
  [Types.POST_DRIVER_ME_REQUEST]: postDriverMeRequest,
});
