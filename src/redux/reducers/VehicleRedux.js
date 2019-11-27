import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* -------------- Actions -------------- */
export const { Types, Creators } = createActions({
  getVehicleRequest: ['params'],
  getVehicleSuccess: ['data'],
  getVehicleFailure: null,
  // get list vehicles
  getMeVehiclesRequest: ['params'],
  getMeVehiclesSuccess: ['data'],
  getMeVehiclesFailure: null,
  // post register vehicle
  postRegVehicleRequest: ['params'],
  postRegVehicleSuccess: ['data'],
  postRegVehicleFailure: null,
  postRegVehicleUnprocess: ['params'],
});

export const VehicleTypes = Types;
export default Creators;

/* -------------- Initial state -------------- */

export const INITIAL_STATE = Immutable({
  fetching: false,
  error: null,
  data: null,
  list: null,
  status: false,
  unprocess: false,
  reg: null,
});

/* -------------- Reducers -------------- */
/* -------------- Get Types Vehicles ------------- */
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

/* ------------- get list vechicles -------------- */
export const getMeVehiclesRequest = state => ({
  ...state,
  error: false,
  fetching: true,
  status: false,
  reg: false,
});

export const getMeVehiclesSuccess = (state, { data }) => ({
  ...state,
  fetching: false,
  list: data,
  status: true,
  error: false,
});

export const getMeVehiclesFailure = state => ({
  ...state,
  error: true,
  fetching: false,
  status: false,
});

/* -------------- register Vehicle -------------- */
export const postRegVehicleRequest = state => ({
  ...state,
  error: false,
  fetching: true,
  reg: null,
});

export const postRegVehicleSuccess = (state, { data }) => ({
  ...state,
  fetching: false,
  reg: data,
  error: false,
  unprocess: false,
});

export const postRegVehicleUnprocess = (state, { data }) => ({
  ...state,
  fetching: false,
  reg: data,
  unprocess: true,
});

export const postRegVehicleFailure = state => ({
  ...state,
  fetching: false,
  error: true,
  reg: null,
});

/* -------------- Reducers to types-------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_VEHICLE_REQUEST]: getVehicleRequest,
  [Types.GET_VEHICLE_SUCCESS]: getVehicleSuccess,
  [Types.GET_VEHICLE_FAILURE]: getVehicleFailure,
  [Types.GET_ME_VEHICLES_REQUEST]: getMeVehiclesRequest,
  [Types.GET_ME_VEHICLES_SUCCESS]: getMeVehiclesSuccess,
  [Types.GET_ME_VEHICLES_FAILURE]: getMeVehiclesFailure,
  [Types.POST_REG_VEHICLE_REQUEST]: postRegVehicleRequest,
  [Types.POST_REG_VEHICLE_SUCCESS]: postRegVehicleSuccess,
  [Types.POST_REG_VEHICLE_UNPROCESS]: postRegVehicleUnprocess,
  [Types.POST_REG_VEHICLE_FAILURE]: postRegVehicleFailure,
});
