/* eslint-disable import/no-named-as-default-member */

/*

*/

import { call, put } from 'redux-saga/effects';
import CountrieActions from '../reducers/CountrieRedux';

// eslint-disable-next-line import/prefer-default-export
export function* countriesActive(api, action) {
  const { params } = action;
  const response = yield call(api.countrie.countriesActive, params);
  if (response.ok) {
    // save ok response
    yield put(CountrieActions.postCountriesSuccess(response.data));
  } else {
    // status error
    yield put(CountrieActions.postCountriesFailure());
  }
}
