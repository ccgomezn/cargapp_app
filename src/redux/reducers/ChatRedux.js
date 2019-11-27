import Immutable from 'seamless-immutable';
import { createReducer, createActions } from 'reduxsauce';

/* -------------------- Actions --------------------- */
export const { Types, Creators } = createActions({
  getMeChatsRequest: ['params'],
  getMeChatsSuccess: ['data'],
  getMeChatsFailure: ['params'],
});
export const ChatTypes = Types;
export default Creators;

/* INITIAL STATE */

export const INITIAL_STATE = Immutable({
  data: null,
  fetching: false,
  error: false,
  myRooms: null,
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

/* REDUCER TO TYPES */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_ME_CHATS_REQUEST]: getMeChatsRequest,
  [Types.GET_ME_CHATS_SUCCESS]: getMeChatsSuccess,
  [Types.GET_ME_CHATS_FAILURE]: getMeChatsFailure,
});
