/* eslint-disable arrow-body-style */
import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* -------------- Types and Actions Creators --------------- */

export const { Types, Creators } = createActions({
  getOffersRequest: ['params'],
  postApplyOfferRequest: ['service'],
  getMyOffersRequest: ['id'],
  getServicesRequest: ['params'],
  getServicesSuccess: ['data'],
  getMyOffersSuccess: ['myOffers'],
  putStateInTravelOriginSuccess: ['data'],
  putStateInTravelOriginRequest: ['id', 'data'],
  postApplyOfferSuccess: ['service'],
  getOffersSuccess: ['data'],
  getOffersFailure: null,
  dropInitialState: ['params'],
});

export const OffersTypes = Types;
export default Creators;

/* ----------- INITIAL STATE ----------- */
export const INITIAL_STATE = Immutable({
  data: null,
  fetching: false,
  error: false,
  service: null,
  myOffers: null,
  services: null,
  statusTravelOrigin: null,
});

/* ----------- Reducers ------------- */
export const dropInitialState = (state) => {
  return {
    ...state,
    error: false,
    fetching: false,
    data: null,
    myOffers: null,
    services: null,
  };
};

export const getOffersRequest = (state) => {
  return {
    ...state,
    fetching: true,
    error: false,
  };
};

export const putStateInTravelOriginRequest = (state) => {
  return {
    ...state,
    fetching: true,
    error: false,
  };
};

export const putStateInTravelOriginSuccess = (state, { data }) => {
  return {
    ...state,
    fetching: false,
    statusTravelOrigin: data,
    error: false,
  };
};

export const postApplyOfferRequest = (state) => {
  return {
    ...state,
    fetching: true,
    error: false,
  };
};

export const getMyOffersRequest = (state) => {
  return {
    ...state,
    fetching: true,
    error: false,
  };
};

export const getServicesRequest = (state) => {
  return {
    ...state,
    fetching: true,
    error: false,
  };
};

export const getServicesSuccess = (state, { data }) => {
  return {
    ...state,
    fetching: false,
    services: data,
  };
};

export const getMyOffersSuccess = (state, { myOffers }) => {
  return {
    ...state,
    myOffers,
    fetching: false,
  };
};

export const postApplyOfferSuccess = (state, { service }) => {
  return {
    ...state,
    fetching: false,
    service,
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
  [Types.POST_APPLY_OFFER_REQUEST]: postApplyOfferRequest,
  [Types.POST_APPLY_OFFER_SUCCESS]: postApplyOfferSuccess,
  [Types.GET_MY_OFFERS_REQUEST]: getMyOffersRequest,
  [Types.GET_MY_OFFERS_SUCCESS]: getMyOffersSuccess,
  [Types.GET_SERVICES_REQUEST]: getServicesRequest,
  [Types.GET_SERVICES_SUCCESS]: getServicesSuccess,
  [Types.PUT_STATE_IN_TRAVEL_ORIGIN_REQUEST]: putStateInTravelOriginRequest,
  [Types.PUT_STATE_IN_TRAVEL_ORIGIN_SUCCESS]: putStateInTravelOriginSuccess,
  [Types.DROP_INITIAL_STATE]: dropInitialState,
});
