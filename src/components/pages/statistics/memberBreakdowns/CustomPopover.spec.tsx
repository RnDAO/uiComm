import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CustomPopover from './CustomPopover';

describe('CustomPopover', () => {
  test('renders closed popover by default', () => {
    // Arrange
    const anchorEl = null;
    const onClose = jest.fn();
    const children = <div>Test Content</div>;

    // Act
    render(
      <CustomPopover open={false} anchorEl={anchorEl} onClose={onClose}>
        {children}
      </CustomPopover>
    );

    // Assert
    const popoverContent = screen.queryByText('Test Content');
    expect(popoverContent).not.toBeInTheDocument();
  });

  test('renders and opens the popover when open prop is true', () => {
    // Arrange
    const anchorEl = document.createElement('div');
    const onClose = jest.fn();
    const children = <div>Test Content</div>;

    // Act
    render(
      <CustomPopover open={true} anchorEl={anchorEl} onClose={onClose}>
        {children}
      </CustomPopover>
    );

    // Assert
    const popoverContent = screen.getByText('Test Content');
    expect(popoverContent).toBeInTheDocument();
  });

  test('renders closed popover by default', () => {
    // Arrange
    const anchorEl = null;
    const onClose = jest.fn();
    const children = <div>Test Content</div>;

    // Act
    render(
      <CustomPopover open={false} anchorEl={anchorEl} onClose={onClose}>
        {children}
      </CustomPopover>
    );

    // Assert
    const popoverContent = screen.queryByText('Test Content');
    expect(popoverContent).not.toBeInTheDocument();
  });
});
