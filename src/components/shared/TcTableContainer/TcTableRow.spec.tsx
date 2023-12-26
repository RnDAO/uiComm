import React from 'react';
import { render, screen } from '@testing-library/react';
import TcTableCell from './TcTableCell';

describe('TcTableCell', () => {
  it('renders correctly with children', () => {
    // Render the TcTableCell component with some children
    render(<TcTableCell>Sample Content</TcTableCell>);

    // Check if the rendered content is present
    const cellContent = screen.getByText('Sample Content');
    expect(cellContent).toBeInTheDocument();
  });
});
