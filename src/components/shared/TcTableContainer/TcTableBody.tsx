import React from 'react';
import { TableBody, TableBodyProps } from '@mui/material';

import TcTableRow from './TcTableRow';

interface ITcTableBodyProps extends TableBodyProps {
  rowItems: { [key: string]: any }[];
}

/**
 * TcTableBody Component
 *
 * Renders a Material-UI TableBody with custom row items.
 * Each row is rendered using the TcTableRow component.
 *
 * Props:
 *  - rowItems: Array of objects, each representing data for a single row.
 *
 * @param {ITcTableBodyProps} props - Props including rowItems and other TableBodyProps
 */

function TcTableBody({ rowItems=[], ...props }: ITcTableBodyProps) {
  return (
    <TableBody {...props}>
      {rowItems.map((row, index) => (
        <TcTableRow
          key={index}
          rowItem={row}
          className={`no-border my-5 h-16 ${
            index % 2 === 0 ? 'bg-gray-100' : ''
          }`}
        />
      ))}
    </TableBody>
  );
}

export default TcTableBody;
