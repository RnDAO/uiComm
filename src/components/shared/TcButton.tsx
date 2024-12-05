/**
 * `TcButton` functional component.
 *
 * This component is an enhanced version of Material-UI's Button component. Depending on the `variant` prop,
 * it customizes the appearance of the button's content. If the variant is either 'contained' or 'outlined',
 * it wraps the text inside the `TcText` component. Otherwise, it simply displays the text.
 *
 * @param {ITcButtonProps} props - Properties passed to the component.
 * @returns {React.ReactElement} Rendered button component.
 */

import React from 'react';
import { Button, ButtonProps } from '@mui/material';

import TcText from './TcText';

interface ITcButtonProps extends ButtonProps {
  text: string | JSX.Element;
}

function TcButton({ text, ...props }: ITcButtonProps) {
  if (props.variant === 'contained') {
    return (
      <Button {...props} disableElevation={true}>
        <TcText text={text} variant='subtitle1' fontWeight='bold' />
      </Button>
    );
  }
  if (props.variant === 'outlined') {
    return (
      <Button {...props} disableElevation={true}>
        <TcText text={text} variant='subtitle1' fontWeight='bold' />
      </Button>
    );
  }
  return <Button {...props}>{text}</Button>;
}

export default TcButton;
