export default function (api) {
  return {
    postRateServices: data => api.post('rate_services', data),
  };
}
