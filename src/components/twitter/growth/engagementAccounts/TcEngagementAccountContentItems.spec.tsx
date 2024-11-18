import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import TcEngagementAccountContentItems from './TcEngagementAccountContentItems';

describe('TcEngagementAccountContentItems', () => {
  const defaultProps = {
    bgColor: 'bg-[#3A9E2B]',
    value: '5',
    description: 'Sample description',
    tooltipText: 'Sample tooltip text',
  };

  it('renders the component and checks presence of value and description', () => {
    render(<TcEngagementAccountContentItems {...defaultProps} />);

    expect(screen.getByText(defaultProps.value.toString())).toBeInTheDocument();
    expect(screen.getByText(defaultProps.description)).toBeInTheDocument();
  });

  it('renders the tooltip icon when tooltipText prop is provided', () => {
    render(<TcEngagementAccountContentItems {...defaultProps} />);

    expect(screen.getByTestId('icon-svg')).toBeInTheDocument();
  });

  it('does not render the tooltip icon when tooltipText prop is not provided', () => {
    const propsWithoutTooltip = {
      ...defaultProps,
      tooltipText: undefined,
    };
    render(<TcEngagementAccountContentItems {...propsWithoutTooltip} />);

    expect(screen.queryByTestId('icon-svg')).not.toBeInTheDocument();
  });
});
