/**
 * TcAutocomplete Component
 *
 * A reusable autocomplete component using Material-UI's Autocomplete.
 * This component allows users to search and select from a list of options.
 *
 * Props:
 * - options: Array of objects representing the autocomplete options. Each object should have a `label` property.
 * - label: String to display as the label of the text field.
 * - onChange: Function called when an option is selected. It receives the new value as its argument.
 * - ...props: Any additional props to spread onto the MUI Autocomplete component.
 *
 * Example Usage:
 * <TcAutocomplete
 *   options={[{ label: 'Option 1' }, { label: 'Option 2' }]}
 *   label="Select an Option"
 * />
 */

import React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TcInput from '../TcInput';

interface TcAutocompleteProps {
  options: Array<{
    label: string;
    [key: string]: any;
  }>;
  label: string;
  onChange: (newValue: any) => void;
  [x: string]: any;
}

const TcAutocomplete: React.FC<TcAutocompleteProps> = ({
  options,
  label,
  onChange,
  ...props
}) => {
  return (
    <Autocomplete
      options={options}
      onChange={(event, newValue) => onChange(newValue)}
      getOptionLabel={(option) => option.label}
      renderInput={(params) => (
        <TcInput {...params} label={label} size="small" variant="filled" />
      )}
      {...props}
    />
  );
};

export default TcAutocomplete;