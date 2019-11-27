import Immutable from 'seamless-immutable';
import { createReducer, createActions } from 'reduxsauce';

/* -------------------- Actions --------------------- */
export const { Types, Creators } = createActions({
  getMeChatsRequest: ['params'],
  getMeChatsSuccess: ['myRooms'],
  getMeChatsFailure: ['params'],
  getActiveChatsRequest: ['params'],
  getActiveChatsSuccess: ['activeRooms'],
  getActiveChatsFailure: ['params'],
});
export const ChatTypes = Types;
export default Creators;

/* INITIAL STATE */

export const INITIAL_STATE = Immutable({
  data: null,
  fetching: false,
  error: false,
  myRooms: null,
  activeRooms: null,
});

/* REDUCERS */

export const getMeChatsRequest = state => ({
  ...state,
  fetching: true,
});

export const getMeChatsSuccess = (state, { myRooms }) => ({
  ...state,
  myRooms,
  error: false,
  fetching: false,
});

export const getMeChatsFailure = state => ({
  ...state,
  fetching: false,
  error: true,
});

export const getActiveChatsRequest = state => ({
  ...state,
  fetching: true,
});

export const getActiveChatsSuccess = (state, { activeRooms }) => ({
  ...state,
  activeRooms,
  error: false,
  fetching: false,
});

export const getActiveChatsFailure = state => ({
  ...state,
  fetching: false,
  error: true,
});

/* REDUCER TO TYPES */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_ME_CHATS_REQUEST]: getMeChatsRequest,
  [Types.GET_ME_CHATS_SUCCESS]: getMeChatsSuccess,
  [Types.GET_ME_CHATS_FAILURE]: getMeChatsFailure,
  [Types.GET_ACTIVE_CHATS_REQUEST]: getActiveChatsRequest,
  [Types.GET_ACTIVE_CHATS_SUCCESS]: getActiveChatsSuccess,
  [Types.GET_ACTIVE_CHATS_FAILURE]: getActiveChatsFailure,
});
