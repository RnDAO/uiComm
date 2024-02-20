import { Box, Container } from '@mui/material';
import Image from 'next/image';
import React from 'react';

import tcLogo from '../assets/svg/tc-logo.svg';

interface ICentricLayout {
  children: React.ReactNode;
}

function centricLayout({ children }: ICentricLayout) {
  return (
    <Box className='min-h-screen w-screen' bgcolor='grey.100'>
      <Container
        sx={{ textAlign: 'center', paddingY: '2rem' }}
        className='space-y-6'
      >
        <Image src={tcLogo} alt="" className='mx-auto' />
        {children}
      </Container>
    </Box>
  );
}

export default centricLayout;
