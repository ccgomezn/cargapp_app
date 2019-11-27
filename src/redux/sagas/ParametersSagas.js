/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/prefer-default-export */
import { call, put, select } from 'redux-saga/effects';
import { AuthSelectors } from '../reducers/UserRedux';
import ParametersActions from '../reducers/ParametersRedux';

export function* parameters(api, action) {
  const { data } = action;
  const token = yield select(AuthSelectors.getToken);
  api.setAuthToken(token);
  const response = yield call(api.parameters.parameters, data);
  console.log(response);
  if (response.ok) {
    yield put(ParametersActions.parametersSuccess(response.data));
  } else {
    yield put(ParametersActions.parametersFailure(response.data));
  }
}
