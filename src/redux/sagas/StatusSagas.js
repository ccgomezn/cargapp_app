import { put, select, call } from 'redux-saga/effects';
import StatusActions from '../reducers/StatusRedux';
import { AuthSelectors } from '../reducers/UserRedux';

export function* getStatus(api, action) {
  const { params } = action;
  const token = yield select(AuthSelectors.getToken);
  api.setAuthToken(token);
  const response = yield call(api.status.getStatus, params);
  console.log(response)
  if (response.ok) {
    yield put(StatusActions.getStatusSuccess(response.data));
  } else {
    yield put(StatusActions.statusFailure());
  }
}
