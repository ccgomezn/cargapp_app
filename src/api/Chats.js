export default function (api) {
  return {
    getMineChats: (params = {}) => api.get('rooms/me', params),
  };
}
