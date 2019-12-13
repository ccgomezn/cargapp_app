import { put, select, call } from 'redux-saga/effects';
import StatusActions from '../reducers/StatusRedux';
import { AuthSelectors } from '../reducers/UserRedux';

export function* getStatus(api, action) {
  const { params } = action;
  const token = yield select(AuthSelectors.getToken);
  api.setAuthToken(token);
  const response = yield call(api.status.getStatus, params);
  console.log('status response', response);
  if (response.ok) {
    console.log('ok');
    yield put(StatusActions.getStatusSuccess(response.data));
  } else {
    console.log('error');
    yield put(StatusActions.statusFailure());
  }
}
