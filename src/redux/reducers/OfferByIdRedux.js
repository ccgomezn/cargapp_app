import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* -------------------- Actions --------------------- */
export const { Types, Creators } = createActions({
  getOfferByIdRequest: ['id'],
  getOfferByIdSuccess: ['data'],
  getOfferByIdFailure: null,
});
export const OfferByIdTypes = Types;
export default Creators;

/* INITIAL STATE */

export const INITIAL_STATE = Immutable({
  data: null,
  fetching: false,
  error: false,
});

/* REDUCERS */

export const getOfferByIdRequest = state => ({
  ...state,
  fetching: true,
  data: null,
});

export const getOfferByIdSuccess = (state, { data }) => ({
  ...state,
  data,
  error: false,
  fetching: false,
});

export const getOfferByIdFailure = state => ({
  ...state,
  fetching: false,
  error: true,
});

/* REDUCER TO TYPES */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_OFFER_BY_ID_REQUEST]: getOfferByIdRequest,
  [Types.GET_OFFER_BY_ID_SUCCESS]: getOfferByIdSuccess,
  [Types.GET_OFFER_BY_ID_FAILURE]: getOfferByIdFailure,
});
