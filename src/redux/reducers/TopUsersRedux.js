import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* -------------------- Actions --------------------- */
export const { Types, Creators } = createActions({
  getTopUsersRequest: ['params'],
  getTopUsersSuccess: ['data'],
  getTopUsersFailure: null,
});

export const TopTypes = Types;
export default Creators;

/* ------------------- INITIAL STATE ------------------- */
export const INITIAL_STATE = Immutable({
  data: null,
  error: false,
  toplist: null,
  topme: null,
  fetching: false,
});

/* -------------------- REDUCERS ------------------------ */
export const getTopUsersRequest = state => ({
  ...state,
  fetching: true,
  error: false,
  toplist: null,
  topme: null,
});

export const getTopUsersSuccess = (state, { data }) => ({
  ...state,
  fetching: false,
  toplist: data.users,
  topme: data.me,
});

export const getTopUsersFailure = state => ({
  ...state,
  fetching: false,
  error: true,
});

/* Actions to types */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_TOP_USERS_REQUEST]: getTopUsersRequest,
  [Types.GET_TOP_USERS_SUCCESS]: getTopUsersSuccess,
  [Types.GET_TOP_USERS_FAILURE]: getTopUsersFailure,
});
