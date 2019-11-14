export default function (api) {
  return {
    countriesActive: (params = {}) => api.get('https://api.cargapp.co/api/v1/countries/active/', params),
  };
}
