/* eslint-disable import/no-named-as-default-member */
import { call, put, select } from 'redux-saga/effects';
import crashlytics from '@react-native-firebase/crashlytics';
import PrizeActions from '../reducers/PrizesRedux';
import { AuthSelectors } from '../reducers/UserRedux';

// eslint-disable-next-line import/prefer-default-export
export function* getActivePrizes(api, action) {
  const { params } = action;
  const token = yield select(AuthSelectors.getToken);
  api.setAuthToken(token);
  const response = yield call(api.prizes.getActivePrizes, params);
  console.log(response);
  if (response.ok) {
    yield put(PrizeActions.getActivePrizesSuccess(response.data));
  } else {
    crashlytics().log('Failure Service: GetActivePrizes');
    yield put(PrizeActions.getActivePrizesFailure());
  }
}
