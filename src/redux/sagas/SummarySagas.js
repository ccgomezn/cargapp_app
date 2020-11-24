/* eslint-disable import/prefer-default-export */
import { put, select, call } from 'redux-saga/effects';
import crashlytics from '@react-native-firebase/crashlytics';
import SummaryActions from '../reducers/SummaryRedux';
import { AuthSelectors } from '../reducers/UserRedux';

export function* getSummary(api, action) {
  const { id } = action;
  const token = yield select(AuthSelectors.getToken);
  api.setAuthToken(token);
  const response = yield call(api.summary.getSummary, id);
  console.log('status response', response);
  if (response.ok) {
    yield put(SummaryActions.getSummarySuccess(response.data));
  } else {
    crashlytics().log('Failure Service: GetSummary');
    yield put(SummaryActions.summaryFailure());
  }
}
