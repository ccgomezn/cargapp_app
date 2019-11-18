import { all, takeLatest } from 'redux-saga/effects';
import API from '../../api';

/* ---------- Types ----------- */
import { DriverTypes } from '../reducers/DriverRedux';
import { UserTypes } from '../reducers/UserRedux';
import { CountrieTypes } from '../reducers/CountrieRedux';
import { OffersTypes } from '../reducers/OffersRedux';
import { VehicleTypes } from '../reducers/VehicleRedux';
import { CompanyTypes } from '../reducers/CompanyRedux';
import { ProfileTypes } from '../reducers/ProfileRedux';
import { CouponsTypes } from '../reducers/CouponsRedux';
import { StatusTypes } from '../reducers/StatusRedux';
import { PasswordTypes } from '../reducers/PasswordRedux';
/* ---------- Sagas ----------- */
import { profileDriver } from './DriverSagas';
import {
  verifyPhone,
  validatePin,
  registerUser,
  resendPin,
  loginUser,
} from './UserSagas';
import { countriesActive } from './CountrieSagas';
import {
  getOffers, applyOffer, getMyOffers, getServices, putStateOriginTravel,
} from './OffersSagas';
import { getVehicles } from './VehicleSagas';
import { getCompanies } from './CompanySagas';
import { getProfile, editProfile } from './ProfileSagas';
import { getCoupons, postCoupon } from './CouponsSagas';
import { getStatus } from './StatusSagas';
import { putPassword } from './PasswordSagas';
/* ----------  API ------------ */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = API.create();

/* ----------- Connects Types to Sagas ------------ */
export default function* root() {
  yield all([
    takeLatest(DriverTypes.POST_DRIVER_ME_REQUEST, profileDriver, api),
    takeLatest(UserTypes.POST_VERIFY_REQUEST, verifyPhone, api),
    takeLatest(UserTypes.POST_VALIDATE_REQUEST, validatePin, api),
    takeLatest(UserTypes.POST_REGISTER_REQUEST, registerUser, api),
    takeLatest(UserTypes.POST_RESEND_REQUEST, resendPin, api),
    takeLatest(CountrieTypes.POST_COUNTRIES_REQUEST, countriesActive, api),
    takeLatest(UserTypes.POST_LOGIN_REQUEST, loginUser, api),
    takeLatest(OffersTypes.GET_OFFERS_REQUEST, getOffers, api),
    takeLatest(VehicleTypes.GET_VEHICLE_REQUEST, getVehicles, api),
    takeLatest(CompanyTypes.GET_COMPANIES_REQUEST, getCompanies, api),
    takeLatest(OffersTypes.POST_APPLY_OFFER_REQUEST, applyOffer, api),
    takeLatest(ProfileTypes.GET_PROFILE_REQUEST, getProfile, api),
    takeLatest(ProfileTypes.EDIT_PROFILE_REQUEST, editProfile, api),
    takeLatest(CouponsTypes.GET_COUPONS_REQUEST, getCoupons, api),
    takeLatest(CouponsTypes.POST_COUPONS_REQUEST, postCoupon, api),
    takeLatest(OffersTypes.GET_MY_OFFERS_REQUEST, getMyOffers, api),
    takeLatest(PasswordTypes.PUT_PASSWORD_REQUEST, putPassword, api),
    takeLatest(StatusTypes.GET_STATUS_REQUEST, getStatus, api),
    takeLatest(OffersTypes.GET_SERVICES_REQUEST, getServices, api),
    takeLatest(OffersTypes.PUT_STATE_IN_TRAVEL_ORIGIN_REQUEST, putStateOriginTravel, api),
  ]);
}
