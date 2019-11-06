/* eslint-disable import/no-named-as-default-member */

/*

*/

import { call, put, select } from 'redux-saga/effects';
import { AuthSelectors } from '../reducers/UserRedux';
import PasswordActions from '../reducers/PasswordRedux';
import { Alert } from 'react-native';


export function* putPassword(api, action) {
  const { data } = action;
  const token = yield select(AuthSelectors.getToken);
  api.setAuthToken(token);
  const response = yield call(api.password.putPassword, data);
  if (response.ok) {
    yield put(PasswordActions.putPasswordSuccess(response.data));
  } else if (response.status === 304) {
    Alert.alert('Error','Los datos son incorrectos');
    yield put(PasswordActions.passwordFailure());
  }
}
