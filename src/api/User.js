export default function (api) {
  return {
    verifyPhone: params => api.post('users/phone_verify/', params),
    validatePin: params => api.post('users/validate_number/', params),
    registerUser: params => api.post('users/', params),
    resendPin: params => api.post('users/resend_code/', params),
    loginUser: params => api.post('users/login/', params),
    forgotPass: params => api.post('users/reset_password', params),
    resetPass: params => api.post('users/new_password', params),
  };
}
