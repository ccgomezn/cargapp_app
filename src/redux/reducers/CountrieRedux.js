/* eslint-disable arrow-body-style */
import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* -------------- Types and Actions Creators --------------- */
export const { Types, Creators } = createActions({
  postCountriesRequest: ['params'],
  postCountriesSuccess: ['data'],
  postCountriesFailure: null,
});

export const CountrieTypes = Types;
export default Creators;

/* ----------- INITIAL STATE ----------- */
export const INITIAL_STATE = Immutable({
  data: null,
  fetching: false,
  error: false,
});

/* ----------- Reducers ------------- */
export const postCountriesSuccess = (state, { data }) => {
  return {
    ...state,
    fetching: false,
    error: false,
    data,
  };
};

export const postCountriesFailure = (state) => {
  return {
    ...state,
    fetching: false,
    error: true,
  };
};

export const postCountriesRequest = (state) => {
  return {
    ...state,
    fetching: false,
    error: false,
  };
};

/* --------------- Reducers to types ------------- */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.POST_COUNTRIES_FAILURE]: postCountriesFailure,
  [Types.POST_COUNTRIES_SUCCESS]: postCountriesSuccess,
  [Types.POST_COUNTRIES_REQUEST]: postCountriesRequest,
});
