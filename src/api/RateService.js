export default function (api) {
  return {
    postRateService: data => api.get('rate/services', data),
  };
}
