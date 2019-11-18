import Immutable from 'seamless-immutable';
import { createActions, createReducer } from 'reduxsauce';

export const { Types, Creators } = createActions({
  postRegPaymentSuccess: ['data'],
  postRegPaymentRequest: ['params'],
  postRegPaymentFailure: ['params'],
  postRegPaymentUnprocess: ['params'],
  getPaymentMethodSuccess: ['data'],
  getPaymentMethodFailure: ['params'],
  getPaymentMethodRequest: ['params'],
});

export const PaymentTypes = Types;
export default Creators;

/* --------------- INITIAL STATE ------------- */
export const INITIAL_STATE = Immutable({
  data: null,
  error: false,
  fetching: false,
  unprocess: false,
  status: null,
});

/* ------------------- Reducers ----------------- */

/* -------------------- Add user_payment ---------------- */
export const postRegPaymentRequest = state => ({
  ...state,
  fetching: true,
  error: false,
  status: null,
});

export const postRegPaymentSuccess = (state, { data }) => ({
  ...state,
  fetching: false,
  status: data,
  error: false,
});

export const postRegPaymentFailure = state => ({
  ...state,
  fetching: false,
  error: true,
  status: null,
});

export const postRegPaymentUnprocess = state => ({
  ...state,
  fetching: false,
  error: false,
  unprocess: true,
  status: true,
});

/* ------------------- get Payment_method ------------------ */
export const getPaymentMethodRequest = state => ({
  ...state,
  fetching: true,
  error: false,
});

export const getPaymentMethodSuccess = (state, { data }) => ({
  ...state,
  fetching: false,
  data,
});

export const getPaymentMethodFailure = state => ({
  ...state,
  error: true,
  fetching: false,
});

/* ------------------- Reducers to Actions ----------------- */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.POST_REG_PAYMENT_REQUEST]: postRegPaymentRequest,
  [Types.POST_REG_PAYMENT_SUCCESS]: postRegPaymentSuccess,
  [Types.POST_REG_PAYMENT_FAILURE]: postRegPaymentFailure,
  [Types.POST_REG_PAYMENT_UNPROCESS]: postRegPaymentUnprocess,
  [Types.GET_PAYMENT_METHOD_REQUEST]: getPaymentMethodRequest,
  [Types.GET_PAYMENT_METHOD_SUCCESS]: getPaymentMethodSuccess,
  [Types.GET_PAYMENT_METHOD_FAILURE]: getPaymentMethodFailure,
});
