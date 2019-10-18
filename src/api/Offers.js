export default function (api) {
  return {
    getOffers: (params = {}) => api.get('services/active', params),
  };
}
