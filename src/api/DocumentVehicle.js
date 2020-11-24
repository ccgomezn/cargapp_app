export default function (api) {
  const headers = {
    'Content-Type': 'multipart/form-data',
  };
  return {
    registerDocument: params => api.post('/vehicle_documents/', params, { headers }),
    getDocsVehicleMe: idVehicle => api.get(`/vehicle_documents/me/${idVehicle}`),
    deleteDocVehicle: id => api.delete(`/vehicle_documents/${id}`),
  };
}
