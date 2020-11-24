/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/prefer-default-export */
import { put, select, call } from 'redux-saga/effects';
import crashlytics from '@react-native-firebase/crashlytics';
import StaticsActions from '../reducers/StaticsRedux';
import { AuthSelectors } from '../reducers/UserRedux';

export function* getMeStatics(api, action) {
  const { params } = action;
  const token = yield select(AuthSelectors.getToken);
  api.setAuthToken(token);
  const response = yield call(api.statics.getStadics, params);
  console.log(response);
  if (response.ok) {
    yield put(StaticsActions.getStaticsMeSuccess(response.data));
  } else {
    crashlytics().log('Failure Service; GetMeStatics');
    yield put(StaticsActions.getStaticsMeFailure());
  }
}
