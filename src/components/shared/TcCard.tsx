/**
 * TcCard Component.
 *
 * A wrapper around the Material-UI Card component with the added constraint that it must contain children.
 * This component extends all properties of the MUI Card, making it versatile for various use cases.
 *
 * Props:
 * - children: The content to be displayed inside the card. It's a mandatory prop for TcCard.
 * - ...props: All other properties supported by the MUI Card component. Refer to MUI documentation for a complete list.
 *
 * Example:
 * ```jsx
 * <TcCard elevation={3}>
 *   <CardContent>
 *     <Typography variant="h5" component="div">Card Title</Typography>
 *     <Typography variant="body2">Card content goes here.</Typography>
 *   </CardContent>
 * </TcCard>
 * ```
 */

import { Card, CardProps } from '@mui/material';
import React from 'react';

interface ITcCard extends CardProps {
  children: JSX.Element | React.ReactElement;
}

function TcCard({ children, ...props }: ITcCard) {
  return <Card {...props}>{children}</Card>;
}

export default TcCard;
