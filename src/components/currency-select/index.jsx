import { useState } from 'react';
import { currencies } from '../../utilities/currency';
import { Dropdown } from '../dropdown';

export const CurrencySelect = ({ ...rest }) => {
  const [items] = useState(
    currencies.map((item) => ({
      value: item.value,
      label: `${item.label} (${item.symbol})`,
    }))
  );

  return <Dropdown {...rest} items={items} />;
};
