import React from 'react';
import Autocomplete, { AutocompleteProps } from '@mui/material/Autocomplete';
import TextField, { TextFieldProps } from '@mui/material/TextField';

interface TcAutocompleteProps<T>
  extends Omit<AutocompleteProps<T, boolean, boolean, boolean>, 'renderInput'> {
  label?: string;
  placeholder?: string;
  textFieldProps?: TextFieldProps;
}

function TcAutocomplete<T>({
  options,
  label,
  placeholder,
  textFieldProps,
  ...props
}: TcAutocompleteProps<T>) {
  return (
    <Autocomplete
      options={options}
      renderInput={(params) => (
        <TextField
          {...params}
          {...textFieldProps}
          label={label}
          placeholder={placeholder}
        />
      )}
      {...props}
    />
  );
}

export default TcAutocomplete;
