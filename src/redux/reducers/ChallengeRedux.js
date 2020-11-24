import Immutable from 'seamless-immutable';
import { createReducer, createActions } from 'reduxsauce';

/* -------------------- Actions --------------------- */
export const { Types, Creators } = createActions({
  getActiveChallengeRequest: ['params'],
  getActiveChallengeSuccess: ['data'],
  getActiveChallengeFailure: ['params'],
  getMeChallengeRequest: ['params'],
  getMeChallengeSuccess: ['data'],
  getMeChallengeFailure: ['params'],
});
export const ChallengeTypes = Types;
export default Creators;

/* INITIAL STATE */

export const INITIAL_STATE = Immutable({
  data: null,
  fetching: false,
  error: false,
  activeChallenge: null,
  me: null,
});

/* REDUCERS */
/* Active challenges */
export const getActiveChallengeRequest = state => ({
  ...state,
  fetching: true,
  activeChallenge: null,
});

export const getActiveChallengeSuccess = (state, { data }) => ({
  ...state,
  fetching: false,
  error: false,
  activeChallenge: data,
});

export const getActiveChallengeFailure = state => ({
  ...state,
  fetching: false,
  error: true,
});

/* Me challenges */
export const getMeChallengeRequest = state => ({
  ...state,
  fetching: true,
  me: null,
});

export const getMeChallengeSuccess = (state, { data }) => ({
  ...state,
  fetching: false,
  error: false,
  me: data,
});

export const getMeChallengeFailure = state => ({
  ...state,
  fetching: false,
  error: true,
});

/* REDUCER TO TYPES */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_ACTIVE_CHALLENGE_REQUEST]: getActiveChallengeRequest,
  [Types.GET_ACTIVE_CHALLENGE_SUCCESS]: getActiveChallengeSuccess,
  [Types.GET_ACTIVE_CHALLENGE_FAILURE]: getActiveChallengeFailure,
  [Types.GET_ME_CHALLENGE_REQUEST]: getMeChallengeRequest,
  [Types.GET_ME_CHALLENGE_SUCCESS]: getMeChallengeSuccess,
  [Types.GET_ME_CHALLENGE_FAILURE]: getMeChallengeFailure,
});
