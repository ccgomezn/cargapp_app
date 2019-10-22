export default function (api) {
  return {
    getCompanies: (params = {}) => api.get('company/active', params),
  };
}
