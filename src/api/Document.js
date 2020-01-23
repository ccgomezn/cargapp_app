export default function (api) {
  const headers = {
    'Content-Type': 'multipart/form-data',
  };
  return {
    registerDocument: params => api.post('/documents/', params, { headers }),
    registerDocumentService: params => api.post('/service_documents/', params, { headers }),
    getDocumentsOfService: id => api.get(`/service_documents/find_service/${id}`),
    getDocumentsTypes: params => api.get('/document_types/active/', params),
    getDocumentsMe: params => api.get('/documents/me/', params),
    deleteDocument: id => api.delete(`/documents/${id}`),
  };
}
