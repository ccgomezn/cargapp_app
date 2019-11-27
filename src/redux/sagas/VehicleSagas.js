/* eslint-disable import/prefer-default-export */
/* eslint-disable import/no-named-as-default-member */

/*

*/
import { call, put, select } from 'redux-saga/effects';
import VehiclesActions from '../reducers/VehicleRedux';
import { AuthSelectors } from '../reducers/UserRedux';

export function* getVehicles(api, action) {
  const { params } = action;
  const token = yield select(AuthSelectors.getToken);
  api.setAuthToken(token);
  const response = yield call(api.vehicle.getVehicles, params);
  if (response.ok) {
    yield put(VehiclesActions.getVehicleSuccess(response.data));
  } else {
    yield put(VehiclesActions.getVehicleFailure());
  }
}

export function* getMeVehicles(api, action) {
  const { params } = action;
  const token = yield select(AuthSelectors.getToken);
  api.setAuthToken(token);
  const response = yield call(api.vehicle.getMeVehicles, params);
  console.log(response);
  if (response.ok) {
    // ok
    yield put(VehiclesActions.getMeVehiclesSuccess(response.data));
  } else {
    // error
    yield put(VehiclesActions.getMeVehiclesFailure());
  }
}

export function* registerVehicle(api, action) {
  const { params } = action;
  const token = yield select(AuthSelectors.getToken);
  api.setAuthToken(token);
  const response = yield call(api.vehicle.postRegVehicle, params);
  console.log(response);
  if (response.ok) {
    // register ok
    yield put(VehiclesActions.postRegVehicleSuccess(response.data));
  } else if (response.status === 422 || response.status === 304) {
    // unprocces
    yield put(VehiclesActions.postRegVehicleUnprocess(response.data));
  } else {
    // error
    yield put(VehiclesActions.postRegVehicleFailure());
  }
}
