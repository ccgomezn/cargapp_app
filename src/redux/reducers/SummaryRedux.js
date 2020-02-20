import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ACTIONS */
export const { Types, Creators } = createActions({
  getSummaryRequest: ['id'],
  getSummarySuccess: ['data'],
  summaryFailure: null,
});

export const SummaryTypes = Types;
export default Creators;

/* INITIAL STATE */

export const INITIAL_STATE = Immutable({
  data: null,
  fetching: false,
  error: false,
});

/* REDUCERS */

export const getSummaryRequest = state => ({
  ...state,
  fetching: true,
});

export const getSummarySuccess = (state, { data }) => ({
  ...state,
  fetching: false,
  data,
});

export const summaryFailure = state => ({
  ...state,
  fetching: false,
  error: true,
});

/* Actions to types */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_SUMMARY_REQUEST]: getSummaryRequest,
  [Types.GET_SUMMARY_SUCCESS]: getSummarySuccess,
  [Types.SUMMARY_FAILURE]: summaryFailure,
});
