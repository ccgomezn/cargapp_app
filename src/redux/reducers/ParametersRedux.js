import Immutable from 'seamless-immutable';
import { createReducer, createActions } from 'reduxsauce';

/* -------------------- Actions --------------------- */
export const { Types, Creators } = createActions({
  parametersRequest: ['params'],
  parametersSecondRequest: ['params'],
  parametersSuccess: ['data'],
  parametersSecondSuccess: ['data'],
  parametersFailure: null,

});

export const ParametersTypes = Types;
export default Creators;

/* ------------------- INITIAL STATE ------------------- */
export const INITIAL_STATE = Immutable({
  data: null,
  error: false,
  fetching: false,
  second: null,

});

/* -------------------- REDUCERS ------------------------ */

export const parametersRequest = state => ({
  ...state,
  fetching: true,
  error: false,
});

export const parametersSecondRequest = state => ({
  ...state,
  fetching: true,
  error: false,
});

export const parametersSuccess = (state, { data }) => ({
  ...state,
  fetching: false,
  data,
});

export const parametersSecondSuccess = (state, { data }) => ({
  ...state,
  fetching: false,
  second: data,
});

export const parametersFailure = state => ({
  ...state,
  error: true,
  fetching: false,
});

/* ---------------------- Reducers to type -------------- */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.PARAMETERS_REQUEST]: parametersRequest,
  [Types.PARAMETERS_SUCCESS]: parametersSuccess,
  [Types.PARAMETERS_FAILURE]: parametersFailure,
  [Types.PARAMETERS_SECOND_SUCCESS]: parametersSecondSuccess,
  [Types.PARAMETERS_SECOND_REQUEST]: parametersSecondRequest,

});
