/* eslint-disable import/no-named-as-default-member */

import { call, put, select } from 'redux-saga/effects';
import MarkersActions from '../reducers/MarkersRedux';
import { AuthSelectors } from '../reducers/UserRedux';

// eslint-disable-next-line import/prefer-default-export
export function* getMarkers(api, action) {
  const { params } = action;
  const token = yield select(AuthSelectors.getToken);
  api.setAuthToken(token);
  const response = yield call(api.markers.getMarkers, params);
  console.log(response);
  if (response.ok) {
    yield put(MarkersActions.getMarkersSuccess(response.data));
  } else {
    yield put(MarkersActions.getMarkersFailure(response.data));
  }
}
