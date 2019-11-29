import Immutable from 'seamless-immutable';
import { createReducer, createActions } from 'reduxsauce';

/* -------------------- Actions --------------------- */
export const { Types, Creators } = createActions({
  postRateServiceRequest: ['data'],
  postRateServiceSuccess: ['data'],
  postRateServiceFailure: ['params'],
});

export const RateTypes = Types;
export default Creators;

/* ------------------- INITIAL STATE ------------------- */
export const INITIAL_STATE = Immutable({
  data: null,
  error: false,
  fetching: false,
});

/* -------------------- REDUCERS ------------------------ */
export const postRateServiceRequest = state => ({
  ...state,
  fetching: true,
  error: false,
});

export const postRateServiceSuccess = (state, { data }) => ({
  ...state,
  fetching: false,
  data,
});

export const postRateServiceFailure = state => ({
  ...state,
  error: true,
  fetching: false,
});

/* ---------------------- Reducers to type -------------- */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.POST_RATE_SERVICE_REQUEST]: postRateServiceRequest,
  [Types.POST_RATE_SERVICE_SUCCESS]: postRateServiceSuccess,
  [Types.POST_RATE_SERVICE_FAILURE]: postRateServiceFailure,
});
