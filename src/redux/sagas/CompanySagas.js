/* eslint-disable import/prefer-default-export */
/* eslint-disable import/no-named-as-default-member */

/*

*/
import { call, put, select } from 'redux-saga/effects';
import CompanyActions from '../reducers/CompanyRedux';
import { AuthSelectors } from '../reducers/UserRedux';

export function* getCompanies(api, action) {
  const { params } = action;
  const token = yield select(AuthSelectors.getToken);
  api.setAuthToken(token);
  const response = yield call(api.company.getCompanies, params);
  if (response.ok) {
    yield put(CompanyActions.getCompaniesSuccess(response.data));
  } else {
    yield put(CompanyActions.getCompaniesFailure());
  }
}

export function* registerCompany(api, action) {
  const { params } = action;
  const token = yield select(AuthSelectors.getToken);
  api.setAuthToken(token);
  const response = yield call(api.company.registerCompany, params);
  if (response.ok) {
    // register ok
  } else if (response.status === 302 || response.status === 422) {
    // unprocess
  } else {
    // error api
  }
}
