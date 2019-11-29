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
  postRegisterDocServiceSuccess: ['data'],
  postRegisterDocServiceFailure: ['params'],
  postRegisterDocServiceRequest: ['params'],
  postRegisterDocServiceUnprocess: ['params'],
  getDocsServiceSuccess: ['serviceDocuments'],
  getDocsServiceFailure: ['params'],
  getDocsServiceRequest: ['id'],
});

export const DocumentTypes = Types;
export default Creators;

/* ---------------- Initial State -------------- */
export const INITIAL_STATE = Immutable({
  error: null,
  fetching: false,
  status: null, // respuesta success
  unprocess: false,
  serviceDocuments: null,
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

export const postRegisterDocServiceSuccess = (state, { data }) => {
  return {
    ...state,
    fetching: false,
    error: false,
    status: data,
  };
};

export const postRegisterDocServiceFailure = (state) => {
  return {
    ...state,
    fetching: false,
    error: true,
  };
};

export const postRegisterDocServiceUnprocess = (state) => {
  return {
    ...state,
    fetching: false,
    error: false,
    unprocess: true,
    status: true,
  };
};

export const postRegisterDocServiceRequest = (state) => {
  return {
    ...state,
    fetching: true,
    error: false,
    status: null,
  };
};


export const getDocsServiceSuccess = (state, {serviceDocuments}) => {
  return {
    ...state,
    fetching: false,
    error: false,
    serviceDocuments
  };
};

export const getDocsServiceFailure = (state) => {
  return {
    ...state,
    fetching: false,
    error: true,
  };
};

export const getDocsServiceRequest = (state) => {
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
  [Types.POST_REGISTER_DOC_SERVICE_SUCCESS]: postRegisterDocServiceSuccess,
  [Types.POST_REGISTER_DOC_SERVICE_FAILURE]: postRegisterDocServiceFailure,
  [Types.POST_REGISTER_DOC_SERVICE_REQUEST]: postRegisterDocServiceRequest,
  [Types.POST_REGISTER_DOC_SERVICE_UNPROCESS]: postRegisterDocServiceUnprocess,
  [Types.GET_DOCS_SERVICE_SUCCESS]: getDocsServiceSuccess,
  [Types.GET_DOCS_SERVICE_FAILURE]: getDocsServiceFailure,
  [Types.GET_DOCS_SERVICE_REQUEST]: getDocsServiceRequest,
});
