/* eslint-disable arrow-body-style */
import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* -------------- Types and Actions Creators --------------- */

export const { Types, Creators } = createActions({
  getOffersRequest: ['params'],
  getOffersSuccess: ['data'],
  getOffersFailure: null,
});

export const OffersTypes = Types;
export default Creators;

/* ----------- INITIAL STATE ----------- */
export const INITIAL_STATE = Immutable({
  data: null,
  fetching: false,
  error: false,
});

/* ----------- Reducers ------------- */

export const getOffersRequest = (state) => {
  return {
    ...state,
    fetching: true,
    error: false,
  };
};

export const getOffersSuccess = (state, { data }) => {
  return {
    ...state,
    data,
    fetching: false,
    error: false,
  };
};

export const getOffersFailure = (state) => {
  return {
    ...state,
    fetching: false,
    error: true,
  };
};

/* --------------- Reducers to types ------------- */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_OFFERS_REQUEST]: getOffersRequest,
  [Types.GET_OFFERS_SUCCESS]: getOffersSuccess,
  [Types.GET_OFFERS_FAILURE]: getOffersFailure,
});
