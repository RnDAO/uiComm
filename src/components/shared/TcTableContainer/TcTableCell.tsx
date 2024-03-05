import React from 'react';
import { TableCell, TableCellProps } from '@mui/material';

interface ITcTableCellProps extends TableCellProps {
  children: React.ReactNode;
}

/**
 * TcTableCell Component
 *
 * Custom TableCell component that extends Material-UI's TableCell.
 * It can be used within Material-UI's Table components to display cell data.
 *
 * Props:
 *  - children: ReactNode - The content of the cell.
 *  - Other props inherited from Material-UI TableCellProps.
 *
 * @param {ITcTableCellProps} props - Props including children and TableCellProps
 */

function TcTableCell({ children, ...props }: ITcTableCellProps) {
  return <TableCell {...props}>{children}</TableCell>;
}

export default TcTableCell;
