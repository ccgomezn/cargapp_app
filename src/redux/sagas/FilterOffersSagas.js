import { call, put, select } from 'redux-saga/effects';
import { AuthSelectors } from '../reducers/UserRedux';
import FilterOffersActions from '../reducers/FilterOffersRedux';

export function* getFilterOffers(api, action) {
  const { data } = action;
  const token = yield select(AuthSelectors.getToken);
  api.setAuthToken(token);
  const response = yield call(api.filterOffers.getFilterOffers, data);
  console.log(response);
  if (response.ok) {
    yield put(FilterOffersActions.getOffersByFilterSuccess(response.data));
  } else {
    yield put(FilterOffersActions.getOffersByFilterFailure());
  }
}
