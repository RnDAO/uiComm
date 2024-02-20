import { MenuItem, Select, SelectProps } from '@mui/material';
import React, { ReactElement } from 'react';
import { IconType } from 'react-icons';

import TcText from '../TcText';

/**
 * Interface for TcSelect props
 */
interface ITcSelectProps extends SelectProps {
  /**
   * options - Array of option objects for the select dropdown
   * Each object can have:
   *   - value (string | number): The value of the option
   *   - label (string): The display label for the option
   *   - icon (ReactElement<IconType>): Optional icon to display alongside the label
   */
  options?: Array<{
    value: string | number;
    label: string;
    icon?: ReactElement<IconType>;
    disabled?: boolean;
  }>;
  children?: React.ReactNode;
}

/**
 * TcSelect is a custom select component built on Material-UI's Select component.
 * It allows displaying a list of options with optional icons.
 *
 * @param {ITcSelectProps} props - The props for the component
 * @returns {ReactElement} The TcSelect component
 */

function TcSelect({
  options,
  children,
  ...props
}: ITcSelectProps): ReactElement {
  return (
    <Select {...props}>
      {options && options.length > 0
        ? options.map((option) => (
            <MenuItem
              key={option.value}
              value={option.value}
              disabled={option.disabled}
            >
              <div className='flex items-center justify-start space-x-2'>
                {option.icon && React.cloneElement(option.icon)}
                <TcText text={option.label} />
              </div>
            </MenuItem>
          ))
        : children}
    </Select>
  );
}

export default TcSelect;
