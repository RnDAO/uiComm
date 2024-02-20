import React from 'react';
import { TableHead, TableHeadProps, TableRow, TableCell } from '@mui/material';
import TcTableRow from './TcTableRow';

interface ITcTableHeadProps extends TableHeadProps {
  headers: string[];
}

/**
 * Component to render the table head with headers.
 *
 * @param {ITcTableHeadProps} props - The component props.
 */

function TcTableHead({ headers, ...props }: ITcTableHeadProps) {
  return (
    <TableHead {...props}>
      <TcTableRow
        rowItem={headers}
        customTableCellClasses='rounded-none p-0 border-none uppercase text-xs font-light first:pl-3 last:pr-3'
      />
    </TableHead>
  );
}

export default TcTableHead;
