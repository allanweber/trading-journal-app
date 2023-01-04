import {
  Autocomplete,
  CircularProgress,
  createFilterOptions,
  TextField,
} from '@mui/material';
import React, { useState } from 'react';
import { useJournalContext } from '../../context/JournalContext';
import { useGetSymbols } from '../../services/EntryQueries';

const filter = createFilterOptions();

export const Symbol = ({
  onChange,
  journalId,
  value,
  label,
  onBlur,
  error,
  helperText,
  ...rest
}) => {
  const [current, setCurrent] = useState(value ? { name: value } : null);
  const { journal } = useJournalContext();

  const { data: symbols, isLoading } = useGetSymbols(journal.id);

  const change = (newValue) => {
    let selected;
    if (typeof newValue === 'string') {
      selected = { name: newValue };
    } else if (newValue && newValue.inputValue) {
      selected = { name: newValue.inputValue };
    } else {
      selected = newValue;
    }
    setCurrent(selected);

    if (onChange) {
      onChange(selected ? selected.name : undefined);
    }
  };

  const filterOption = (options, params) => {
    const filtered = filter(options, params);
    const { inputValue } = params;
    const isExisting = options.some((option) => inputValue === option.name);
    if (inputValue !== '' && !isExisting) {
      filtered.push({ inputValue });
    }
    return filtered;
  };

  const labelOption = (option) => {
    if (typeof option === 'string') {
      return option;
    }
    if (option.inputValue) {
      return option.inputValue;
    }
    return option.name;
  };

  const completeBlur = (newValue) => {
    const isExisting = symbols.some((symbol) => newValue === symbol.name);
    if (!isExisting) {
      setCurrent({ name: newValue });
      if (onChange) {
        onChange(newValue);
      }
    }
  };

  return (
    <Autocomplete
      freeSolo
      value={current}
      options={symbols || []}
      loading={isLoading}
      onBlur={(e) => completeBlur(e.target.value)}
      onChange={(e, newValue) => change(newValue)}
      filterOptions={filterOption}
      getOptionLabel={labelOption}
      selectOnFocus
      handleHomeEndKeys
      renderInput={(params) => (
        <TextField
          {...params}
          variant="filled"
          label={label}
          onBlur={onBlur}
          error={error}
          helperText={helperText}
          InputProps={{
            ...params.InputProps,
            type: 'search',
            endAdornment: (
              <React.Fragment>
                {isLoading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
          {...rest}
        />
      )}
    />
  );
};
