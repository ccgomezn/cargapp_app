import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ACTIONS */
export const { Types, Creators } = createActions({
  getStatusRequest: ['params'],
  getStatusSuccess: ['data'],
  statusFailure: null,
});

export const StatusTypes = Types;
export default Creators;

/* INITIAL STATE */

export const INITIAL_STATE = Immutable({
  data: null,
  fetching: false,
  error: true,
});

/* REDUCERS */

export const getStatusRequest = state => ({
  ...state,
  fetching: true,
});

export const getStatusSuccess = (state, { data }) => ({
  ...state,
  fetching: false,
  data,
});

export const statusFailure = state => ({
  ...state,
  fetching: false,
  error: false,
});

/* Actions to types */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_STATUS_REQUEST]: getStatusRequest,
  [Types.GET_STATUS_SUCCESS]: getStatusSuccess,
  [Types.STATUS_FAILURE]: statusFailure,
});
