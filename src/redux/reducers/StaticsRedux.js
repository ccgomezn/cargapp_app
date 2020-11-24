import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ----------------- Action Creators -------------- */
export const { Types, Creators } = createActions({
  getStaticsMeRequest: ['params'],
  getStaticsMeSuccess: ['data'],
  getStaticsMeFailure: null,
});

export const StaticsTypes = Types;
export default Creators;

/* ---------------- INITIAL STATE -------------- */
export const INITIAL_STATE = Immutable({
  error: null,
  fetching: false,
  meStatics: null,
});

/* -------------------- REDUCERS ----------------- */
export const getStaticsMeRequest = state => ({
  ...state,
  fetching: true,
  meStatics: null,
});

export const getStaticsMeSuccess = (state, { data }) => ({
  ...state,
  fetching: false,
  meStatics: data,
});

export const getStaticsMeFailure = state => ({
  ...state,
  fetching: false,
  error: true,
});

/* Actions to types */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_STATICS_ME_REQUEST]: getStaticsMeRequest,
  [Types.GET_STATICS_ME_SUCCESS]: getStaticsMeSuccess,
  [Types.GET_STATICS_ME_FAILURE]: getStaticsMeFailure,
});
