import { render, screen } from '@testing-library/react';
import React from 'react';

import TcEngagementAccounts from './TcEngagementAccounts';
import TcEngagementAccountsHeader from './TcEngagementAccountsHeader';

describe('<TcEngagementAccounts />', () => {
  const mockEngagement = {
    hqla: 10,
    hqhe: 20,
    lqla: 15,
    lqhe: 25,
  };

  beforeEach(() => {
    render(<TcEngagementAccounts engagement={mockEngagement} />);
  });

  // Test 1: Check if the TcEngagementAccountsHeader component is rendered.
  it('renders the header component', () => {
    render(<TcEngagementAccountsHeader />);
  });

  // Test 2: Check if the data is rendered correctly in the TcEngagementAccountsContent component.
  it('renders the correct engagement values and descriptions', () => {
    const descriptions = [
      'Only engaged a bit but deeper interactions',
      'Frequently engaged and deep interactions',
      'Only engaged a bit and shallow interactions',
      'Frequently engaged but shallow interactions',
    ];

    descriptions.forEach((description) => {
      expect(screen.getByText(description)).toBeInTheDocument();
    });

    expect(
      screen.getByText(mockEngagement.hqla.toString())
    ).toBeInTheDocument();
    expect(
      screen.getByText(mockEngagement.hqhe.toString())
    ).toBeInTheDocument();
    expect(
      screen.getByText(mockEngagement.lqla.toString())
    ).toBeInTheDocument();
    expect(
      screen.getByText(mockEngagement.lqhe.toString())
    ).toBeInTheDocument();
  });
});
