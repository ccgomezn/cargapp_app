export default function (api) {
  return {
    registerPayment: (params = {}) => api.post('user_payment_methods/', params),
    getPaymentMethod: (params = {}) => api.get('payment_methods/active', params),
  };
}
