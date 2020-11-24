/* eslint-disable import/prefer-default-export */
/* eslint-disable import/no-named-as-default-member */

import { call, put, select } from 'redux-saga/effects';
import crashlytics from '@react-native-firebase/crashlytics';
import PermissionsActions from '../reducers/PermissionsRedux';
import { AuthSelectors } from '../reducers/UserRedux';

export function* getPermission(api, action) {
  const { params } = action;
  const token = yield select(AuthSelectors.getToken);
  api.setAuthToken(token);
  const response = yield call(api.permissions.getPermissions, params);
  console.log(response);
  if (response.ok) {
    yield put(PermissionsActions.getPermissionSuccess(response.data));
  } else {
    crashlytics().log('Failure Service: GetPermission');
    yield put(PermissionsActions.getPermissionFailure());
  }
}
