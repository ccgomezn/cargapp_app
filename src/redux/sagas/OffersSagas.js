/* eslint-disable import/no-named-as-default-member */

/*

*/

import { call, put, select } from 'redux-saga/effects';
import OffersActions from '../reducers/OffersRedux';
import { AuthSelectors } from '../reducers/UserRedux';

export function* getOffers(api, action) {
  const { params } = action;
  const token = yield select(AuthSelectors.getToken);
  api.setAuthToken(token);
  const response = yield call(api.offers.getOffers, params);
  if (response.ok) {
    yield put(OffersActions.getOffersSuccess(response.data));
  } else {
    yield put(OffersActions.getOffersFailure());
  }
}

export function* applyOffer(api, action) {
  const { service } = action;
  const token = yield select(AuthSelectors.getToken);
  api.setAuthToken(token);
  const response = yield call(api.offers.applyOffer, service);
  console.log(response);
  if (response.ok) {
    yield put(OffersActions.postApplyOfferSuccess(response.data));
  } else {
    yield put(OffersActions.getOffersFailure());
  }
}
