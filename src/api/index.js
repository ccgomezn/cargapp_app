import apisauce from 'apisauce';
import Driver from './Driver';
import User from './User';
import Countrie from './Countrie';
import Document from './Document';
import Offers from './Offers';
import Vehicles from './Vehicles';
import Companies from './Company';
import Profile from './Profile';
import Load from './Load';
import Payment from './Payment';
import Coupons from './Coupons';
import Status from './Status';
import Password from './Password';
import Markers from './Markers';
import RateService from './RateService';
import BankAccount from './BankAccount';
import Geolocation from './Geolocations';
import Chats from './Chats';
import Parameters from './Parameters';
import FilterOffers from './FilterOffers';
import Permissions from './Permissions';

import Destinations from './Destinations';
import Challenges from './Challenges';
import Prizes from './Prizes';
import Top from './TopUser';
import Statics from './Stadics';
import Summary from './Summary';
import DocumentVehicle from './DocumentVehicle';
/* URL
  'https://api.cargapp.co/api/v1/';
  'https://lite.cargapp.co/api/v1/';
*/

// CONSTRUCTOR
const create = (baseURL = 'https://api.cargapp.co/api/v1/') => {
  const api = apisauce.create({
    // BASE URL
    baseURL,
    headers: {
      'Cache-Control': 'no-cache',
    },
    // 2000 SECOND TIMEOUT...
    timeout: 40000,
  });
  const geolocation = new Geolocation(api);
  const driver = new Driver(api);
  const user = new User(api);
  const countrie = new Countrie(api);
  const document = new Document(api);
  const offers = new Offers(api);
  const vehicle = new Vehicles(api);
  const company = new Companies(api);
  const profile = new Profile(api);
  const load = new Load(api);
  const payment = new Payment(api);
  const coupons = new Coupons(api);
  const status = new Status(api);
  const password = new Password(api);
  const markers = new Markers(api);
  const rateService = new RateService(api);
  const bankAccount = new BankAccount(api);
  const chats = new Chats(api);
  const parameters = new Parameters(api);
  const filterOffers = new FilterOffers(api);
  const permissions = new Permissions(api);
  const destinations = new Destinations(api);
  const challenges = new Challenges(api);
  const prizes = new Prizes(api);
  const top = new Top(api);
  const statics = new Statics(api);
  const summary = new Summary(api);
  const documentVehicle = new DocumentVehicle(api);
  // RETURN API
  return {
    setAuthToken: token => api.setHeader('Authorization', `Bearer ${token}`),
    removeAuthToken: () => api.deleteHeader('Authorization'),
    setContent: type => api.setHeader('Content-Type', type),
    driver,
    user,
    countrie,
    document,
    company,
    vehicle,
    offers,
    profile,
    load,
    payment,
    coupons,
    status,
    password,
    markers,
    rateService,
    bankAccount,
    geolocation,
    chats,
    parameters,
    filterOffers,
    permissions,
    destinations,
    challenges,
    prizes,
    top,
    statics,
    summary,
    documentVehicle,
  };
};
// LET'S RETURN BACK OUR CREATE METHOD AS THE DEFAULT.
export default {
  create,
};
