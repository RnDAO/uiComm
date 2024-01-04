import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import TcTimeZone from './TcTimeZone';

describe('TcTimeZone', () => {
  test('renders TcTimeZone component', () => {
    render(<TcTimeZone />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  test('opens popover on button click', () => {
    render(<TcTimeZone />);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(screen.getByText('Search timezone')).toBeInTheDocument();
  });
});
