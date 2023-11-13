import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import TcAutocomplete from './TcAutocomplete';

describe('TcAutocomplete Component', () => {
  const mockOptions = [
    { label: 'Option 1', id: 1 },
    { label: 'Option 2', id: 2 },
    // ... more options
  ];

  test('renders autocomplete component', () => {
    render(
      <TcAutocomplete
        options={mockOptions}
        label="Test Autocomplete"
        onChange={() => {}}
      />
    );
    expect(screen.getByLabelText('Test Autocomplete')).toBeInTheDocument();
  });

  test('displays options when typed in', () => {
    render(
      <TcAutocomplete
        options={mockOptions}
        label="Test Autocomplete"
        onChange={() => {}}
      />
    );
    const input = screen.getByRole('combobox');
    fireEvent.change(input, { target: { value: 'Option' } });
    expect(screen.getByText('Option 1')).toBeInTheDocument();
    expect(screen.getByText('Option 2')).toBeInTheDocument();
  });

  test('calls onChange when an option is selected', () => {
    const handleChange = jest.fn();
    render(
      <TcAutocomplete
        options={mockOptions}
        label="Test Autocomplete"
        onChange={handleChange}
      />
    );
    const input = screen.getByRole('combobox');
    fireEvent.change(input, { target: { value: 'Option 1' } });
    fireEvent.click(screen.getByText('Option 1'));
    expect(handleChange).toHaveBeenCalledWith(mockOptions[0]);
  });
});
