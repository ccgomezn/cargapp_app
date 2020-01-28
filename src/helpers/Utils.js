/* eslint-disable no-useless-escape */
/* eslint-disable no-param-reassign */
/* Utils.js */

function formatName(label) {
  // your logic
}

function formatDate(date) {
  // your logic
}

function formatPrice(amount, decimals) {
  amount = `${amount}`;
  amount = parseFloat(amount.replace(/[^0-9\.]/g, '')); // obtener solo números
  decimals = decimals !== null ? decimals : 0;

  if (isNaN(amount) || amount === 0) {
    return parseFloat(0).toFixed(decimals);
  }

  amount = `${amount.toFixed(decimals)}`;
  const amount_parts = amount.split('.');
  const regexp = /(\d+)(\d{3})/;

  while (regexp.test(amount_parts[0])) {
    { amount_parts[0] = amount_parts[0].replace(regexp, '$1' + ',' + '$2'); }
  }
  return amount_parts.join('.');
}
// Now you have to export each function you want
export {
  formatName,
  formatDate,
  formatPrice,
};
