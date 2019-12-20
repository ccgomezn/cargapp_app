/* eslint-disable import/no-named-as-default-member */
/*
 * A short word on how to use this automagically generated file.
 * We're often asked in the ignite gitter channel how to connect
 * to a to a third party api, so we thought we'd demonstrate - but
 * you should know you can use sagas for other flow control too.
 *
 * Other points:
 *  - You'll need to add this saga to sagas/index.js
 *  - This template uses the api declared in sagas/index.js, so
 *    you'll need to define a constant in that file.
 ************************************************************ */

import { call, put } from 'redux-saga/effects';
import crashlytics from '@react-native-firebase/crashlytics';
import GeolocationActions from '../reducers/GeolocationRedux';

// eslint-disable-next-line import/prefer-default-export
export function* sendLocation(api, action) {
  const { params } = action;
  const response = yield call(api.geolocation.postLocation, params);
  if (response.ok) {
    yield put(GeolocationActions.postLocationSuccess(response.data));
  } else {
    crashlytics().log('Failure Service: SendLocation');
    yield put(GeolocationActions.postLocationFailure());
  }
}


export function* getLocationTarget(api, action) {
  const { params } = action;
  const response = yield call(api.geolocation.getLocationTarget, params);
  if (response.ok) {
    yield put(GeolocationActions.getLocationTargetSuccess(response.data));
  } else {
    crashlytics().log('Failure Service: GetLocationTarget');
    yield put(GeolocationActions.getLocationTargetFailure());
  }
}
