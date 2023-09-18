import { Typography, TypographyProps } from '@mui/material';
import React from 'react';

/**
 * TcTitle Component
 *
 * Description:
 * The `TcTitle` component is a wrapper around MUI's `Typography` component
 * with specific restrictions on the typography variants that can be utilized.
 *
 * Props:
 * - `title`: (Required) A string that represents the text content to be rendered.
 * - `variant`: (Required) A string that determines the typography variant
 *    to use for styling the text content. The allowed variants are:
 *    - h3
 *    - h4
 *    - h6
 *    - subtitle1
 *    - subtitle2
 *    - body1
 *    - body2
 *    - button
 *    - caption
 *
 * All other props available to MUI's `Typography` component can also be
 * passed to `TcTitle` except for the `variant` prop which is strictly typed
 * to the above variants.
 *
 * Usage:
 * ```jsx
 * <TcTitle title="Hello World" variant="h3" />
 * ```
 *
 * Note:
 * This component is specifically designed to restrict the use of typography
 * variants to maintain a consistent font-size throughout our application.
 * Make sure to only use the allowed variants listed above. Any other variant
 * from MUI's `Typography` component is not permitted with `TcTitle`.
 *
 */

type AcceptedVariants =
  | 'h3'
  | 'h4'
  | 'h6'
  | 'subtitle1'
  | 'subtitle2'
  | 'body1'
  | 'body2'
  | 'button'
  | 'caption';

interface ITcTextProps extends Omit<TypographyProps, 'variant'> {
  text: string | number | React.ReactNode | JSX.Element;
  variant: AcceptedVariants;
}

function TcText({ text, ...props }: ITcTextProps) {
  return <Typography {...props}>{text}</Typography>;
}

export default TcText;
