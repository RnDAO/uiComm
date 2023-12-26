import React from 'react';
import { render, screen } from '@testing-library/react';
import TcTableHead from './TcTableHead';

describe('TcTableHead', () => {
  const mockHeaders = ['Header 1', 'Header 2'];

  it('renders the table head with headers', () => {
    render(<TcTableHead headers={mockHeaders} />);

    // Check if each header text content is present in the document
    mockHeaders.forEach((headerText) => {
      const header = screen.getByText(headerText);
      expect(header).toBeInTheDocument();
    });
  });
});
