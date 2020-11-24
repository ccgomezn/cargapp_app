/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/prefer-default-export */
import { put, select, call } from 'redux-saga/effects';
import crashlytics from '@react-native-firebase/crashlytics';
import TopUsersActions from '../reducers/TopUsersRedux';
import { AuthSelectors } from '../reducers/UserRedux';

export function* getTopUsers(api, action) {
  const { params } = action;
  const token = yield select(AuthSelectors.getToken);
  api.setAuthToken(token);
  const response = yield call(api.top.getTopUsers, params);
  console.log(response);
  if (response.ok) {
    yield put(TopUsersActions.getTopUsersSuccess(response.data));
  } else {
    crashlytics().log('Failure Service; GetTopUsers');
    yield put(TopUsersActions.getTopUsersFailure());
  }
}
