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
  getDocsTypesRequest: ['params'],
  getDocsTypesSuccess: ['data'],
  getDocsTypesFailure: null,
  getDocsMeRequest: ['params'],
  getDocsMeSuccess: ['data'],
  getDocsMeFailure: null,
  removeDocRequest: ['id'],
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
  fetchingTypes: false,
  listTypes: null,
  listDocuments: null,
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


export const getDocsServiceSuccess = (state, { serviceDocuments }) => {
  return {
    ...state,
    fetching: false,
    error: false,
    serviceDocuments,
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

/* --------------- REMOVE DOC ---------------- */
export const removeDocRequest = (state) => {
  return {
    ...state,
    fetching: true,
    error: null,
    status: null,
  };
};

/* ---------------- GET list Documents Me -------------- */
export const getDocsMeSuccess = (state, { data }) => {
  return {
    ...state,
    fetching: false,
    error: false,
    listDocuments: data,
  };
};

export const getDocsMeFailure = (state) => {
  return {
    ...state,
    fetching: false,
    error: true,
    listDocuments: null,
  };
};

export const getDocsMeRequest = (state) => {
  return {
    ...state,
    fetching: true,
    error: false,
    listDocuments: null,
  };
};

/* ----------------- GET Documents Types ---------------- */
export const getDocsTypesSuccess = (state, { data }) => {
  return {
    ...state,
    fetchingTypes: false,
    error: false,
    listTypes: data,
  };
};

export const getDocsTypesFailure = (state) => {
  return {
    ...state,
    fetchingTypes: false,
    error: true,
    listTypes: null,
  };
};

export const getDocsTypesRequest = (state) => {
  return {
    ...state,
    fetchingTypes: true,
    error: false,
    listTypes: null,
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
  [Types.GET_DOCS_TYPES_SUCCESS]: getDocsTypesSuccess,
  [Types.GET_DOCS_TYPES_REQUEST]: getDocsTypesRequest,
  [Types.GET_DOCS_TYPES_FAILURE]: getDocsTypesFailure,
  [Types.GET_DOCS_ME_SUCCESS]: getDocsMeSuccess,
  [Types.GET_DOCS_ME_REQUEST]: getDocsMeRequest,
  [Types.GET_DOCS_ME_FAILURE]: getDocsMeFailure,
  [Types.REMOVE_DOC_REQUEST]: removeDocRequest,
});
