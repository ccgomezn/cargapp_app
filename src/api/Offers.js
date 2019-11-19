export default function (api) {
  return {
    getOffers: (params = {}) => api.get('services/active', params),
    applyOffer: data => api.post('service_users', data),
    getMyOffers: id => api.get(`services/find_driver/${id}`),
    getServices: params => api.get('service_users/me', params),
    putStateOriginTravel: (id, data) => api.put(`services/${id}`, data),
  };
}
