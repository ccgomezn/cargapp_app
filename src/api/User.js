export default function (api) {
  return {
    verifyPhone: params => api.post('users/phone_verify/', params),
    validatePin: params => api.post('users/validate_number/', params),
    registerUser: params => api.post('users/', params),
    resendPin: params => api.post('users/resend_code/', params),
  };
}
