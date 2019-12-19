/* eslint-disable import/prefer-default-export */
/* eslint-disable import/no-named-as-default-member */

/*

*/
import { call, put, select } from 'redux-saga/effects';
import crashlytics from '@react-native-firebase/crashlytics';
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
    crashlytics().log('Failure Service: GetCompanies');
    yield put(CompanyActions.getCompaniesFailure());
  }
}

export function* registerCompanies(api, action) {
  const { params } = action;
  const token = yield select(AuthSelectors.getToken);
  api.setAuthToken(token);
  const response = yield call(api.company.registerCompany, params);
  console.log(response);
  if (response.ok) {
    // register ok
    yield put(CompanyActions.postRegCompaniesSuccess(response.data));
  } else if (response.status === 302 || response.status === 422) {
    // unprocess
    yield put(CompanyActions.postRegCompaniesUnprocess(response.data));
  } else {
    // error api
    crashlytics().log('Failure Service: RegisterCompanies');
    yield put(CompanyActions.postRegCompaniesFailure(null));
  }
}
