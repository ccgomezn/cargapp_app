import Inmutable from 'seamless-immutable';
import { createReducer, createActions } from 'reduxsauce';

/* -------------------- Actions --------------------- */
export const { Types, Creators } = createActions({
  getDestinationsRequest: ['params'],
  getDestinationsSuccess: ['data'],
  getDestinationsFailure: ['params'],
});

export const DestinationsTypes = Types;
export default Creators;

/* ------------------- INITIAL STATE ------------------- */
export const INITIAL_STATE = Inmutable({
  data: null,
  error: false,
  fetching: false,
});

/* -------------------- REDUCERS ------------------------ */
export const getDestinationsRequest = state => ({
  ...state,
  fetching: true,
  error: false,
});

export const getDestinationsSuccess = (state, { data }) => ({
  ...state,
  fetching: false,
  data,
});

export const getDestinationsFailure = state => ({
  ...state,
  error: true,
  fetching: false,
});

/* ---------------------- Reducers to type -------------- */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_DESTINATIONS_REQUEST]: getDestinationsRequest,
  [Types.GET_DESTINATIONS_SUCCESS]: getDestinationsSuccess,
  [Types.GET_DESTINATIONS_FAILURE]: getDestinationsFailure,
});
