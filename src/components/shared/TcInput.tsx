import {
  FilledTextFieldProps,
  OutlinedTextFieldProps,
  StandardTextFieldProps,
  TextField,
} from '@mui/material';

/**
 * Represents custom properties specific to the TcInput component.
 */
interface ICustomProps {
  /** Label for the input */
  label: string;
}

/**
 * Represents the properties of the TcInput component.
 * It combines custom properties with any of the three variants
 * of TextField properties provided by MUI.
 */
type TcInputProps = ICustomProps &
  (StandardTextFieldProps | FilledTextFieldProps | OutlinedTextFieldProps);

/**
 * `TcInput` is a functional component that serves as a wrapper around MUI's TextField.
 * It ensures that a label prop is always provided along with any other properties
 * that a regular MUI TextField would accept.
 *
 * @param props - The properties the component accepts. See `TcInputProps`.
 * @returns A JSX element representing a TextField with the provided properties.
 */

const TcInput = ({ InputProps, ...props }: TcInputProps) => {
  const mergedInputProps = {
    ...InputProps,
    sx: { ...(InputProps?.sx || {}), borderRadius: 0 },
  };

  return <TextField {...props} InputProps={mergedInputProps} />;
};

export default TcInput;
