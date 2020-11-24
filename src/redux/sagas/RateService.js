/* eslint-disable import/no-named-as-default-member */

import { call, put, select } from 'redux-saga/effects';
import crashlytics from '@react-native-firebase/crashlytics';
import RateActions from '../reducers/RateServiceRedux';
import { AuthSelectors } from '../reducers/UserRedux';

// eslint-disable-next-line import/prefer-default-export
export function* postRateServices(api, action) {
  const { data } = action;
  const token = yield select(AuthSelectors.getToken);
  api.setAuthToken(token);
  const response = yield call(api.rateService.postRateServices, data);
  console.log(response);
  if (response.ok) {
    yield put(RateActions.postRateServiceSuccess(response.data));
  } else {
    crashlytics().log('Failure Service: PostRateServices');
    yield put(RateActions.postRateServiceFailure(response.data));
  }
}

export function* getRateServices(api, action) {
  const { params } = action;
  const token = yield select(AuthSelectors.getToken);
  api.setAuthToken(token);
  const response = yield call(api.rateService.getRateServices, params);
  console.log(response)
  if (response.ok) {
    yield put(RateActions.getRateServiceSuccess(response.data));
  } else {
    crashlytics().log('Failure Service: GetRateServices');
    yield put(RateActions.postRateServiceFailure(response.data));
  }
}
