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
import { LocationTypes } from '../reducers/GeolocationRedux';
import { ChatTypes } from '../reducers/ChatRedux';
import { ParametersTypes } from '../reducers/ParametersRedux';
import { FilterTypes } from '../reducers/FilterOffersRedux';
import { PermissionTypes } from '../reducers/PermissionsRedux';
import { DestinationsTypes } from '../reducers/DestinationsRedux';
import { ChallengeTypes } from '../reducers/ChallengeRedux';
import { PrizesTypes } from '../reducers/PrizesRedux';
import { TopTypes } from '../reducers/TopUsersRedux';
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
  getInfoUser,
} from './UserSagas';
import { countriesActive } from './CountrieSagas';
import {
  registerDocument, registerDocumentService, getDocsServiceRequest, getDocumentTypes,
  getDocumentsMe,
} from './DocumentSagas';
import {
  getOffers, applyOffer, getMyOffers, getServices, putStateOriginTravel,
} from './OffersSagas';
import { getVehicles, getMeVehicles, registerVehicle } from './VehicleSagas';
import { getCompanies, registerCompanies } from './CompanySagas';
import { getProfile, editProfile } from './ProfileSagas';
import { getLoadsType } from './LoadSagas';
import { registerPayment, getPaymentMethod } from './PaymentSagas';
import { getCoupons, postCoupon } from './CouponsSagas';
import { getStatus } from './StatusSagas';
import { putPassword } from './PasswordSagas';
import { getMarkers } from './MarkersSagas';
import { postBankAccount, putBankAccount, getBankAccount } from './BankAccountSagas';
import { getParameters, getSecondParameters } from './ParametersSagas';
import { postRateServices, getRateServices } from './RateService';
import { sendLocation, getLocationTarget } from './GeolocationSagas';
import { getActiveChats, getMineChats } from './ChatSagas';
import { getFilterOffers } from './FilterOffersSagas';
import { getPermission } from './PermissionsSagas';
import { getDestinations } from './DestinationsSagas';
import { getActiveChallenge } from './ChallengeSagas';
import { getActivePrizes } from './PrizesSagas';
import { getTopUsers } from './TopUsersSagas';
/* ----------  API ------------ */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = API.create();

/* ----------- Connects Types to Sagas ------------ */
export default function* root() {
  yield all([
    takeLatest(LocationTypes.POST_LOCATION_REQUEST, sendLocation, api),
    takeLatest(LocationTypes.GET_LOCATION_TARGET_REQUEST, getLocationTarget, api),
    takeLatest(ChatTypes.GET_ME_CHATS_REQUEST, getMineChats, api),
    takeLatest(ChatTypes.GET_ACTIVE_CHATS_REQUEST, getActiveChats, api),
    takeLatest(DriverTypes.POST_DRIVER_ME_REQUEST, profileDriver, api),
    takeLatest(UserTypes.POST_VERIFY_REQUEST, verifyPhone, api),
    takeLatest(UserTypes.POST_VALIDATE_REQUEST, validatePin, api),
    takeLatest(UserTypes.POST_REGISTER_REQUEST, registerUser, api),
    takeLatest(UserTypes.POST_RESEND_REQUEST, resendPin, api),
    takeLatest(CountrieTypes.POST_COUNTRIES_REQUEST, countriesActive, api),
    takeLatest(UserTypes.POST_LOGIN_REQUEST, loginUser, api),
    takeLatest(DocumentTypes.POST_REGISTER_DOC_REQUEST, registerDocument, api),
    takeLatest(DocumentTypes.POST_REGISTER_DOC_SERVICE_REQUEST, registerDocumentService, api),
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
    takeLatest(DocumentTypes.GET_DOCS_SERVICE_REQUEST, getDocsServiceRequest, api),
    takeLatest(PasswordTypes.PUT_PASSWORD_REQUEST, putPassword, api),
    takeLatest(StatusTypes.GET_STATUS_REQUEST, getStatus, api),
    takeLatest(OffersTypes.GET_SERVICES_REQUEST, getServices, api),
    takeLatest(OffersTypes.PUT_STATE_IN_TRAVEL_ORIGIN_REQUEST, putStateOriginTravel, api),
    takeLatest(MarkersTypes.GET_MARKERS_REQUEST, getMarkers, api),
    takeLatest(BankAccountTypes.POST_BANK_ACCOUNT_REQUEST, postBankAccount, api),
    takeLatest(BankAccountTypes.PUT_BANK_ACCOUNT_REQUEST, putBankAccount, api),
    takeLatest(BankAccountTypes.GET_BANK_ACCOUNT_REQUEST, getBankAccount, api),
    takeLatest(RateTypes.POST_RATE_SERVICE_REQUEST, postRateServices, api),
    takeLatest(RateTypes.GET_RATE_SERVICE_REQUEST, getRateServices, api),
    takeLatest(ParametersTypes.PARAMETERS_REQUEST, getParameters, api),
    takeLatest(ParametersTypes.PARAMETERS_SECOND_REQUEST, getSecondParameters, api),
    takeLatest(UserTypes.GET_USERINFO_REQUEST, getInfoUser, api),
    takeLatest(VehicleTypes.GET_ME_VEHICLES_REQUEST, getMeVehicles, api),
    takeLatest(VehicleTypes.POST_REG_VEHICLE_REQUEST, registerVehicle, api),
    takeLatest(FilterTypes.GET_OFFERS_BY_FILTER_REQUEST, getFilterOffers, api),
    takeLatest(PermissionTypes.GET_PERMISSION_REQUEST, getPermission, api),
    takeLatest(DestinationsTypes.GET_DESTINATIONS_REQUEST, getDestinations, api),
    takeLatest(ChallengeTypes.GET_ACTIVE_CHALLENGE_REQUEST, getActiveChallenge, api),
    takeLatest(PrizesTypes.GET_ACTIVE_PRIZES_REQUEST, getActivePrizes, api),
    takeLatest(TopTypes.GET_TOP_USERS_REQUEST, getTopUsers, api),
    takeLatest(DocumentTypes.GET_DOCS_TYPES_REQUEST, getDocumentTypes, api),
    takeLatest(DocumentTypes.GET_DOCS_ME_REQUEST, getDocumentsMe, api),
  ]);
}
