import Immutable from 'seamless-immutable';
import { createReducer, createActions } from 'reduxsauce';


/* ------------------ Actions ------------------ */
export const { Types, Creators } = createActions({
  getProfileRequest: ['params'],
  getProfileSuccess: ['data'],
  getProfileFailure: null,
});

export const ProfileTypes = Types;
export default Creators;

/* ------------------ INITIAL STATE ------------------ */

export const INITIAL_STATE = Immutable({
  data: null,
  error: false,
  fetching: false,
});

/* ------------------ REDUCERS ------------------ */

export const getProfileRequest = state => ({
  ...state,
  fetching: true,
  error: false,
});

export const getProfileSuccess = (state, { data }) => ({
  ...state,
  fetching: false,
  data,
});

export const getProfileFailure = state => ({
  ...state,
  error: true,
  fetching: false,
});

/* ------------------ Reducers to types ------------------ */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_PROFILE_REQUEST]: getProfileRequest,
  [Types.GET_PROFILE_SUCCESS]: getProfileSuccess,
  [Types.GET_PROFILE_FAILURE]: getProfileFailure,
});
