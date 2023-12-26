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
      <TcTableRow rowItem={headers} />
    </TableHead>
  );
}

export default TcTableHead;
