export const currencies = [
  { value: 'DOLLAR', label: 'DOLLAR', symbol: '$' },
  { value: 'EURO', label: 'EURO', symbol: '€' },
  { value: 'REAL', label: 'REAL', symbol: 'R$' },
];

export const currencySymbol = (currency) => {
  return currencies
    .filter((item) => item.value === currency)
    .map((item) => item.symbol);
};
