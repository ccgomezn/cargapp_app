export default function (api) {
  return {
    getProfile: (params = {}) => api.get('profiles/me', params),
    editProfile: (id, data) => api.put(`profiles/${id}`, data),
  };
}
