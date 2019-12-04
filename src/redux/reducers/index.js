/* eslint-disable global-require */
import { combineReducers } from 'redux';

export default combineReducers({
  user: require('./UserRedux').reducer,
  driver: require('./DriverRedux').reducer,
  countries: require('./CountrieRedux').reducer,
  document: require('./DocumentRedux').reducer,
  offers: require('./OffersRedux').reducer,
  vehicles: require('./VehicleRedux').reducer,
  companies: require('./CompanyRedux').reducer,
  profile: require('./ProfileRedux').reducer,
  loadsType: require('./LoadRedux').reducer,
  payment: require('./PaymentRedux').reducer,
  coupons: require('./CouponsRedux').reducer,
  status: require('./StatusRedux').reducer,
  password: require('./PasswordRedux').reducer,
  markers: require('./MarkersRedux').reducer,
  bank: require('./BankAccountRedux').reducer,
  rateService: require('./RateServiceRedux').reducer,
  chat: require('./ChatRedux').reducer,
  parameters: require('./ParametersRedux').reducer,
  filterOffers: require('./FilterOffersRedux').reducer,
  permissions: require('./PermissionsRedux').reducer,
  destinations: require('./DestinationsRedux').reducer,
  challenge: require('./ChallengeRedux').reducer,
});
