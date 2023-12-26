import React from 'react';
import { TableRow, TableRowProps } from '@mui/material';
import TcTableCell from './TcTableCell';

interface ITcTableRowProps extends TableRowProps {
  rowItem: { [key: string]: any };
  customRenderers?: { [key: string]: (value: any) => React.ReactNode };
}

/**
 * Component to render a table row with custom rendering options.
 *
 * @param {ITcTableRowProps} props - The component props.
 */

function TcTableRow({ rowItem, customRenderers, ...props }: ITcTableRowProps) {
  return (
    <TableRow {...props}>
      {rowItem &&
        Object.entries(rowItem).map(([key, value], index) => {
          const CustomRenderer = customRenderers?.[key];
          return (
            <TcTableCell
              key={index}
              className={`px-1 first:px-3 py-4 first:rounded-l-md first:border-r-0 last:rounded-r-md last:border-l-0`}
            >
              {CustomRenderer ? CustomRenderer(value) : value}
            </TcTableCell>
          );
        })}
    </TableRow>
  );
}

export default TcTableRow;
