export default function (api) {
  return {
    getFilterOffers: data => api.get(`services/filter/${data.startPrice}/${data.endPrice}/${data.vehicle}/${null}/${data.origin}/${data.destination}`),
  };
}
