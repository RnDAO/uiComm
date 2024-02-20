import { render, screen } from '@testing-library/react';
import React from 'react';

import TcTableCell from './TcTableCell';

describe('TcTableCell', () => {
  it('renders the children content', () => {
    render(<TcTableCell>Test Content</TcTableCell>);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });
});
