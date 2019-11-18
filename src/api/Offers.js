export default function (api) {
  return {
    getOffers: (params = {}) => api.get('services/active', params),
    applyOffer: data => api.post('service_users', data),
    getMyOffers: params => api.get('services/find_driver', params),
    getServices: params => api.get('service_users/me', params),
    putStateOriginTravel: id => api.put(`services/${id}`),
  };
}
