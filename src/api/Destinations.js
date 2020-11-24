export default function (api) {
  return {
    getDestinations: (params = {}) => api.get('services/destinations', params),
  };
}
