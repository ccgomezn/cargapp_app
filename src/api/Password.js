export default function (api) {
  return {
    putPassword: data => api.put('users/update_password', data),
  };
}
