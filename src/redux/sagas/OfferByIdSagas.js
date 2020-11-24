/* eslint-disable import/no-named-as-default-member */

import { call, put, select } from 'redux-saga/effects';
import crashlytics from '@react-native-firebase/crashlytics';
import OfferByIdActions from '../reducers/OfferByIdRedux';
import { AuthSelectors } from '../reducers/UserRedux';

export default function* getOfferById(api, action) {
  const { id } = action;
  const token = yield select(AuthSelectors.getToken);
  api.setAuthToken(token);
  const response = yield call(api.offers.getOfferById, id);
  console.log('getOfferxID', response);
  if (response.ok) {
    yield put(OfferByIdActions.getOfferByIdSuccess(response.data));
  } else {
    crashlytics().log('Failure Service: GetOfferById');
    yield put(OfferByIdActions.getOfferByIdFailure(response.data));
  }
}
