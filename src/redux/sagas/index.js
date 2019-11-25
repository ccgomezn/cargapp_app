import { all, takeLatest } from 'redux-saga/effects';
import API from '../../api';

/* ---------- Types ----------- */
import { DriverTypes } from '../reducers/DriverRedux';
import { UserTypes } from '../reducers/UserRedux';
import { CountrieTypes } from '../reducers/CountrieRedux';
import { DocumentTypes } from '../reducers/DocumentRedux';
import { OffersTypes } from '../reducers/OffersRedux';
import { VehicleTypes } from '../reducers/VehicleRedux';
import { CompanyTypes } from '../reducers/CompanyRedux';
import { ProfileTypes } from '../reducers/ProfileRedux';
import { LoadTypes } from '../reducers/LoadRedux';
import { PaymentTypes } from '../reducers/PaymentRedux';
import { CouponsTypes } from '../reducers/CouponsRedux';
import { StatusTypes } from '../reducers/StatusRedux';
import { PasswordTypes } from '../reducers/PasswordRedux';
import { MarkersTypes } from '../reducers/MarkersRedux';
import { BankAccountTypes } from '../reducers/BankAccountRedux';
import { RateTypes } from '../reducers/RateServiceRedux';
import { LocationTypes } from "../reducers/GeolocationRedux";
/* ---------- Sagas ----------- */
import { profileDriver } from './DriverSagas';
import {
  verifyPhone,
  validatePin,
  registerUser,
  resendPin,
  loginUser,
  forgotPass,
  resetPass,
} from './UserSagas';
import { countriesActive } from './CountrieSagas';
import { registerDocument } from './DocumentSagas';
import {
  getOffers, applyOffer, getMyOffers, getServices, putStateOriginTravel,
} from './OffersSagas';
import { getVehicles } from './VehicleSagas';
import { getCompanies, registerCompanies } from './CompanySagas';
import { getProfile, editProfile } from './ProfileSagas';
import { getLoadsType } from './LoadSagas';
import { registerPayment, getPaymentMethod } from './PaymentSagas';
import { getCoupons, postCoupon } from './CouponsSagas';
import { getStatus } from './StatusSagas';
import { putPassword } from './PasswordSagas';
import { getMarkers } from './MarkersSagas';
import { postBankAccount, parameters } from './BankAccountSagas';
import { postRateServices } from './RateService';
import {sendLocation} from "./GeolocationSagas";
/* ----------  API ------------ */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = API.create();

/* ----------- Connects Types to Sagas ------------ */
export default function* root() {
  yield all([takeLatest(LocationTypes.POST_LOCATION_REQUEST, sendLocation, api),
    takeLatest(DriverTypes.POST_DRIVER_ME_REQUEST, profileDriver, api),
    takeLatest(UserTypes.POST_VERIFY_REQUEST, verifyPhone, api),
    takeLatest(UserTypes.POST_VALIDATE_REQUEST, validatePin, api),
    takeLatest(UserTypes.POST_REGISTER_REQUEST, registerUser, api),
    takeLatest(UserTypes.POST_RESEND_REQUEST, resendPin, api),
    takeLatest(CountrieTypes.POST_COUNTRIES_REQUEST, countriesActive, api),
    takeLatest(UserTypes.POST_LOGIN_REQUEST, loginUser, api),
    takeLatest(DocumentTypes.POST_REGISTER_DOC_REQUEST, registerDocument, api),
    takeLatest(OffersTypes.GET_OFFERS_REQUEST, getOffers, api),
    takeLatest(VehicleTypes.GET_VEHICLE_REQUEST, getVehicles, api),
    takeLatest(CompanyTypes.GET_COMPANIES_REQUEST, getCompanies, api),
    takeLatest(OffersTypes.POST_APPLY_OFFER_REQUEST, applyOffer, api),
    takeLatest(ProfileTypes.GET_PROFILE_REQUEST, getProfile, api),
    takeLatest(UserTypes.POST_PASSWORD_REQUEST, forgotPass, api),
    takeLatest(UserTypes.POST_RESET_PASS_REQUEST, resetPass, api),
    takeLatest(LoadTypes.GET_LOADSTYPE_REQUEST, getLoadsType, api),
    takeLatest(CompanyTypes.POST_REG_COMPANIES_REQUEST, registerCompanies, api),
    takeLatest(PaymentTypes.POST_REG_PAYMENT_REQUEST, registerPayment, api),
    takeLatest(PaymentTypes.GET_PAYMENT_METHOD_REQUEST, getPaymentMethod, api),
    takeLatest(ProfileTypes.EDIT_PROFILE_REQUEST, editProfile, api),
    takeLatest(CouponsTypes.GET_COUPONS_REQUEST, getCoupons, api),
    takeLatest(CouponsTypes.POST_COUPONS_REQUEST, postCoupon, api),
    takeLatest(OffersTypes.GET_MY_OFFERS_REQUEST, getMyOffers, api),
    takeLatest(PasswordTypes.PUT_PASSWORD_REQUEST, putPassword, api),
    takeLatest(StatusTypes.GET_STATUS_REQUEST, getStatus, api),
    takeLatest(OffersTypes.GET_SERVICES_REQUEST, getServices, api),
    takeLatest(OffersTypes.PUT_STATE_IN_TRAVEL_ORIGIN_REQUEST, putStateOriginTravel, api),
    takeLatest(MarkersTypes.GET_MARKERS_REQUEST, getMarkers, api),
    takeLatest(BankAccountTypes.POST_BANK_ACCOUNT_REQUEST, postBankAccount, api),
    takeLatest(RateTypes.POST_RATE_SERVICE_REQUEST, postRateServices, api),
    takeLatest(BankAccountTypes.PARAMETERS_REQUEST, parameters, api),
  ]);
}
