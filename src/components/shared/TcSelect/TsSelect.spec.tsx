import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import TcSelect from './TcSelect';

describe('TcSelect Component', () => {
  const mockOptions = [
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' },
  ];

  test('renders the select component', () => {
    render(<TcSelect options={mockOptions} />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  test('can select an option', () => {
    render(<TcSelect options={mockOptions} />);
    fireEvent.mouseDown(screen.getByRole('button'));
    const option = screen.getByText('Option 1');
    fireEvent.click(option);
    expect(screen.getByRole('button').textContent).toBe('Option 1');
  });
});
