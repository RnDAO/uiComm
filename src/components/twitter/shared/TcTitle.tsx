import { Typography, TypographyProps } from '@mui/material';
import React from 'react';

interface ITcTitleProps extends TypographyProps {
  title: string;
}

function TcTitle({ title, ...rest }: ITcTitleProps) {
  return <Typography {...rest}>{title}</Typography>;
}

export default TcTitle;
