export default function (api) {
  const headers = {
    'Content-Type': 'multipart/form-data',
  };
  return {
    registerDocument: params => api.post('/vehicle_documents/', params, { headers }),
    getDocumentsMe: params => api.get('/vehicle_documents/me/', params),
    deleteDocument: id => api.delete(`/vehicle_documents/${id}`),
  };
}
