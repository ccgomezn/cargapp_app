export default function (api) {
  return {
    postBankAccount: data => api.post('bank_accounts', data),
    parameters: data => api.get(`parameters/find/${data}`),
  };
}
