/* eslint-disable import/no-named-as-default-member */

/*

*/

import { call, put, select } from 'redux-saga/effects';
import crashlytics from '@react-native-firebase/crashlytics';
import DocumentActions, { AuthSelectors } from '../reducers/DocumentRedux';
import OffersActions from '../reducers/OffersRedux';

export function* registerDocument(api, action) {
  const { params } = action;
  const token = yield select(AuthSelectors.getToken);
  api.setAuthToken(token);
  api.setContent('multipart/form-data');
  const response = yield call(api.document.registerDocument, params);
  console.log(response);
  if (response.ok) {
    // save response ok
    yield put(DocumentActions.postRegisterDocSuccess(response.data));
  } else if (response.status === 302 || response.status === 422) {
    // save response(302, 422: ya registrado; falta un campo; password incorrecto)
    yield put(DocumentActions.postRegisterDocUnprocess(null));
  } else {
    // status error
    crashlytics().log('Failure Service: RegisterDocument');
    yield put(DocumentActions.postRegisterDocFailure(response.data));
  }
}


export function* getDocsServiceRequest(api, action) {
  const { id } = action;
  const token = yield select(AuthSelectors.getToken);
  api.setAuthToken(token);
  api.setContent('application/json');
  const response = yield call(api.document.getDocumentsOfService, id);
  console.log('docGetServiceresponse', response);
  if (response.ok) {
    yield put(DocumentActions.getDocsServiceSuccess(response.data));
  } else {
    yield put(DocumentActions.getDocsServiceFailure());
  }
}


export function* registerDocumentService(api, action) {
  const { params } = action;
  const token = yield select(AuthSelectors.getToken);
  api.setAuthToken(token);
  api.setContent('multipart/form-data');
  const response = yield call(api.document.registerDocumentService, params);
  console.log('doc', response);
  if (response.ok) {
    // save response ok-postRegisterDocServiceSuccess
    yield put(DocumentActions.postRegisterDocServiceSuccess(response.data));
  } else if (response.status === 302 || response.status === 422) {
    // save response(302, 422: ya registrado; falta un campo; password incorrecto)
    yield put(DocumentActions.postRegisterDocServiceUnprocess(null));
  } else {
    // status error
    yield put(DocumentActions.postRegisterDocServiceFailure(response.data));
  }
}


export function* getDocumentTypes(api, action) {
  const { category } = action;
  const token = yield select(AuthSelectors.getToken);
  api.setAuthToken(token);
  const response = yield call(api.document.getDocumentsTypes, category);
  console.log('types', response);
  if (response.ok) {
    // save response ok
    yield put(DocumentActions.getDocsTypesSuccess(response.data));
  } else {
    // error
    yield put(DocumentActions.getDocsTypesFailure(null));
  }
}

export function* getDocumentsMe(api, action) {
  const { params } = action;
  const token = yield select(AuthSelectors.getToken);
  api.setAuthToken(token);
  const response = yield call(api.document.getDocumentsMe, params);
  console.log('doc_me', response);
  if (response.ok) {
    yield put(DocumentActions.getDocsMeSuccess(response.data));
  } else {
    yield put(DocumentActions.getDocsMeFailure(null));
  }
}

export function* getDocumentsInTravel(api, action) {
  const { id, category } = action;
  const token = yield select(AuthSelectors.getToken);
  api.setAuthToken(token);
  const response = yield call(api.document.getDocumentsInTravel, id, category);
  if (response.ok) {
    yield put(DocumentActions.getDocsInTravelSuccess(response.data));
  } else {
    yield put(DocumentActions.getDocsMeFailure(null));
  }
}

export function* deleteDocument(api, action) {
  const { id } = action;
  const token = yield select(AuthSelectors.getToken);
  api.setAuthToken(token);
  const response = yield call(api.document.deleteDocument, id);
  console.log('del doc', response);
  if (response.ok) {
    // delete confirm
  } else {
    // error service
  }
}
