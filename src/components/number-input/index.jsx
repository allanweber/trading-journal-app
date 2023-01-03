import TextField from '@mui/material/TextField';
import { forwardRef, useEffect, useState } from 'react';
import { IMaskInput } from 'react-imask';

const TextMaskCustom = forwardRef(function TextMaskCustom(props, ref) {
  const { onChange, scale, padZeros, ...other } = props;
  return (
    <IMaskInput
      {...other}
      mask={Number}
      unmask={true}
      lazy={false}
      inputRef={ref}
      onAccept={(value) => {
        onChange({ target: { name: props.name, value } });
      }}
      min={0}
      max={Number.MAX_SAFE_INTEGER}
      mapToRadix={['.']}
      scale={scale}
      padFractionalZeros={padZeros}
      thousandsSeparator="."
      radix=","
    />
  );
});

export const NumberInput = ({
  value,
  zeroIsInvalid,
  zeroIsNull,
  onChange,
  scale,
  error,
  helperText,
  ...rest
}) => {
  const padZeros = scale > 0;

  const [current, setCurrent] = useState(value);

  useEffect(() => {
    setCurrent(value ?? 0);
  }, [value]);

  const handleChange = (event) => {
    const value = parseFloat(event.target.value);
    if (value === 0 && (zeroIsInvalid || zeroIsNull)) {
      setCurrent(undefined);
      onChange(undefined);
    } else {
      setCurrent(value);
      onChange(value);
    }
  };

  return (
    <TextField
      value={current ? current.toString() : '0'}
      onChange={handleChange}
      error={error || (zeroIsInvalid && current === 0)}
      helperText={helperText}
      onFocus={(event) => {
        event.target.select();
      }}
      InputProps={{
        inputComponent: TextMaskCustom,
        inputProps: {
          scale: scale,
          padZeros: padZeros,
        },
      }}
      {...rest}
    />
  );
};
