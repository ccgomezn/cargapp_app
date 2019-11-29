import Inmutable from 'seamless-immutable';
import { createReducer, createActions } from 'reduxsauce';

/* -------------------- Actions --------------------- */
export const { Types, Creators } = createActions({
  getLoadstypeRequest: ['params'],
  getLoadstypeSuccess: ['data'],
  getLoadstypeFailure: ['params'],
});

export const LoadTypes = Types;
export default Creators;

/* ------------------- INITIAL STATE ------------------- */
export const INITIAL_STATE = Inmutable({
  data: null,
  error: false,
  fetching: false,
});

/* -------------------- REDUCERS ------------------------ */
export const getLoadstypeRequest = state => ({
  ...state,
  fetching: true,
  error: false,
});

export const getLoadstypeSuccess = (state, { data }) => ({
  ...state,
  fetching: false,
  data,
});

export const getLoadstypeFailure = state => ({
  ...state,
  error: true,
  fetching: false,
});

/* ---------------------- Reducers to type -------------- */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_LOADSTYPE_REQUEST]: getLoadstypeRequest,
  [Types.GET_LOADSTYPE_SUCCESS]: getLoadstypeSuccess,
  [Types.GET_LOADSTYPE_FAILURE]: getLoadstypeFailure,
});
