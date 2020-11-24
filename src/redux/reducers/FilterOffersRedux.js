import Immutable from 'seamless-immutable';
import { createActions, createReducer } from  'reduxsauce';

/* ---------- ACTIONS ---------- */
export const { Types, Creators } = createActions({
  getOffersByFilterRequest: ['data'],
  getOffersByFilterSuccess: ['data'],
  getOffersByFilterFailure: null,
});

export const FilterTypes = Types;
export default Creators;

/* ---------- INITIAL STATE ----------- */
export const INITIAL_STATE = Immutable({
  fetching: false,
  error: null,
  data: null,
});

/* ---------- REDUCERS ---------- */

export const getOffersByFilterRequest = state => ({
  ...state,
  fetching: true,
  error: false,
});

export const getOffersByFilterSuccess = (state, { data }) => ({
  ...state,
  fetching: false,
  data,
});

export const getOffersByFilterFailure = state => ({
  ...state,
  fetching: false,
  error: true,
});

/* --------- REDUCERS TO ACTIONS ---------- */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_OFFERS_BY_FILTER_REQUEST]: getOffersByFilterRequest,
  [Types.GET_OFFERS_BY_FILTER_SUCCESS]: getOffersByFilterSuccess,
  [Types.GET_OFFERS_BY_FILTER_FAILURE]: getOffersByFilterFailure,
});
