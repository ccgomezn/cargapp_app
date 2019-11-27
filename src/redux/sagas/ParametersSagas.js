import { call, put, select } from 'redux-saga/effects';
import { AuthSelectors } from '../reducers/UserRedux';
import ParametersActions from '../reducers/ParametersRedux';


export function* getParameters(api, action) {
  const { params } = action;
  const token = yield select(AuthSelectors.getToken);
  api.setAuthToken(token);
  const response = yield call(api.parameters.getParameters, params);
  console.log(response);
  if (response.ok) {
    yield put(ParametersActions.parametersSuccess(response.data));
  } else {
    yield put(ParametersActions.parametersFailure(response.data));
  }
}

export function* getSecondParameters(api, action) {
  const { params } = action;
  const token = yield select(AuthSelectors.getToken);
  api.setAuthToken(token);
  const response = yield call(api.parameters.getParameters, params);
  console.log(response);
  if (response.ok) {
    yield put(ParametersActions.parametersSecondSuccess(response.data));
  } else {
    yield put(ParametersActions.parametersFailure(response.data));
  }
}

