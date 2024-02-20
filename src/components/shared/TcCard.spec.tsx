import { CardContent,Typography } from '@mui/material';
import { render } from '@testing-library/react';
import React from 'react';

import TcCard from './TcCard';

describe('<TcCard />', () => {
  // Test 1: Check if the component renders correctly
  it('renders without crashing', () => {
    render(<TcCard children={<>test</>} />);
  });

  // Test 2: Check if the component renders its children
  it('renders its children', () => {
    const { getByText } = render(
      <TcCard>
        <CardContent>
          <Typography>Card Content</Typography>
        </CardContent>
      </TcCard>
    );

    expect(getByText('Card Content')).toBeInTheDocument();
  });
});
