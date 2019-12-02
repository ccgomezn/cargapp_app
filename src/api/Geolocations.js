export default function (api) {
  return {
    postLocation: data => api.post('user_locations', data),
    getLocationTarget: params => api.get('parameters/find/GEOLOCATION_TARGET'),
  };
}
