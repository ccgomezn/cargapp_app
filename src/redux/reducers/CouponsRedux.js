import { createActions, createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';

export const { Types, Creators } = createActions({
  getCouponsRequest: ['params'],
  getCouponsSuccess: ['data'],
  postCouponsRequest: ['data'],
  postCouponsSuccess: ['data'],
  couponsFailure: null,
});

export const CouponsTypes = Types;
export default Creators;

/* INITIAL STATE */

export const INITIAL_STATE = Immutable({
  data: null,
  fetching: false,
  error: null,
});

/* Reducers */

export const getCouponsRequest = state => ({
  ...state,
  fetching: true,
  error: false,
});

export const postCouponsRequest = state => ({
  ...state,
  fetching: true,
  error: false,
});

export const postCouponsSuccess = (state, { data }) => ({
  ...state,
  fetching: false,
  data,
});

export const getCouponsSuccess = (state, { data }) => ({
  ...state,
  data,
  error: false,
  fetching: false,
});

export const couponsFailure = state => ({
  ...state,
  fetching: false,
  error: true,
});

/* Reducers to types */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_COUPONS_REQUEST]: getCouponsRequest,
  [Types.POST_COUPONS_REQUEST]: postCouponsRequest,
  [Types.POST_COUPONS_SUCCESS]: postCouponsSuccess,
  [Types.GET_COUPONS_SUCCESS]: getCouponsSuccess,
  [Types.COUPONS_FAILURE]: couponsFailure,
});
