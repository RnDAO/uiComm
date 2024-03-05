import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TipsDialog from './TipsDialog';

describe('TipsDialog', () => {
  test('renders the dialog with the correct header text', () => {
    const headerText = 'Dialog Header';
    const onClose = jest.fn();
    render(
      <TipsDialog isOpen={true} headerText={headerText} onClose={onClose}>
        Dialog Content
      </TipsDialog>
    );

    // Assert the presence of the dialog header text
    const dialogHeader = screen.getByText(headerText);
    expect(dialogHeader).toBeInTheDocument();
  });

  test('calls the onClose callback when the close button is clicked', () => {
    const onClose = jest.fn();
    render(
      <TipsDialog isOpen={true} headerText="Dialog Header" onClose={onClose}>
        Dialog Content
      </TipsDialog>
    );

    // Click the close button
    const closeButton = screen.getByTestId('close-icon');
    expect(closeButton).toBeInTheDocument();
    fireEvent.click(closeButton);

    // Check if the onClose callback is called
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  test('renders the dialog with the correct content', () => {
    const contentText = 'Dialog Content';
    render(
      <TipsDialog isOpen={true} headerText="Dialog Header" onClose={jest.fn()}>
        {contentText}
      </TipsDialog>
    );

    // Assert the presence of the dialog content
    const dialogContent = screen.getByText(contentText);
    expect(dialogContent).toBeInTheDocument();
  });

  test('renders the dialog when isOpen is true', () => {
    render(
      <TipsDialog isOpen={true} headerText="Dialog Header" onClose={jest.fn()}>
        Dialog Content
      </TipsDialog>
    );

    // Assert the presence of the dialog
    const dialog = screen.getByRole('dialog');
    expect(dialog).toBeInTheDocument();
  });

  test('does not render the dialog when isOpen is false', () => {
    render(
      <TipsDialog isOpen={false} headerText="Dialog Header" onClose={jest.fn()}>
        Dialog Content
      </TipsDialog>
    );

    // Assert that the dialog is not rendered
    const dialog = screen.queryByRole('dialog');
    expect(dialog).not.toBeInTheDocument();
  });
});
