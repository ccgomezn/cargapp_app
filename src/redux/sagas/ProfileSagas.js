/* eslint-disable import/no-named-as-default-member */

/*

*/

import { call, put, select } from 'redux-saga/effects';
import crashlytics from '@react-native-firebase/crashlytics';
import ProfileActions from '../reducers/ProfileRedux';
import { AuthSelectors } from '../reducers/UserRedux';
import UserActions from '../reducers/UserRedux';

export function* getProfile(api, action) {
  const { params } = action;
  const token = yield select(AuthSelectors.getToken);
  api.setAuthToken(token);
  const response = yield call(api.profile.getProfile, params);
  console.log(response);
  if (response.ok) {
    yield put(ProfileActions.getProfileSuccess(response.data));
  } else {
    crashlytics().log('Failure Service: GetProfile');
    yield put(ProfileActions.getProfileFailure());
  }
}

export function* editProfile(api, action) {
  const { id, data } = action;
  const token = yield select(AuthSelectors.getToken);
  api.setAuthToken(token);
  api.setContent('application/json');
  const response = yield call(api.profile.editProfile, id, data);
  console.log(response);
  if (response.ok) {
    yield put(ProfileActions.editProfileSuccess(response.data));
    // update step
    yield put(UserActions.updateStep(5));
  } else {
    crashlytics().log('Failure Service: EditProfile');
    yield put(ProfileActions.getProfileFailure());
  }
}
