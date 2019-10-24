/* eslint-disable import/no-named-as-default-member */

/*

*/

import { call, put, select } from 'redux-saga/effects';
import ProfileActions from '../reducers/ProfileRedux';
import { AuthSelectors } from '../reducers/UserRedux';

export function* getProfile(api, action) {
  const { params } = action;
  const token = yield select(AuthSelectors.getToken);
  api.setAuthToken(token);
  const response = yield call(api.profile.getProfile, params);
  if (response.ok) {
    yield put(ProfileActions.getProfileSuccess(response.data));
  } else {
    yield put(ProfileActions.getProfileFailure());
  }
}

export function* editProfile(api, action) {
  const { id, data } = action;
  const token = yield select(AuthSelectors.getToken);
  api.setAuthToken(token);
  const response = yield call(api.profile.editProfile, id, data);
  console.log(response);
  if (response.ok) {
    yield put(ProfileActions.editProfileSuccess(response.data));
  } else {
    yield put(ProfileActions.getProfileFailure());
  }
}
