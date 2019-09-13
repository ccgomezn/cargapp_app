import {
  put, takeEvery, all,
} from 'redux-saga/effects';

const delay = ms => new Promise(res => setTimeout(res, ms));
// import API from '../Api';

function* incrementAsync() {
  yield delay(1000);
  yield put({ type: 'INCREMENT' });
}

function* watchIncrementAsync() {
  yield takeEvery('INCREMENT_ASYNC', incrementAsync);
}

/* ----------  API ------------ */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
// const api = API.create();

/* ----------- Connects Types to Sagas ------------ */
export default function* root() {
  yield all([
    watchIncrementAsync(),
  ]);
}
