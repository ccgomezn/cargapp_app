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
  // console.log(response.data);
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
