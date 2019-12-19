/* eslint-disable import/no-named-as-default-member */
import { call, put, select } from 'redux-saga/effects';
import crashlytics from '@react-native-firebase/crashlytics';
import ChallengeActions from '../reducers/ChallengeRedux';
import { AuthSelectors } from '../reducers/UserRedux';

// eslint-disable-next-line import/prefer-default-export
export function* getActiveChallenge(api, action) {
  const { params } = action;
  const token = yield select(AuthSelectors.getToken);
  api.setAuthToken(token);
  const response = yield call(api.challenges.getActiveChallenges, params);
  console.log(response);
  if (response.ok) {
    yield put(ChallengeActions.getActiveChallengeSuccess(response.data));
  } else {
    crashlytics().log('Failure Service: GetActiveChallenge');
    yield put(ChallengeActions.getActiveChallengeFailure());
  }
}
