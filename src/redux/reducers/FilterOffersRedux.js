import Immutable from 'seamless-immutable';
import { createActions, createReducer } from  'reduxsauce';

/* ---------- ACTIONS ---------- */
export const { Types, Creators } = createActions({
  getOffersByFilterRequest: ['data'],
  getOffersByFilterSuccess: ['data'],
  getOffersByFilterFailure: null,
});

export const FilterTypes = Types;
export default Creators;

/* ---------- INITIAL STATE ----------- */
export const INITIAL_STATE = Immutable({
  fetching: false,
  error: null,
  data: null,
});

/* ---------- REDUCERS ---------- */
