export default function (api) {
  return {
    getActivePrizes: (params = {}) => api.get('prizes/active', params),
  };
}
