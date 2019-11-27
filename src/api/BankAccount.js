export default function (api) {
  return {
    postBankAccount: data => api.post('bank_accounts', data),
    getBankAccount: (params = {}) => api.get('bank_accounts/me', params),
    putBankAccount: (id, data) => api.put(`bank_accounts/${id}`, data),
  };
}
