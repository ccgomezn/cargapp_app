import Immutable from 'seamless-immutable';
import { createReducer, createActions } from 'reduxsauce';

/* -------------------- Actions --------------------- */
export const { Types, Creators } = createActions({
  postBankAccountRequest: ['params'],
  postBankAccountSuccess: ['data'],
  parametersRequest: ['data'],
  parametersSuccess: ['data'],
  postBankAccountFailure: ['params'],
});

export const BankAccountTypes = Types;
export default Creators;

/* ------------------- INITIAL STATE ------------------- */
export const INITIAL_STATE = Immutable({
  data: null,
  error: false,
  fetching: false,
  banks: null,
});

/* -------------------- REDUCERS ------------------------ */
export const postBankAccountRequest = state => ({
  ...state,
  fetching: true,
  error: false,
});

export const parametersRequest = state => ({
  ...state,
  fetching: true,
  error: false,
});

export const parametersSuccess = (state, { data }) => ({
  ...state,
  fetching: false,
  banks: data,
});

export const postBankAccountSuccess = (state, { data }) => ({
  ...state,
  fetching: false,
  data,
});

export const postBankAccountFailure = state => ({
  ...state,
  error: true,
  fetching: false,
});

/* ---------------------- Reducers to type -------------- */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.POST_BANK_ACCOUNT_REQUEST]: postBankAccountRequest,
  [Types.POST_BANK_ACCOUNT_SUCCESS]: postBankAccountSuccess,
  [Types.POST_BANK_ACCOUNT_FAILURE]: postBankAccountFailure,
  [Types.PARAMETERS_REQUEST]: parametersRequest,
  [Types.PARAMETERS_SUCCESS]: parametersSuccess,
});
