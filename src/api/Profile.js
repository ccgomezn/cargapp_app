export default function (api) {
  return {
    getProfile: (params = {}) => api.get('profiles/me', params),
  };
}
