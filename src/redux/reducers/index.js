/* eslint-disable global-require */
import { combineReducers } from 'redux';

export default combineReducers({
  user: require('./UserRedux').reducer,
  driver: require('./DriverRedux').reducer,
  countries: require('./CountrieRedux').reducer,
  offers: require('./OffersRedux').reducer,
  vehicles: require('./VehicleRedux').reducer,
  companies: require('./CompanyRedux').reducer,
  profile: require('./ProfileRedux').reducer,
  coupons: require('./CouponsRedux').reducer,
  status: require('./StatusRedux').reducer,
  password: require('./PasswordRedux').reducer,
});
