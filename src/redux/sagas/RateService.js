/* eslint-disable import/no-named-as-default-member */

import { call, put, select } from 'redux-saga/effects';
import RateActions from '../reducers/RateServiceRedux';
import { AuthSelectors } from '../reducers/UserRedux';

// eslint-disable-next-line import/prefer-default-export
export function* postRateServices(api, action) {
  const { params } = action;
  const token = yield select(AuthSelectors.getToken);
  api.setAuthToken(token);
  const response = yield call(api.rateService.postRateService, params);
  console.log(response);
  if (response.ok) {
    yield put(RateActions.postRateServiceSuccess(response.data));
  } else {
    yield put(RateActions.postRateServiceFailure(response.data));
  }
}
