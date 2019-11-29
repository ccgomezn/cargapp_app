export default function (api) {
  const headers = {
    'Content-Type': 'multipart/form-data',
  };
  return {
    registerDocument: params => api.post('/documents/', params, { headers }),
    registerDocumentService: params => api.post('/service_documents/', params, { headers }),
  };
}
