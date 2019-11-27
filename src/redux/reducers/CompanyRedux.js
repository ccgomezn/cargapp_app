/* eslint-disable arrow-body-style */
import Immutable from 'seamless-immutable';
import { createActions, createReducer } from 'reduxsauce';

export const { Types, Creators } = createActions({
  getCompaniesRequest: ['params'],
  getCompaniesSuccess: ['data'],
  getCompaniesFailure: null,
  postRegCompaniesSuccess: ['data'],
  postRegCompaniesRequest: ['params'],
  postRegCompaniesFailure: ['params'],
  postRegCompaniesUnprocess: ['params'],
});

export const CompanyTypes = Types;
export default Creators;

/* -------------- INITIAL STATE --------------- */

export const INITIAL_STATE = Immutable({
  data: null,
  error: false,
  fetching: false,
  unprocess: false,
  status: null, // respuesta success
});

/* --------------  Reducers --------------- */

/* --------------- Get companies ------------- */
export const getCompaniesRequest = state => ({
  ...state,
  fetching: true,
  error: false,
});

export const getCompaniesSuccess = (state, { data }) => ({
  ...state,
  fetching: false,
  data,
  error: false,
});

export const getCompaniesFailure = state => ({
  ...state,
  error: true,
});

/* ---------------- Register companies ----------- */
export const postRegCompaniesSuccess = (state, { data }) => {
  return {
    ...state,
    fetching: false,
    error: false,
    status: data,
  };
};

export const postRegCompaniesFailure = (state) => {
  return {
    ...state,
    fetching: false,
    error: true,
    status: null,
  };
};

export const postRegCompaniesUnprocess = (state) => {
  return {
    ...state,
    fetching: false,
    error: false,
    unprocess: true,
    status: true,
  };
};

export const postRegCompaniesRequest = (state) => {
  return {
    ...state,
    fetching: true,
    error: false,
    status: null,
  };
};
/* -------------- Reducers to Actions -------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_COMPANIES_REQUEST]: getCompaniesRequest,
  [Types.GET_COMPANIES_SUCCESS]: getCompaniesSuccess,
  [Types.GET_COMPANIES_FAILURE]: getCompaniesFailure,
  [Types.POST_REG_COMPANIES_SUCCESS]: postRegCompaniesSuccess,
  [Types.POST_REG_COMPANIES_FAILURE]: postRegCompaniesFailure,
  [Types.POST_REG_COMPANIES_REQUEST]: postRegCompaniesRequest,
  [Types.POST_REG_COMPANIES_UNPROCESS]: postRegCompaniesUnprocess,
});
