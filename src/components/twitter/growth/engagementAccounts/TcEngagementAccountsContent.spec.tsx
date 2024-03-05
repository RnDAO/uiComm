import { render, screen } from '@testing-library/react';
import React from 'react';

import TcEngagementAccountsContent from './TcEngagementAccountsContent';

describe('<TcEngagementAccountsContent />', () => {
  const mockContentItems = [
    {
      bgColor: 'bg-red',
      value: 10,
      description: 'Description 1',
      tooltipText: 'Tooltip 1',
      label: 'Label 1',
    },
    {
      bgColor: 'bg-blue',
      value: 20,
      description: 'Description 2',
      tooltipText: 'Tooltip 2',
    },
    {
      bgColor: 'bg-yellow',
      value: 30,
      description: 'Description 3',
      tooltipText: 'Tooltip 3',
      label: 'Label 3',
    },
    {
      bgColor: 'bg-green',
      value: 40,
      description: 'Description 4',
      tooltipText: 'Tooltip 4',
    },
  ];

  beforeEach(() => {
    render(<TcEngagementAccountsContent contentItems={mockContentItems} />);
  });

  // Test 1: Check if the TcEngagementAccountContentItems component is rendered for each item.
  it('renders content items correctly', () => {
    mockContentItems.forEach((item) => {
      expect(screen.getByText(item.description)).toBeInTheDocument();
    });
  });

  // Test 2: Check if the labels 'High' and 'Low' are rendered.
  it('renders the labels High and Low', () => {
    ['High', 'Low'].forEach((label) => {
      expect(screen.getByText(label)).toBeInTheDocument();
    });
  });

  // Test 3: Check if specific labels in content items are rendered.
  it('renders content item labels correctly', () => {
    mockContentItems.forEach((item) => {
      if (item.label) {
        expect(screen.getByText(item.label)).toBeInTheDocument();
      }
    });
  });
});
