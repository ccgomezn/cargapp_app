import Immutable from 'seamless-immutable';
import { createReducer, createActions } from 'reduxsauce';

/* ACTIONS */
export const { Types, Creators } = createActions({
  getActivePrizesRequest: ['params'],
  getActivePrizesSuccess: ['data'],
  getActivePrizesFailure: ['params'],
});
export const PrizesTypes = Types;
export default Creators;

/* INITIAL STATE */
export const INITIAL_STATE = Immutable({
  data: null,
  fetching: false,
  error: false,
  activePrizes: null,
  me: null,
});

/* REDUCERS */
/* Active-Prizes */
export const getActivePrizesRequest = state => ({
  ...state,
  fetching: true,
  activePrizes: null,
});

export const getActivePrizesSuccess = (state, { data }) => ({
  ...state,
  fetching: false,
  error: false,
  activePrizes: data,
});

export const getActivePrizesFailure = state => ({
  ...state,
  fetching: false,
  error: true,
});

/* REDUCER TO TYPES */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_ACTIVE_PRIZES_REQUEST]: getActivePrizesRequest,
  [Types.GET_ACTIVE_PRIZES_SUCCESS]: getActivePrizesSuccess,
  [Types.GET_ACTIVE_PRIZES_FAILURE]: getActivePrizesFailure,
});
