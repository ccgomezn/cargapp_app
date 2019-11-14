import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* -------------- Actions -------------- */
export const { Types, Creators } = createActions({
  getVehicleRequest: ['params'],
  getVehicleSuccess: ['data'],
  getVehicleFailure: null,
});

export const VehicleTypes = Types;
export default Creators;

/* -------------- Initial state -------------- */

export const INITIAL_STATE = Immutable({
  fetching: false,
  error: null,
  data: null,
});

/* -------------- Reducers -------------- */

export const getVehicleRequest = state => ({
  ...state,
  fetching: true,
  error: false,
});

export const getVehicleSuccess = (state, { data }) => ({
  ...state,
  fetching: false,
  data,
  error: false,
});

export const getVehicleFailure = state => ({
  ...state,
  error: true,
  fetching: false,
});

/* -------------- Reducers to types-------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_VEHICLE_REQUEST]: getVehicleRequest,
  [Types.GET_VEHICLE_SUCCESS]: getVehicleSuccess,
  [Types.GET_VEHICLE_FAILURE]: getVehicleFailure,
});
