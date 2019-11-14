export default function (api) {
  return {
    getVehicles: params => api.get('vehicle_types/active', params),
  };
}
