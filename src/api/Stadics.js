export default function (api) {
  return {
    getStadics: params => api.get('users/statistics/', params),
  };
}
