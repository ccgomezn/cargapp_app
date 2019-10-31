import Immutable from 'seamless-immutable';
import { createActions, createReducer } from 'reduxsauce';

export const { Types, Creators } = createActions({
  getCompaniesRequest: ['params'],
  getCompaniesSuccess: ['data'],
  getCompaniesFailure: null,
});

export const CompanyTypes = Types;
export default Creators;

/* -------------- INITIAL STATE --------------- */

export const INITIAL_STATE = Immutable({
  data: null,
  error: false,
  fetching: false,
});

/* --------------  Reducers --------------- */

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

/* -------------- Reducers to Actions -------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_COMPANIES_REQUEST]: getCompaniesRequest,
  [Types.GET_COMPANIES_SUCCESS]: getCompaniesSuccess,
  [Types.GET_COMPANIES_FAILURE]: getCompaniesFailure,
});
