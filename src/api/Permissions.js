export default function (api) {
  return {
    getPermissions: (params = {}) => api.get('users/check', params),
  };
}
