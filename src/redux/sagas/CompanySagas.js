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
  console.log(response);
  if (response.ok) {
    yield put(CompanyActions.getCompaniesSuccess(response.data));
  } else {
    yield put(CompanyActions.getCompaniesFailure());
  }
}
