/* eslint-disable import/prefer-default-export */
/* eslint-disable import/no-named-as-default-member */
import { call, put, select } from 'redux-saga/effects';
import PaymentActions from '../reducers/PaymentRedux';
import { AuthSelectors } from '../reducers/UserRedux';

export function* registerPayment(api, action) {
  const { params } = action;
  const token = yield select(AuthSelectors.getToken);
  api.setAuthToken(token);
  const response = yield call(api.payment.registerPayment, params);
  console.log(response);
  if (response.ok) {
    // register ok
    yield put(PaymentActions.postRegPaymentSuccess(response.data));
  } else if (response.status === 302 || response.status === 422) {
    // unprocess
    yield put(PaymentActions.postRegPaymentUnprocess(response.data));
  } else {
    // error api
    yield put(PaymentActions.postRegPaymentFailure(null));
  }
}
