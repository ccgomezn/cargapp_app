export default function (api) {
  return {
    postRateServices: data => api.post('rate_services', data),
    getRateServices: (params = {}) => api.get('rate_services', params),
  };
}
