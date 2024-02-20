/**
 * `TcCheckbox` Component
 *
 * This component is a simple wrapper around MUI's Checkbox component.
 * It provides an encapsulated way to manage and use checkboxes, while
 * offering all the extended properties and behaviors of the underlying MUI Checkbox.
 *
 * Props:
 * All properties of the original MUI Checkbox component are supported. Refer to
 * MUI documentation for detailed prop types and descriptions.
 * @see https://mui.com/api/checkbox/
 *
 * Usage:
 * ```jsx
 * <TcCheckbox
 *   checked={someCheckedState}
 *   onChange={handleCheckboxChange}
 *   color="primary"
 * />
 * ```
 *
 * Note:
 * - Ensure that you manage the checked state externally when using this component.
 * - Bind an onChange handler to capture and manage checkbox state changes.
 *
 * @param {ITcCheckboxProps} props - Extended MUI Checkbox properties.
 * @returns {JSX.Element} Rendered Checkbox component.
 */

import Checkbox, { CheckboxProps } from '@mui/material/Checkbox';
import React from 'react';

type ITcCheckboxProps = CheckboxProps

function TcCheckbox({ ...props }: ITcCheckboxProps) {
  return <Checkbox {...props} />;
}

export default TcCheckbox;
