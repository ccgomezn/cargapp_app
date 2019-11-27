export default function (api) {
  return {
    getMarkers: (params = {}) => api.get('reports/active', params),
  };
}
