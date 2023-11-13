/**
 * TcSelect Component
 *
 * This component is a wrapper around Material-UI's Select component.
 * It provides a dropdown select box functionality.
 *
 * Props:
 * - options: Array of objects with 'value' and 'label' keys. These are used to populate the dropdown menu.
 *
 * Example Usage:
 * <TcSelect options={[{ value: '1', label: 'Option 1' }, { value: '2', label: 'Option 2' }]} />
 */

import React, { useState } from 'react';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

interface TcSelectProps {
  options: {
    value: string;
    label: string;
  }[];
}

function TcSelect({ options, ...props }: TcSelectProps) {
  const [value, setValue] = useState('');

  const handleChange = (event: SelectChangeEvent<string>) => {
    const newValue = event.target.value as string;
    setValue(newValue);
  };

  return (
    <Select value={value} onChange={handleChange} {...props}>
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </Select>
  );
}

export default TcSelect;
