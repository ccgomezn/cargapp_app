export default function (api) {
  const headers = {
    'Content-Type': 'multipart/form-data',
  };
  return {
    getProfile: (params = {}) => api.get('profiles/me', params),
    editProfile: (id, data) => api.put(`profiles/${id}`, data),
    updatePhoto: (id, data) => api.put(`profiles/${id}`, data, { headers }),
  };
}
