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
import { getOffers, applyOffer } from './OffersSagas';
import { getVehicles } from './VehicleSagas';
import { getCompanies } from './CompanySagas';
import { getProfile, editProfile } from './ProfileSagas';
import { getLoadsType } from './LoadSagas';
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
    takeLatest(DocumentTypes.POST_REGISTER_DOC_REQUEST, registerDocument, api),
    takeLatest(OffersTypes.GET_OFFERS_REQUEST, getOffers, api),
    takeLatest(VehicleTypes.GET_VEHICLE_REQUEST, getVehicles, api),
    takeLatest(CompanyTypes.GET_COMPANIES_REQUEST, getCompanies, api),
    takeLatest(OffersTypes.POST_APPLY_OFFER_REQUEST, applyOffer, api),
    takeLatest(ProfileTypes.GET_PROFILE_REQUEST, getProfile, api),
    takeLatest(ProfileTypes.EDIT_PROFILE_REQUEST, editProfile, api),
    takeLatest(UserTypes.POST_PASSWORD_REQUEST, forgotPass, api),
    takeLatest(UserTypes.POST_RESET_PASS_REQUEST, resetPass, api),
    takeLatest(LoadTypes.GET_LOADSTYPE_REQUEST, getLoadsType, api),
  ]);
}
