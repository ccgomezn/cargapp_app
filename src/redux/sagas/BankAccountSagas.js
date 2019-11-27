/* eslint-disable import/no-named-as-default-member */

import { call, put, select } from 'redux-saga/effects';
import BankAccountActions from '../reducers/BankAccountRedux';
import { AuthSelectors } from '../reducers/UserRedux';

// eslint-disable-next-line import/prefer-default-export
export function* getBankAccount(api, action) {
  const { params } = action;
  const token = yield select(AuthSelectors.getToken);
  api.setAuthToken(token);
  const response = yield call(api.bankAccount.getBankAccount, params);
  console.log(response);
  if (response.ok) {
    yield put(BankAccountActions.getBankAccountSuccess(response.data));
  } else {
    yield put(BankAccountActions.postBankAccountFailure(response.data));
  }
}


export function* postBankAccount(api, action) {
  alert(JSON.stringify(action))
  const { data } = action;
  const token = yield select(AuthSelectors.getToken);
  api.setAuthToken(token);
  const response = yield call(api.bankAccount.postBankAccount, data);
  console.log(response);
  if (response.ok) {
    yield put(BankAccountActions.postBankAccountSuccess(response.data));
  } else {
    yield put(BankAccountActions.postBankAccountFailure(response.data));
  }
}

export function* putBankAccount(api, action) {
  const { data } = action;
  const token = yield select(AuthSelectors.getToken);
  api.setAuthToken(token);
  const response = yield call(api.bankAccount.putBankAccount, data);
  console.log(response);
  if (response.ok) {
    yield put(BankAccountActions.putBankAccountSuccess(response.data));
  } else {
    yield put(BankAccountActions.postBankAccountFailure(response.data));
  }
}
