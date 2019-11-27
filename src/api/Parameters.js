export default function (api) {
  return {
    parameters: data => api.get(`parameters/find/${data}`),
  };
}
