import React from 'react';
import { render, screen } from '@testing-library/react';

import TcIconContainer from './TcIconContainer';

describe('TcIconContainer', () => {
  it('renders its children', () => {
    render(
      <TcIconContainer>
        <div>Test Child</div>
      </TcIconContainer>
    );
    expect(screen.getByText('Test Child')).toBeInTheDocument();
  });
});
