/* eslint-disable import/no-named-as-default-member */

/*

*/

import { call, put } from 'redux-saga/effects';
import UserActions from '../reducers/UserRedux';

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
  // console.log(response);
  if (response.ok) {
    // save OK response
    yield put(UserActions.postValidateSuccess(response.data));
  } else if (response.status === 302) {
    // save response
    yield put(UserActions.postValidateSuccess(response.data));
  } else {
    // status error
    yield put(UserActions.postValidateFailure(response.data));
  }
}

export function* registerUser(api, action) {
  const { params } = action;
  const response = yield call(api.user.registerUser, params);
  // console.log(response);
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
  if (response.ok) {
    // save response ok
    yield put(UserActions.postValidateSuccess(response.data));
  } else if (response.status === 302 /* || response.status === 422 */) {
    // save response(302, 422)
    yield put(UserActions.postValidateSuccess(response.data));
  } else {
    // save error
    yield put(UserActions.postValidateFailure(response.data));
  }
}

export function* loginUser(api, action) {
  const { params } = action;
  const response = yield call(api.user.loginUser, params);
  // console.log(response);
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
