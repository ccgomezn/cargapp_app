export default function (api) {
  return {
    getCoupons: (params = {}) => api.get('coupons/active', params),
  };
}
