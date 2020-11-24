import Inmutable from 'seamless-immutable';
import { createActions, createReducer } from 'reduxsauce';

export const { Types, Creators } = createActions({
  getPermissionSuccess: ['data'],
  getPermissionFailure: null,
  getPermissionRequest: ['params'],
});

export const PermissionTypes = Types;
export default Creators;

/* -------------- INITIAL STATE ------------- */
export const INITIAL_STATE = Inmutable({
  data: null,
  error: false,
  fetching: false,
});

/* ------------------ Reducers ------------------ */

/* ------------------- get permission_role ------------*/
export const getPermissionRequest = state => ({
  ...state,
  fetching: true,
  error: false,
  data: null,
});

export const getPermissionFailure = state => ({
  ...state,
  fetching: false,
  error: true,
  data: null,
});

export const getPermissionSuccess = (state, { data }) => ({
  ...state,
  data,
  fetching: false,
  error: false,
});

/* ----------------------- Reducers to Actions -------------- */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_PERMISSION_REQUEST]: getPermissionRequest,
  [Types.GET_PERMISSION_SUCCESS]: getPermissionSuccess,
  [Types.GET_PERMISSION_FAILURE]: getPermissionFailure,
});
