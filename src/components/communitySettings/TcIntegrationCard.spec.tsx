import { render, screen } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom/extend-expect';

import TcIntegrationCard from './TcIntegrationCard';

describe('<TcIntegrationCard />', () => {
  it('renders the card with passed children', () => {
    // Mock child for testing
    const mockChild = <div>Test Child</div>;

    render(<TcIntegrationCard>{mockChild}</TcIntegrationCard>);

    // Check if the card contains the child content
    const childElement = screen.getByText('Test Child');
    expect(childElement).toBeInTheDocument();
  });

  it('applies the specified className to the card', () => {
    render(
      <TcIntegrationCard>
        <div />
      </TcIntegrationCard>
    );

    // Using getByTestId as an example, but you might prefer another query method
    const cardElement = screen.getByTestId('tc-integration-card');

    expect(cardElement).toHaveClass('w-[8.75rem]', 'h-[10rem]');
  });
});
