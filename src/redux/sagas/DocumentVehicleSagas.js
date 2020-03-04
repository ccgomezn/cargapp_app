/* eslint-disable import/no-named-as-default-member */
import { call, put, select } from 'redux-saga/effects';
import crashlytics from '@react-native-firebase/crashlytics';
import DocumentActions, { AuthSelectors } from '../reducers/DocumentVehicleRedux';

export function* registerDocumentVeh(api, action) {
  const { params } = action;
  const token = yield select(AuthSelectors.getToken);
  api.setAuthToken(token);
  api.setContent('multipart/form-data');
  const response = yield call(api.documentVehicle.registerDocument, params);
  console.log(' response registerDocVeh', response);
  if (response.ok) {
    yield put(DocumentActions.postRegisterDocVehicleSuccess(response.data));
  } else if (response.status === 302 || response.status === 422) {
    yield put(DocumentActions.postRegisterDocVehicleUnprocess(null));
  } else {
    // status error
    crashlytics().log('Failure Service: RegisterDocumentVehicle');
    yield put(DocumentActions.postRegisterDocVehicleFailure(response.data));
  }
}

export function* getDocsVehicleMe(api, action) {
  const { idVehicle } = action;
  const token = yield select(AuthSelectors.getToken);
  api.setAuthToken(token);
  const response = yield call(api.documentVehicle.getDocsVehicleMe, idVehicle);
  console.log('response getDocVeh', response);
  if (response.ok) {
    yield put(DocumentActions.getDocsVehicleMeSuccess(response.data));
  } else {
    crashlytics().log('Failure Service: getDocumentVehicle');
    yield put(DocumentActions.getDocsVehicleMeFailure(null));
  }
}

export function* deleteDocVehicle(api, action) {
  const { id } = action;
  const token = yield select(AuthSelectors.getToken);
  api.setAuthToken(token);
  const response = yield call(api.documentVehicle.deleteDocVehicle, id);
  console.log('del docvehicle', response);
  if (response.ok) {
    // delete confirm
  } else {
    // error service
  }
}
