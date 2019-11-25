import Immutable from 'seamless-immutable';
import { createReducer, createActions } from 'reduxsauce';

/* -------------------- Actions --------------------- */
export const { Types, Creators } = createActions({
    postLocationRequest: ['params'],
    postLocationSuccess: ['data'],
    postLocationFailure: ['params'],
});
export const LocationTypes = Types;
export default Creators;

/* INITIAL STATE */

export const INITIAL_STATE = Immutable({
    data: null,
    fetching: false,
    error: false,
});

/* REDUCERS */

export const postLocationRequest = state => ({
    ...state,
    fetching: true,
});

export const postLocationSuccess = (state, { data }) => ({
    ...state,
    data,
    error: false,
    fetching: false,
});

export const postLocationFailure = state => ({
    ...state,
    fetching: false,
    error: true,
});

/* REDUCER TO TYPES */

export const reducer = createReducer(INITIAL_STATE, {
    [Types.POST_LOCATION_REQUEST]: postLocationRequest,
    [Types.POST_LOCATION_SUCCESS]: postLocationSuccess,
    [Types.POST_LOCATION_FAILURE]: postLocationFailure,
});
