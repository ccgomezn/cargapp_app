/* eslint-disable import/no-named-as-default-member */
/*
 * A short word on how to use this automagically generated file.
 * We're often asked in the ignite gitter channel how to connect
 * to a to a third party api, so we thought we'd demonstrate - but
 * you should know you can use sagas for other flow control too.
 *
 * Other points:
 *  - You'll need to add this saga to sagas/index.js
 *  - This template uses the api declared in sagas/index.js, so
 *    you'll need to define a constant in that file.
 ************************************************************ */

import { call, put, select } from 'redux-saga/effects';
import ChatActions from '../reducers/ChatRedux';
import { AuthSelectors } from '../reducers/UserRedux';

// eslint-disable-next-line import/prefer-default-export
export function* getMineChats(api, action) {
  const { params } = action;
  const token = yield select(AuthSelectors.getToken);
  api.setAuthToken(token);
  const response = yield call(api.chats.getMineChats, params);
  console.log('chats', response);
  if (response.ok) {
    yield put(ChatActions.getMeChatsSuccess(response.data));
  } else {
    yield put(ChatActions.getMeChatsFailure());
  }
}
// eslint-disable-next-line import/prefer-default-export
export function* getActiveChats(api, action) {
  const { params } = action;
  const token = yield select(AuthSelectors.getToken);
  api.setAuthToken(token);
  const response = yield call(api.chats.getActiveChats, params);
  if (response.ok) {
    yield put(ChatActions.getActiveChatsSuccess(response.data));
  } else {
    yield put(ChatActions.getActiveChatsFailure());
  }
}
