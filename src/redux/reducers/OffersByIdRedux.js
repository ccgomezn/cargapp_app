import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';


/* -------------------- Actions --------------------- */
export const { Types, Creators } = createActions({
  getOffersByIdRequest: ['id'],
  getOffersByIdSuccess: ['data'],
  getOffersByIdFailure: null,
});
export const OffersByIdTypes = Types;
export default Creators;

/* INITIAL STATE */

export const INITIAL_STATE = Immutable({
  data: null,
  fetching: false,
  error: false,
});

/* REDUCERS */

export const getOffersByIdRequest = state => ({
  ...state,
  fetching: true,
});

export const getOffersByIdSuccess = (state, { data }) => ({
  ...state,
  data,
  error: false,
  fetching: false,
});

export const getOffersByIdFailure = state => ({
  ...state,
  fetching: false,
  error: true,
});

/* REDUCER TO TYPES */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_OFFERS_BY_ID_REQUEST]: getOffersByIdRequest,
  [Types.GET_OFFERS_BY_ID_SUCCESS]: getOffersByIdSuccess,
  [Types.GET_OFFERS_BY_ID_FAILURE]: getOffersByIdFailure,
});
