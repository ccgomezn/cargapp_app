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
  // resend pin
  postResendRequest: ['params'],
  // login User
  postLoginSuccess: ['data'],
  postLoginFailure: ['params'],
  postLoginRequest: ['params'],
  postLoginUnprocess: ['data'],
  // forgot/reset password
  postPasswordSuccess: ['data'],
  postPasswordFailure: ['params'],
  postPasswordRequest: ['params'],
  postPasswordUnprocess: ['data'],
  // new password
  postResetPassRequest: ['params'],
  // get userInfo
  getUserinfoRequest: ['params'],
  getUserinfoSuccess: ['data'],
  getUserinfoFailure: null,
});

export const UserTypes = Types;
export default Creators;

/* ---------------- Initial State -------------- */
export const INITIAL_STATE = Immutable({
  isLogged: false,
  info: null, // data session
  error: null,
  fetching: false,
  status: null, // respuesta success
  unprocess: false,
  session: null, // respuesta login
  roles: null,
});

/* ----------------- Selectors ---------------- */

export const AuthSelectors = {
  getToken: state => state.user.session.access_token,
};

/* ----------------- Reducers ---------------- */

export const onUserLogin = (state, { data }) => {
  return {
    ...state,
    isLogged: true,
    error: false,
    info: data,
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
    info: data,
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

/* --------------- resend Pin ------------------- */
export const postResendRequest = (state) => {
  return {
    ...state,
    fetching: true,
    error: false,
    status: null,
  };
};

/* ----------------- login ----------------------- */
export const postLoginSuccess = (state, { data }) => {
  return {
    ...state,
    fetching: false,
    error: false,
    status: true,
    session: data,
    isLogged: true,
    unprocess: false,
  };
};

export const postLoginUnprocess = (state, { data }) => {
  return {
    ...state,
    fetching: false,
    error: false,
    unprocess: true,
    status: data,
  };
};

export const postLoginFailure = (state) => {
  return {
    ...state,
    fetching: false,
    error: true,
    status: null,
    session: null,
  };
};

export const postLoginRequest = (state) => {
  return {
    ...state,
    fetching: true,
    status: null,
  };
};

/* --------------- Password ----------- */
export const postPasswordSuccess = (state, { data }) => {
  return {
    ...state,
    fetching: false,
    error: false,
    status: data,
    unprocess: false,
  };
};

export const postPasswordFailure = (state) => {
  return {
    ...state,
    fetching: false,
    error: true,
  };
};

export const postPasswordUnprocess = (state) => {
  return {
    ...state,
    fetching: false,
    error: false,
    unprocess: true,
    status: true,
  };
};

export const postPasswordRequest = (state) => {
  return {
    ...state,
    fetching: true,
    error: false,
    status: null,
  };
};

/* --------------- new_password ------------- */
export const postResetPassRequest = (state) => {
  return {
    ...state,
    fetching: true,
    error: false,
    status: null,
  };
};

/* --------------- get userInfo --------------- */
export const getUserinfoRequest = (state) => {
  return {
    ...state,
    fetching: true,
    error: false,
    status: null,
    roles: null,
  };
};

export const getUserinfoSuccess = (state, { data }) => {
  return {
    ...state,
    fetching: false,
    error: false,
    status: data,
    roles: data.roles,
  };
};

export const getUserinfoFailure = (state) => {
  return {
    ...state,
    fetching: false,
    error: true,
  };
};

/* ----------------- Reducers ------------------- */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.ON_USER_LOGIN]: onUserLogin,
  [Types.ON_USER_LOGOUT]: onUserLogout,
  // verify phone
  [Types.POST_VERIFY_SUCCESS]: postVerifySuccess,
  [Types.POST_USER_FAILURE]: postUserFailure,
  [Types.POST_VERIFY_REQUEST]: postVerifyRequest,
  // validate phone
  [Types.POST_VALIDATE_SUCCESS]: postValidateSuccess,
  [Types.POST_VALIDATE_FAILURE]: postValidateFailure,
  [Types.POST_VALIDATE_REQUEST]: postValidateRequest,
  // register user
  [Types.POST_REGISTER_SUCCESS]: postRegisterSuccess,
  [Types.POST_REGISTER_FAILURE]: postRegisterFailure,
  [Types.POST_REGISTER_REQUEST]: postRegisterRequest,
  [Types.POST_REGISTER_UNPROCESS]: postRegisterUnprocess,
  // resend code
  [Types.POST_RESEND_REQUEST]: postResendRequest,
  // login user
  [Types.POST_LOGIN_SUCCESS]: postLoginSuccess,
  [Types.POST_LOGIN_FAILURE]: postLoginFailure,
  [Types.POST_LOGIN_REQUEST]: postLoginRequest,
  [Types.POST_LOGIN_UNPROCESS]: postLoginUnprocess,
  // forgot/reset password
  [Types.POST_PASSWORD_SUCCESS]: postPasswordSuccess,
  [Types.POST_PASSWORD_FAILURE]: postPasswordFailure,
  [Types.POST_PASSWORD_REQUEST]: postPasswordRequest,
  [Types.POST_PASSWORD_UNPROCESS]: postPasswordUnprocess,
  // new password
  [Types.POST_RESET_PASS_REQUEST]: postResetPassRequest,
  // get userinfo
  [Types.GET_USERINFO_REQUEST]: getUserinfoRequest,
  [Types.GET_USERINFO_SUCCESS]: getUserinfoSuccess,
  [Types.GET_USERINFO_FAILURE]: getUserinfoFailure,
});
