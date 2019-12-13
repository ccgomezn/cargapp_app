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
  postValidateUnprocess: ['data'],
  // register User
  postRegisterSuccess: ['data'],
  postRegisterFailure: ['params'],
  postRegisterRequest: ['params'],
  postRegisterUnprocess: ['params'],
  // resend pin
  postResendRequest: ['params'],
  postResendSuccess: ['data'],
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
  // save acount
  saveAcountSuccess: ['data'],
  // update Step register
  updateStep: ['stepUser'],
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
  fullPhone: null,
  step: 0, // step [1:registerOk - 2:PinOK - 3:OKlogin ]
  acount: null, // acount initial
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

/* ------------- Acount initial ------ */
export const saveAcountSuccess = (state, { data }) => {
  return {
    ...state,
    acount: data,
  };
};

/* ------------- Update Step ---------- */
export const updateStep = (state, { stepUser }) => {
  return {
    ...state,
    step: stepUser,
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
    step: 2,
  };
};

export const postValidateUnprocess = (state, { data }) => {
  return {
    ...state,
    fetching: false,
    error: false,
    unprocess: true,
    status: data,
  };
};

export const postValidateFailure = (state) => {
  return {
    ...state,
    fetching: false,
    error: true,
    unprocess: false,
  };
};

export const postValidateRequest = (state) => {
  return {
    ...state,
    fetching: true,
    error: false,
    status: null,
    unprocess: false,
  };
};

/* ---------------- Register User -------------- */
export const postRegisterSuccess = (state, { data }) => {
  return {
    ...state,
    fetching: false,
    error: false,
    status: data,
    step: 1,
    fullPhone: data.phone_number,
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

export const postResendSuccess = (state, { data }) => {
  return {
    ...state,
    fetching: false,
    error: false,
    status: data,
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
    step: 3,
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
  [Types.POST_VALIDATE_UNPROCESS]: postValidateUnprocess,
  // register user
  [Types.POST_REGISTER_SUCCESS]: postRegisterSuccess,
  [Types.POST_REGISTER_FAILURE]: postRegisterFailure,
  [Types.POST_REGISTER_REQUEST]: postRegisterRequest,
  [Types.POST_REGISTER_UNPROCESS]: postRegisterUnprocess,
  // resend code
  [Types.POST_RESEND_REQUEST]: postResendRequest,
  [Types.POST_RESEND_SUCCESS]: postResendSuccess,
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
  // save acount
  [Types.SAVE_ACOUNT_SUCCESS]: saveAcountSuccess,
  // update step
  [Types.UPDATE_STEP]: updateStep,
});
