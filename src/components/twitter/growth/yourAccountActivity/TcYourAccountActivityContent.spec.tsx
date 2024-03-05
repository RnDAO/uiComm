import { render, screen } from '@testing-library/react';
import React from 'react';

import TcYourAccountActivityContent from './TcYourAccountActivityContent';

describe('<TcYourAccountActivityContent />', () => {
  const mockData = [
    { description: 'Desc 1', value: 123, hasTooltipInfo: true },
    { description: 'Desc 2', value: 456, hasTooltipInfo: false },
    { description: 'Desc 3', value: 789, hasTooltipInfo: true },
  ];

  beforeEach(() => {
    render(<TcYourAccountActivityContent data={mockData} />);
  });

  it('renders the correct values and descriptions', () => {
    mockData.forEach((item) => {
      expect(screen.getByText(item.value.toString())).toBeInTheDocument();
      expect(screen.getByText(item.description)).toBeInTheDocument();
    });
  });

  it('does not render the TcIconWithTooltip when hasTooltipInfo is false', () => {
    // Filtering mockData for items with hasTooltipInfo as false
    const itemsWithoutTooltip = mockData.filter((item) => !item.hasTooltipInfo);

    itemsWithoutTooltip.forEach((item) => {
      expect(
        screen.getByText(item.description).closest('div')
      ).not.toHaveTextContent('Followers and non-followers');
    });
  });
});
