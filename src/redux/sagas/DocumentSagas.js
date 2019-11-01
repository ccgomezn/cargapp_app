/* eslint-disable import/no-named-as-default-member */

/*

*/

import { call, put, select } from 'redux-saga/effects';
import DocumentActions, { AuthSelectors } from '../reducers/DocumentRedux';

export function* registerDocument(api, action) {
  const { params } = action;
  const token = yield select(AuthSelectors.getToken);
  api.setAuthToken(token);
  api.setContent('multipart/form-data');
  const response = yield call(api.document.registerDocument, params);
  // console.log(response);
  if (response.ok) {
    // save response ok
    yield put(DocumentActions.postRegisterDocSuccess(response.data));
  } else if (response.status === 302 || response.status === 422) {
    // save response(302, 422: ya registrado; falta un campo; password incorrecto)
    yield put(DocumentActions.postRegisterDocUnprocess(null));
  } else {
    // status error
    yield put(DocumentActions.postRegisterDocFailure(response.data));
  }
}

export function* validateDocument(api, action) {
  const { params } = action;
  const response = yield call(api.document.registerDocument, params);
  if (response.ok) {
    // save response ok
  } else {
    // error
  }
}
