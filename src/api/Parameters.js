export default function (api) {
  return {
    getParameters: data => api.get(`parameters/find/${data}`),
  };
}
