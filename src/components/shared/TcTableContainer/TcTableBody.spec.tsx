import React from 'react';
import { render, screen } from '@testing-library/react';
import TcTableBody from './TcTableBody';

describe('TcTableBody', () => {
  const mockRowItems = [
    { Name: 'Alice', Age: 28, Location: 'New York' },
    { Name: 'Bob', Age: 34, Location: 'San Francisco' },
  ];

  it('renders correctly with rowItems', () => {
    render(
      <table>
        <TcTableBody rowItems={mockRowItems} />
      </table>
    );
    const tableRows = screen.getAllByRole('row');
    expect(tableRows.length).toBe(mockRowItems.length);
  });

  it('applies alternate background color for rows', () => {
    render(
      <table>
        <TcTableBody rowItems={mockRowItems} />
      </table>
    );
    const firstRow = screen.getAllByRole('row')[0];
    expect(firstRow).toHaveClass('bg-gray-100');
  });
});
