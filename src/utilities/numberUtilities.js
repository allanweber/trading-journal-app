import { currencySymbol } from './currency';

const defaultOptions = {
  digits: 2,
  thousandsSeparator: '.',
  decimalSeparator: ',',
  symbol: '$',
};

export const currencyFormatter = (value, currency) => {
  const options = { ...defaultOptions, symbol: currencySymbol(currency) };
  const formatted = currencyFormat(value, options);

  return `${options.symbol} ${formatted}`;
};

export const percentFormatter = (value) => {
  let valueFormatted;
  if (value) {
    valueFormatted = currencyFormat(value * 100);
  } else {
    valueFormatted = currencyFormat(0);
  }
  return `${valueFormatted} %`;
};

export const currencyFormat = (value, options) => {
  if (value === undefined) {
    value = 0;
  }

  options = { ...defaultOptions, ...options };
  const fixed = value.toFixed(options.digits);

  const [currency, decimal] = fixed.split('.');

  const thousandsSeparator = options.thousandsSeparator ?? '.';

  return `${currency.replace(/\B(?=(\d{3})+(?!\d))/g, thousandsSeparator)}${
    options.decimalSeparator
  }${decimal}`;
};
