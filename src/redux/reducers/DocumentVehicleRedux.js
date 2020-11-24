import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------------- Action Creators ------------- */
export const { Types, Creators } = createActions({
  // register document_vehicle
  postRegisterDocVehicleSuccess: ['data'],
  postRegisterDocVehicleFailure: null,
  postRegisterDocVehicleRequest: ['params'],
  postRegisterDocVehicleUnprocess: ['params'],
  // get document_vehicle me
  getDocsVehicleMeRequest: ['idVehicle'],
  getDocsVehicleMeSuccess: ['data'],
  getDocsVehicleMeFailure: null,
  // delete document_vehicle
  removeDocVehicleRequest: ['id'],
});

export const DocumentVehicleTypes = Types;
export default Creators;

export const INITIAL_STATE = Immutable({
  error: null,
  fetching: false,
  status: null,
  fetchingList: false,
  listDocuments: null,
  unprocess: false,
});

/* ----------------- Selectors ---------------- */
export const AuthSelectors = {
  getToken: state => state.user.session.access_token,
};

export const dropInitialState = state => ({
  ...state,
  error: null,
  fetching: false,
  status: null,
  fetchingList: false,
  listDocuments: null,
  unprocess: false,
});

/* ------------------------ Register document ---------------- */
export const postRegisterDocVehicleSuccess = (state, { data }) => ({
  ...state,
  fetching: false,
  error: null,
  status: data,
});

export const postRegisterDocVehicleFailure = state => ({
  ...state,
  fetching: false,
  error: true,
});

export const postRegisterDocVehicleUnprocess = state => ({
  ...state,
  fetching: false,
  error: false,
  unprocess: true,
  status: true,
});

export const postRegisterDocVehicleRequest = state => ({
  ...state,
  fetching: true,
  error: false,
  status: null,
});

/* ---------------- GET list Documents Me -------------- */
export const getDocsVehicleMeSuccess = (state, { data }) => ({
  ...state,
  fetchingList: false,
  error: false,
  listDocuments: data,
});

export const getDocsVehicleMeFailure = state => ({
  ...state,
  fetchingList: false,
  error: true,
  listDocuments: null,
});

export const getDocsVehicleMeRequest = state => ({
  ...state,
  fetchingList: true,
  error: false,
  listDocuments: null,
});

/* --------------- REMOVE DOC ---------------- */
export const removeDocVehicleRequest = state => ({
  ...state,
  fetching: true,
  error: null,
  status: null,
});

/* ---------------------------- Reducers ------------------- */
export const reducer = createReducer(INITIAL_STATE, {
  // register document_vehicle
  [Types.POST_REGISTER_DOC_VEHICLE_SUCCESS]: postRegisterDocVehicleSuccess,
  [Types.POST_REGISTER_DOC_VEHICLE_FAILURE]: postRegisterDocVehicleFailure,
  [Types.POST_REGISTER_DOC_VEHICLE_REQUEST]: postRegisterDocVehicleRequest,
  [Types.POST_REGISTER_DOC_VEHICLE_UNPROCESS]: postRegisterDocVehicleUnprocess,
  [Types.GET_DOCS_VEHICLE_ME_SUCCESS]: getDocsVehicleMeSuccess,
  [Types.GET_DOCS_VEHICLE_ME_FAILURE]: getDocsVehicleMeFailure,
  [Types.GET_DOCS_VEHICLE_ME_REQUEST]: getDocsVehicleMeRequest,
  [Types.REMOVE_DOC_VEHICLE_REQUEST]: removeDocVehicleRequest,
});
