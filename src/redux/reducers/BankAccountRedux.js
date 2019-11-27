import Immutable from 'seamless-immutable';
import { createReducer, createActions } from 'reduxsauce';

/* -------------------- Actions --------------------- */
export const { Types, Creators } = createActions({
  getBankAccountRequest: ['params'],
  getBankAccountSuccess: ['data'],
  postBankAccountRequest: ['data'],
  postBankAccountSuccess: ['data'],
  postBankAccountFailure: ['params'],
  putBankAccountRequest: ['id', 'data'],
  putBankAccountSuccess: ['data'],
});

export const BankAccountTypes = Types;
export default Creators;

/* ------------------- INITIAL STATE ------------------- */
export const INITIAL_STATE = Immutable({
  data: null,
  error: false,
  fetching: false,
  accounts: null,
  edit: null,
});

/* -------------------- REDUCERS ------------------------ */
export const postBankAccountRequest = state => ({
  ...state,
  fetching: true,
  error: false,
});

export const putBankAccountRequest = state => ({
  ...state,
  fetching: true,
  error: false,
});

export const getBankAccountRequest = state => ({
  ...state,
  fetching: true,
  error: false,
});

export const putBankAccountSuccess = (state, { data }) => ({
  ...state,
  fetching: false,
  edit: data,
});

export const getBankAccountSuccess = (state, { data }) => ({
  ...state,
  fetching: false,
  data,
});

export const postBankAccountSuccess = (state, { data }) => ({
  ...state,
  fetching: false,
  accounts: data,
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
  [Types.GET_BANK_ACCOUNT_SUCCESS]: getBankAccountSuccess,
  [Types.GET_BANK_ACCOUNT_REQUEST]: getBankAccountRequest,
  [Types.PUT_BANK_ACCOUNT_REQUEST]: putBankAccountRequest,
  [Types.PUT_BANK_ACCOUNT_SUCCESS]: putBankAccountSuccess,
});
