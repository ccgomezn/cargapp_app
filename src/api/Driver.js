export default function (api) {
  const token = 'bnpoL5Zih5lCwGirzGcS_bTzCh0Fg5kV--uobdysZUw';
  return {
    postDriver: (params = {}) => api.post(`drivers/?access_token=${token}`, params),
    locationsDriver: params => api.post(`driver_locations?&access_token=${token}`, params),
    profileDriver: params => api.post(`drivers/me/?access_token=${token}`, params),
  };
}
