import { call, put, select } from 'redux-saga/effects';
import { AuthSelectors } from '../reducers/UserRedux';
import ParametersActions from '../reducers/ParametersRedux';


export function* parameters(api, action) {
  const { data } = action;
  const token = yield select(AuthSelectors.getToken);
  api.setAuthToken(token);
  const response = yield call(api.bankAccount.parameters, data);
  console.log(response);
  if (response.ok) {
    yield put(ParametersActions.parametersSuccess(response.data));
  } else {
    yield put(ParametersActions.postBankAccountFailure(response.data));
  }
}
