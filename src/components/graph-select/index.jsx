import { useState } from 'react';
import { graphs } from '../../utilities/graphs';
import { Dropdown } from '../dropdown';

export const GraphSelect = ({ onChange, value, ...rest }) => {
  let allItems = graphs.map((item) => ({
    value: item.value,
    label: item.label,
  }));

  const [currentValue, setCurrentValue] = useState(value || '');

  allItems = [{ value: '', label: 'None' }, ...allItems];

  const [items] = useState(allItems);

  const change = (newValue) => {
    setCurrentValue(newValue);
    if (onChange) {
      onChange(newValue === '' ? undefined : newValue);
    }
  };

  return (
    <Dropdown onChange={change} items={items} value={currentValue} {...rest} />
  );
};
