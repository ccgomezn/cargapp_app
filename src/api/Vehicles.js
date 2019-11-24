export default function (api) {
  return {
    getVehicles: params => api.get('vehicle_types/active', params),
    getMeVehicles: params => api.get('vehicles/me', params),
    postRegVehicle: params => api.post('vehicles', params),
  };
}
