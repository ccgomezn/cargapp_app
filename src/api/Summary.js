export default function (api) {
  return {
    getSummary: id => api.get(`services/summary/${id}`),
  };
}
