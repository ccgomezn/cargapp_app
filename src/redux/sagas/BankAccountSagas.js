/* eslint-disable import/no-named-as-default-member */

import { call, put, select } from 'redux-saga/effects';
import BankAccountActions from '../reducers/BankAccountRedux';
import { AuthSelectors } from '../reducers/UserRedux';

// eslint-disable-next-line import/prefer-default-export
export function* postBankAccount(api, action) {
  const { data } = action;
  const token = yield select(AuthSelectors.getToken);
  api.setAuthToken(token);
  const response = yield call(api.bankAccount.postBankAccount, data);
  alert('holi')
  alert(JSON.stringify(response))
  console.log(response);
  if (response.ok) {
    yield put(BankAccountActions.postBankAccountSuccess(response.data));
  } else {
    yield put(BankAccountActions.postBankAccountFailure(response.data));
  }
}

export function* parameters(api, action) {
  const { data } = action;
  const token = yield select(AuthSelectors.getToken);
  api.setAuthToken(token);
  const response = yield call(api.bankAccount.parameters, data);
  console.log(response);
  if (response.ok) {
    yield put(BankAccountActions.parametersSuccess(response.data));
  } else {
    yield put(BankAccountActions.postBankAccountFailure(response.data));
  }
}
