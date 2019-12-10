/* eslint-disable import/no-named-as-default-member */

/*

*/

import { call, put, select } from 'redux-saga/effects';
import UserActions, { AuthSelectors } from '../reducers/UserRedux';

export function* verifyPhone(api, action) {
  const { params } = action;
  const response = yield call(api.user.verifyPhone, params);
  if (response.ok) {
    // save OK response
    yield put(UserActions.postVerifySuccess(response.data));
  } else if (response.status === 302) {
    // save response
    yield put(UserActions.postVerifySuccess(response.data));
  } else {
    // status error
    yield put(UserActions.postUserFailure());
  }
}

export function* validatePin(api, action) {
  const { params } = action;
  const response = yield call(api.user.validatePin, params);
  console.log(response);
  if (response.ok) {
    // save OK response
    yield put(UserActions.postValidateSuccess(response.data));
  } else if (response.status === 302) {
    // save response
    yield put(UserActions.postValidateUnprocess(response.data));
  } else {
    // status error
    yield put(UserActions.postValidateFailure(response.data));
  }
}

export function* registerUser(api, action) {
  const { params } = action;
  const response = yield call(api.user.registerUser, params);
  console.log(response);
  if (response.status === 201) {
    // save OK create
    yield put(UserActions.postRegisterSuccess(response.data));
  } else if (response.status === 302 || response.status === 422) {
    // save response(302, 422: ya registrado; falta un campo; password incorrecto)
    yield put(UserActions.postRegisterUnprocess(null));
  } else {
    // status error
    yield put(UserActions.postRegisterFailure(response.data));
  }
}

export function* resendPin(api, action) {
  const { params } = action;
  const response = yield call(api.user.resendPin, params);
  console.log(response);
  if (response.ok) {
    // save response ok
    yield put(UserActions.postResendSuccess(response.data));
  } else if (response.status === 302 /* || response.status === 422 */) {
    // save response(302, 422)
    yield put(UserActions.postResendSuccess(response.data));
  } else {
    // save error
    yield put(UserActions.postValidateFailure(response.data));
  }
}

export function* loginUser(api, action) {
  const { params } = action;
  const response = yield call(api.user.loginUser, params);
  console.log(response);
  if (response.ok) {
    // save response ok
    yield put(UserActions.postLoginSuccess(response.data));
  } else if (response.status === 401) {
    // save data incorrect
    yield put(UserActions.postLoginUnprocess(response.data));
  } else {
    // save error
    yield put(UserActions.postLoginFailure(response.data));
  }
}

export function* forgotPass(api, action) {
  const { params } = action;
  const response = yield call(api.user.forgotPass, params);
  // console.log(response);
  if (response.ok) {
    // save response ok
    yield put(UserActions.postPasswordSuccess(response.data));
  } else if (response.status === 422 || response.status === 302) {
    // save data incorrect
    yield put(UserActions.postPasswordUnprocess(response.data));
  } else {
    // error
    yield put(UserActions.postPasswordFailure());
  }
}

export function* resetPass(api, action) {
  const { params } = action;
  const response = yield call(api.user.resetPass, params);
  // console.log(response);
  if (response.ok) {
    // save response ok
    yield put(UserActions.postPasswordSuccess(response.data));
  } else if (response.status === 500 || response.status === 422 || response.status === 302) {
    // save data incorrect
    yield put(UserActions.postPasswordUnprocess(response.data));
  } else {
    // error
    yield put(UserActions.postPasswordFailure());
  }
}

export function* getInfoUser(api, action) {
  const { params } = action;
  const token = yield select(AuthSelectors.getToken);
  api.setAuthToken(token);
  const response = yield call(api.user.getUserRole, params);
  console.log(response);
  if (response.ok) {
    // save response ok
    yield put(UserActions.getUserinfoSuccess(response.data));
  } else {
    // error
    yield put(UserActions.getUserinfoFailure());
  }
}
