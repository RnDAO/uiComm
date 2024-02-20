import React from 'react';
import { Table, TableProps } from '@mui/material';
import TcTableHead from './TcTableHead';
import TcTableBody from './TcTableBody';

interface ITcTableContainerProps extends TableProps {
  headers?: string[];
  bodyRowItems?: any[];
}

/**
 * TcTableContainer Component
 *
 * Custom Table component that extends Material-UI's Table.
 * It can be used to display tabular data with optional custom border separation and spacing.
 *
 * Props:
 *  - headers: Array of strings - The table column headers.
 *  - bodyRowItems: Array of objects - The data for table rows.
 *  - Other props inherited from Material-UI TableProps.
 *
 * @param {ITcTableContainerProps} props - Props including headers, bodyRowItems, and TableProps
 */

function TcTableContainer({
  headers,
  bodyRowItems,
  ...props
}: ITcTableContainerProps) {
  return (
    <Table {...props} className='border-separate border-spacing-y-2'>
      {headers && headers.length > 0 && <TcTableHead headers={headers} />}
      {bodyRowItems && bodyRowItems.length > 0 && (
        <TcTableBody rowItems={bodyRowItems} />
      )}
    </Table>
  );
}

export default TcTableContainer;
