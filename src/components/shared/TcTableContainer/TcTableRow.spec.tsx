import React from 'react';
import { render, screen } from '@testing-library/react';
import TcTableRow from './TcTableRow';
import TcTableCell from './TcTableCell';

describe('TcTableCell', () => {
  it('renders correctly with children', () => {
    render(<TcTableCell>Sample Content</TcTableCell>);
    const cellContent = screen.getByText('Sample Content');
    expect(cellContent).toBeInTheDocument();
  });
});

describe('TcTableRow', () => {
  it('renders correctly with row data', () => {
    const rowData = { column1: 'Data1', column2: 'Data2' };
    render(<TcTableRow rowItem={rowData} />);
    expect(screen.getByText('Data1')).toBeInTheDocument();
    expect(screen.getByText('Data2')).toBeInTheDocument();
  });

  it('applies custom renderers', () => {
    const rowData = { column1: 'Data1' };
    const customRenderers = {
      column1: (value: any) => <strong>{value}</strong>,
    };
    render(<TcTableRow rowItem={rowData} customRenderers={customRenderers} />);
    const renderedData = screen.getByText('Data1');
    expect(renderedData).toBeInTheDocument();
    expect(renderedData).toHaveProperty('nodeName', 'STRONG');
  });

  it('applies custom table cell classes', () => {
    const rowData = { column1: 'Data1' };
    const customClasses = 'test-class';
    render(
      <TcTableRow rowItem={rowData} customTableCellClasses={customClasses} />
    );
    const cell = screen.getByText('Data1').closest('td');
    expect(cell).toHaveClass(customClasses);
  });
});
