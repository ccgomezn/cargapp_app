export default function (api) {
  const headers = {
    'Content-Type': 'application/json',
  };
  return {
    postBankAccount: data => api.post('bank_accounts', data, { headers }),
    getBankAccount: (params = {}) => api.get('bank_accounts/me', params),
    putBankAccount: (id, data) => api.put(`bank_accounts/${id}`, data),
  };
}
