/* eslint-disable arrow-body-style */
import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* -------------- Action Creators -------------- */
export const { Types, Creators } = createActions({
  onUserLogin: ['data'],
  onUserLogout: ['params'],
  // verify Phone
  postVerifySuccess: ['data'],
  postUserFailure: ['params'],
  postVerifyRequest: ['params'],
  // validate Pin
  postValidateSuccess: ['data'],
  postValidateFailure: ['params'],
  postValidateRequest: ['params'],
  // register User
  postRegisterSuccess: ['data'],
  postRegisterFailure: ['params'],
  postRegisterRequest: ['params'],
  postRegisterUnprocess: ['params'],
  // register Role
  postRegisterRoleRequest: ['params'],
});

export const UserTypes = Types;
export default Creators;

/* ---------------- Initial State -------------- */
export const INITIAL_STATE = Immutable({
  isLogged: false,
  info: null, // data session
  error: null,
  token: null,
  isFirts: 0,
  fetching: false,
  status: null, // respuesta verify
  unprocess: false,
});

export const onUserLogin = (state, { data }) => {
  return {
    ...state,
    isLogged: true,
    error: false,
    info: data,
    isFirts: state.isFirts + 1,
  };
};

export const onUserLogout = (state) => {
  return {
    ...state,
    isLogged: false,
    error: false,
    info: null,
  };
};

/* -------------- Verify phone --------- */
export const postVerifySuccess = (state, { data }) => {
  return {
    ...state,
    fetching: false,
    error: false,
    status: data,
  };
};

export const postUserFailure = (state) => {
  return {
    ...state,
    fetching: false,
    error: true,
  };
};

export const postVerifyRequest = (state) => {
  return {
    ...state,
    fetching: true,
    error: false,
  };
};

/* -------------- Validate pin --------- */
export const postValidateSuccess = (state, { data }) => {
  return {
    ...state,
    fetching: false,
    error: false,
    status: data,
  };
};

export const postValidateFailure = (state) => {
  return {
    ...state,
    fetching: false,
    error: true,
  };
};

export const postValidateRequest = (state) => {
  return {
    ...state,
    fetching: true,
    error: false,
    status: null,
  };
};

/* ---------------- Register User -------------- */
export const postRegisterSuccess = (state, { data }) => {
  return {
    ...state,
    fetching: false,
    error: false,
    status: data,
  };
};

export const postRegisterFailure = (state) => {
  return {
    ...state,
    fetching: false,
    error: true,
  };
};

export const postRegisterUnprocess = (state) => {
  return {
    ...state,
    fetching: false,
    error: false,
    unprocess: true,
    status: true,
  };
};

export const postRegisterRequest = (state) => {
  return {
    ...state,
    fetching: true,
    error: false,
    status: null,
  };
};

/* --------------- Register Role ----------- */
export const postRegisterRoleRequest = (state) => {
  return {
    ...state,
    fetching: true,
    error: false,
    status: null,
  };
};

/* --------------- Reducers ----------- */
export const reducer = createReducer(INITIAL_STATE, {
  // Session User
  [Types.ON_USER_LOGIN]: onUserLogin,
  [Types.ON_USER_LOGOUT]: onUserLogout,
  // Verify Phone
  [Types.POST_VERIFY_SUCCESS]: postVerifySuccess,
  [Types.POST_USER_FAILURE]: postUserFailure,
  [Types.POST_VERIFY_REQUEST]: postVerifyRequest,
  // Validate Pin
  [Types.POST_VALIDATE_SUCCESS]: postValidateSuccess,
  [Types.POST_VALIDATE_FAILURE]: postValidateFailure,
  [Types.POST_VALIDATE_REQUEST]: postValidateRequest,
  // Register User
  [Types.POST_REGISTER_SUCCESS]: postRegisterSuccess,
  [Types.POST_REGISTER_FAILURE]: postRegisterFailure,
  [Types.POST_REGISTER_REQUEST]: postRegisterRequest,
  [Types.POST_REGISTER_UNPROCESS]: postRegisterUnprocess,
  // Register Role
  [Types.POST_REGISTER_ROLE_REQUEST]: postRegisterRoleRequest,
});
