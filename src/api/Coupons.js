export default function (api) {
  return {
    getCoupons: (params = {}) => api.get('coupons/active', params),
    postCoupon: data => api.post('user_coupons', data),
  };
}
