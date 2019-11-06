import { createActions, createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';

export const { Types, Creators } = createActions({
  putPasswordRequest: ['data'],
  putPasswordSuccess: ['data'],
  passwordFailure: null,
});

export const PasswordTypes = Types;
export default Creators;

/* INITIAL STATE */

export const INITIAL_STATE = Immutable({
  data: null,
  fetching: false,
  error: null,
});

/* REDUCERS */

export const putPasswordRequest = state => ({
  ...state,
  fetching: true,
  error: false,
});

export const putPasswordSuccess = (state, { data }) => ({
  ...state,
  data,
  fetching: false,
});

export const passwordFailure = state => ({
  ...state,
  fetching: false,
  error: true,
});

/* Actions to types */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.PUT_PASSWORD_REQUEST]: putPasswordRequest,
  [Types.PUT_PASSWORD_SUCCESS]: putPasswordSuccess,
  [Types.PASSWORD_FAILURE]: passwordFailure,
});
