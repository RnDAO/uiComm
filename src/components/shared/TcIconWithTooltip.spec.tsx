import React from 'react';
import { render, screen } from '@testing-library/react';
import TcIconWithTooltip from './TcIconWithTooltip';

describe('<TcIconWithTooltip />', () => {
  // Test 1: Check if the component renders correctly
  it('renders without crashing', () => {
    render(<TcIconWithTooltip tooltipText='Sample tooltip' />);
  });

  // Test 2: Check if the default icon (SVG) is rendered if none is provided
  it('renders the default SVG icon if none is provided', () => {
    render(<TcIconWithTooltip tooltipText='Sample tooltip' />);
    const svgIcon = screen.getByTestId('icon-svg'); // Make sure you add this test-id to your SVG in the component
    expect(svgIcon).toBeInTheDocument();
  });

  // Test 3: Check if a custom icon is rendered when provided
  it('renders a custom icon (SVG) when provided', () => {
    const customIcon = <svg data-testid='custom-icon'></svg>;
    render(
      <TcIconWithTooltip
        iconComponent={customIcon}
        tooltipText='Sample tooltip'
      />
    );
    const renderedIcon = screen.getByTestId('custom-icon');
    expect(renderedIcon).toBeInTheDocument();
  });
});
