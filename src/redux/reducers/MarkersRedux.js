import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';


/* -------------------- Actions --------------------- */
export const { Types, Creators } = createActions({
  getMarkersRequest: ['params'],
  getMarkersSuccess: ['data'],
  getMarkersFailure: ['params'],
});
export const MarkersTypes = Types;
export default Creators;

/* INITIAL STATE */

export const INITIAL_STATE = Immutable({
  data: null,
  fetching: false,
  error: false,
});

/* REDUCERS */

export const getMarkersRequest = state => ({
  ...state,
  fetching: true,
});

export const getMarkersSuccess = (state, { data }) => ({
  ...state,
  data,
  error: false,
  fetching: false,
});

export const getMarkersFailure = state => ({
  ...state,
  fetching: false,
  error: true,
});

/* REDUCER TO TYPES */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_MARKERS_REQUEST]: getMarkersRequest,
  [Types.GET_MARKERS_SUCCESS]: getMarkersSuccess,
  [Types.GET_MARKERS_FAILURE]: getMarkersFailure,
});
