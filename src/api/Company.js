export default function (api) {
  return {
    getCompanies: (params = {}) => api.get('companies/active', params),
  };
}
