export default function (api) {
  const headers = {
    'Content-Type': 'application/json',
  };
  return {
    getOffers: (params = {}) => api.get('services/active', params, headers),
    applyOffer: data => api.post('service_users', data, headers),
    getMyOffers: id => api.get(`services/find_driver/${id}`, headers),
    getServices: params => api.get('service_users/me', params, headers),
    putStateOriginTravel: (id, data) => api.put(`services/${id}`, data, headers),
  };
}
