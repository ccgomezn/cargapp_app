/* eslint-disable import/no-named-as-default-member */

import { call, put, select } from 'redux-saga/effects';
import crashlytics from '@react-native-firebase/crashlytics';
import OffersByIdActions from '../reducers/OffersByIdRedux';
import { AuthSelectors } from '../reducers/UserRedux';

export default function* getOffersById(api, action) {
  const { id } = action;
  const token = yield select(AuthSelectors.getToken);
  api.setAuthToken(token);
  const response = yield call(api.offers.getOffersById, id);
  console.log(response);
  if (response.ok) {
    yield put(OffersByIdActions.getOffersByIdSuccess(response.data));
  } else {
    crashlytics().log('Failure Service: GetOffersById');
    yield put(OffersByIdActions.getOffersByIdFailure(response.data));
  }
}
