import Immutable from 'seamless-immutable';
import { createReducer, createActions } from 'reduxsauce';

/* -------------------- Actions --------------------- */
export const { Types, Creators } = createActions({
  postEvidenceRequest: ['params'],
  postEvidenceSuccess: ['data'],
  postEvidenceFailure: ['params'],
});
export const MarkersTypes = Types;
export default Creators;

/* INITIAL STATE */

export const INITIAL_STATE = Immutable({
  data: null,
  fetching: false,
  error: false,
});

/* REDUCERS */

export const postEvidenceRequest = state => ({
  ...state,
  fetching: true,
});

export const postEvidenceSuccess = (state, { data }) => ({
  ...state,
  data,
  error: false,
  fetching: false,
});

export const postEvidenceFailure = state => ({
  ...state,
  fetching: false,
  error: true,
});

/* REDUCER TO TYPES */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.POST_EVIDENCE_REQUEST]: postEvidenceRequest,
  [Types.POST_EVIDENCE_SUCCESS]: postEvidenceSuccess,
  [Types.POST_EVIDENCE_FAILURE]: postEvidenceFailure,
});
