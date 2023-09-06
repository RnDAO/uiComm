import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import TcEngagementAccounts from './TcEngagementAccounts';

// Mock the child components to simplify the test
jest.mock('./TcEngagementAccountsHeader', () => () => (
  <div data-testid="header-mock">Header</div>
));
jest.mock('./TcEngagementAccountsContent', () => () => (
  <div data-testid="content-mock">Content</div>
));

describe('TcEngagementAccounts', () => {
  it('renders the component and checks presence of child components', () => {
    render(<TcEngagementAccounts />);

    // Check if the mocked header component is rendered
    expect(screen.getByTestId('header-mock')).toBeInTheDocument();

    // Check if the mocked content component is rendered
    expect(screen.getByTestId('content-mock')).toBeInTheDocument();
  });
});
