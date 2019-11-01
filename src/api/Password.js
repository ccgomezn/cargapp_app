export default function (api) {
  return {
    putPassword: data => api('users/update_password', data),
  };
}
