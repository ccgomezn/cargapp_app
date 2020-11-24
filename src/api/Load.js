export default function (api) {
  return {
    getloadTypes: (params = {}) => api.get('load_types/active', params),
  };
}
