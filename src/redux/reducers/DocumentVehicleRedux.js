import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------------- Action Creators ------------- */
export const { Types, Creators } = createActions({
  // register document_vehicle
  postRegisterDocVehicleSuccess: ['data'],
  postRegisterDocVehicleFailure: null,
  postRegisterDocVehicleRequest: ['params'],
  postRegisterDocVehicleUnprocess: ['params'],
});

export const DocumentVehicleTypes = Types;
export default Creators;

export const INITIAL_STATE = Immutable({
  error: null,
  fetching: false,
  status: null,
  listDocuments: null,
  unprocess: false,
});

/* ----------------- Selectors ---------------- */
export const AuthSelectors = {
  getToken: state => state.user.session.access_token,
};

export const dropInitialState = (state) => {
  return {
    ...state,
    error: null,
    fetching: false,
    status: null,
    listDocuments: null,
    unprocess: false,
  };
};

/* ------------------------ Register document ---------------- */
export const postRegisterDocVehicleSuccess = (state, { data }) => {
  return {
    ...state,
    fetching: false,
    error: null,
    status: data,
  };
};

export const postRegisterDocVehicleFailure = (state) => {
  return {
    ...state,
    fetching: false,
    error: true,
  };
};

export const postRegisterDocVehicleUnprocess = (state) => {
  return {
    ...state,
    fetching: false,
    error: false,
    unprocess: true,
    status: true,
  };
};

export const postRegisterDocVehicleRequest = (state) => {
  return {
    ...state,
    fetching: true,
    error: false,
    status: null,
  };
};

/* ---------------------------- Reducers ------------------- */
export const reducer = createReducer(INITIAL_STATE, {
  // register document_vehicle
  [Types.POST_REGISTER_DOC_VEHICLE_SUCCESS]: postRegisterDocVehicleSuccess,
  [Types.POST_REGISTER_DOC_VEHICLE_FAILURE]: postRegisterDocVehicleFailure,
  [Types.POST_REGISTER_DOC_VEHICLE_REQUEST]: postRegisterDocVehicleRequest,
  [Types.POST_REGISTER_DOC_VEHICLE_UNPROCESS]: postRegisterDocVehicleUnprocess,
});
