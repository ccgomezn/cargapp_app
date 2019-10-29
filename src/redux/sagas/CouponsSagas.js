/* eslint-disable import/no-named-as-default-member */

/*

*/

import { call, put, select } from 'redux-saga/effects';
import { AuthSelectors } from '../reducers/UserRedux';
import CouponsActions from '../reducers/CouponsRedux';

export function* getCoupons(api, action) {
  const { params } = action;
  const token = yield select(AuthSelectors.getToken);
  api.setAuthToken(token);
  const response = yield call(api.coupons.getCoupons, params);
  console.log(response);
  if (response.ok) {
    yield put(CouponsActions.getCouponsSuccess(response.data));
  } else {
    yield put(CouponsActions.couponsFailure());
  }
}
