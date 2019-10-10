import { all, takeLatest } from 'redux-saga/effects';
import API from '../../api';

/* ---------- Types ----------- */
import { DriverTypes } from '../reducers/DriverRedux';
import { UserTypes } from '../reducers/UserRedux';
import { CountrieTypes } from '../reducers/CountrieRedux';
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
  ]);
}
