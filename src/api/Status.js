export default function (api) {
  return {
    getStatus: params => api.get('status/active', params),
  };
}
