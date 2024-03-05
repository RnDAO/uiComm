import React from 'react';
import { render, screen } from '@testing-library/react';
import TcTableContainer from './TcTableContainer';

describe('TcTableContainer', () => {
  const mockHeaders = ['Header 1', 'Header 2'];
  const mockBodyRowItems = [
    { Column1: 'Row 1, Column 1', Column2: 'Row 1, Column 2' },
    { Column1: 'Row 2, Column 1', Column2: 'Row 2, Column 2' },
  ];

  it('renders the table with body row items', () => {
    render(<TcTableContainer bodyRowItems={mockBodyRowItems} />);

    // Check if each row text content is present in the document
    mockBodyRowItems.forEach((rowData) => {
      Object.values(rowData).forEach((cellText) => {
        const cell = screen.getByText(cellText);
        expect(cell).toBeInTheDocument();
      });
    });
  });

  it('applies custom classes for border separation and spacing', () => {
    render(
      <TcTableContainer headers={mockHeaders} bodyRowItems={mockBodyRowItems} />
    );
    const table = screen.getByRole('table');
    expect(table).toHaveClass('border-separate border-spacing-y-2');
  });
});
