/* eslint-disable import/no-named-as-default-member */

import { call, put, select } from 'redux-saga/effects';
import crashlytics from '@react-native-firebase/crashlytics';
import DestinationsActions from '../reducers/DestinationsRedux';
import { AuthSelectors } from '../reducers/UserRedux';

// eslint-disable-next-line import/prefer-default-export
export function* getDestinations(api, action) {
  const { params } = action;
  const token = yield select(AuthSelectors.getToken);
  api.setAuthToken(token);
  const response = yield call(api.destinations.getDestinations, params);
  console.log(response);
  if (response.ok) {
    yield put(DestinationsActions.getDestinationsSuccess(response.data));
  } else {
    crashlytics().log('Failure Service: GetDestinations');
    yield put(DestinationsActions.getDestinationsFailure(response.data));
  }
}
