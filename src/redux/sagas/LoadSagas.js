/* eslint-disable import/no-named-as-default-member */

import { call, put, select } from 'redux-saga/effects';
import LoadActions from '../reducers/LoadRedux';
import { AuthSelectors } from '../reducers/UserRedux';

// eslint-disable-next-line import/prefer-default-export
export function* getLoadsType(api, action) {
  const { params } = action;
  const token = yield select(AuthSelectors.getToken);
  api.setAuthToken(token);
  const response = yield call(api.load.getloadTypes, params);
  console.log(response);
  if (response.ok) {
    yield put(LoadActions.getLoadstypeSuccess(response.data));
  } else {
    yield put(LoadActions.getLoadstypeFailure(response.data));
  }
}
