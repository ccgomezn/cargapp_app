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
