import { Switch, SwitchProps } from '@mui/material';
import React from 'react';

type ITcSwitchProps = SwitchProps;

/**
 * `TcSwitch` Component
 *
 * This component is a wrapper around Material-UI's `Switch` component.
 * It can be used anywhere a Material-UI Switch would be used. It accepts all props
 * that a standard Material-UI Switch accepts.
 *
 * Usage:
 * <TcSwitch checked={value} onChange={handleChange} />
 *
 * Props:
 * - All props available to Material-UI's `Switch` component.
 * - `checked`: Boolean indicating whether the switch is on or off.
 * - `onChange`: Function to handle the change event when the switch is toggled.
 *
 * Example:
 * ```
 * <TcSwitch
 *   checked={this.state.isChecked}
 *   onChange={(e) => { this.setState({ isChecked: e.target.checked }) }}
 * />
 * ```
 *
 * For more details on Material-UI's `Switch` props,
 * see: https://mui.com/api/switch/
 */

function TcSwitch({ ...props }: ITcSwitchProps) {
  return <Switch {...props} />;
}

export default TcSwitch;
