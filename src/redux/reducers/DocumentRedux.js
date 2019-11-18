/* eslint-disable arrow-body-style */
import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* -------------- Action Creators -------------- */
export const { Types, Creators } = createActions({
// register document
  postRegisterDocSuccess: ['data'],
  postRegisterDocFailure: ['params'],
  postRegisterDocRequest: ['params'],
  postRegisterDocUnprocess: ['params'],
});

export const DocumentTypes = Types;
export default Creators;

/* ---------------- Initial State -------------- */
export const INITIAL_STATE = Immutable({
  error: null,
  fetching: false,
  status: null, // respuesta success
  unprocess: false,
});

/* ----------------- Selectors ---------------- */
export const AuthSelectors = {
  getToken: state => state.user.session.access_token,
};

/* ---------------- Register document -------------- */
export const postRegisterDocSuccess = (state, { data }) => {
  return {
    ...state,
    fetching: false,
    error: false,
    status: data,
  };
};

export const postRegisterDocFailure = (state) => {
  return {
    ...state,
    fetching: false,
    error: true,
  };
};

export const postRegisterDocUnprocess = (state) => {
  return {
    ...state,
    fetching: false,
    error: false,
    unprocess: true,
    status: true,
  };
};

export const postRegisterDocRequest = (state) => {
  return {
    ...state,
    fetching: true,
    error: false,
    status: null,
  };
};

/* --------------- Reducers ----------- */
export const reducer = createReducer(INITIAL_STATE, {
  // register document
  [Types.POST_REGISTER_DOC_SUCCESS]: postRegisterDocSuccess,
  [Types.POST_REGISTER_DOC_FAILURE]: postRegisterDocFailure,
  [Types.POST_REGISTER_DOC_REQUEST]: postRegisterDocRequest,
  [Types.POST_REGISTER_DOC_UNPROCESS]: postRegisterDocUnprocess,
});
