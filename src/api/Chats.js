export default function (api) {
  return {
    getMineChats: (params = {}) => api.get('room_users/me', params),
    getActiveChats: (params = {}) => api.get('rooms/active', params),
  };
}
