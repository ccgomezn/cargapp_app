export default function (api) {
  return {
    getTopUsers: params => api.get('users/top', params),
  };
}
