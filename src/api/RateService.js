export default function (api) {
  const headers = {
    'Content-Type': 'application/json',
  };
  return {
    postRateServices: data => api.post('rate_services', data, { headers }),
    getRateServices: (params = {}) => api.get('rate_services', params),
  };
}
