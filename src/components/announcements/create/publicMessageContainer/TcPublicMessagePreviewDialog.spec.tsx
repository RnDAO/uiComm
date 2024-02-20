import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import TcPublicMessagePreviewDialog from './TcPublicMessagePreviewDialog';

describe('TcPublicMessagePreviewDialog', () => {
  const textMessage = 'This is a test message';

  it('renders without crashing', () => {
    render(
      <TcPublicMessagePreviewDialog
        textMessage={textMessage}
        isPreviewDialogEnabled={true}
      />
    );
    expect(screen.getByText('Preview')).toBeInTheDocument();
  });

  it('opens dialog on preview button click', () => {
    render(
      <TcPublicMessagePreviewDialog
        textMessage={textMessage}
        isPreviewDialogEnabled={true}
      />
    );
    fireEvent.click(screen.getByText('Preview'));
    expect(screen.getByText('Preview Public Message')).toBeInTheDocument();
  });

  it('closes dialog on close icon click', async () => {
    render(
      <TcPublicMessagePreviewDialog
        textMessage={textMessage}
        isPreviewDialogEnabled={true}
      />
    );
    fireEvent.click(screen.getByText('Preview'));
    fireEvent.click(screen.getByTestId('close-icon'));

    await waitFor(() => {
      expect(
        screen.queryByText('Preview Public Message')
      ).not.toBeInTheDocument();
    });
  });

  it('closes dialog on confirm button click', async () => {
    render(
      <TcPublicMessagePreviewDialog
        textMessage={textMessage}
        isPreviewDialogEnabled={true}
      />
    );
    fireEvent.click(screen.getByText('Preview'));
    fireEvent.click(screen.getByText('Confirm'));

    await waitFor(() => {
      expect(
        screen.queryByText('Preview Public Message')
      ).not.toBeInTheDocument();
    });
  });
  it('displays the correct text message', () => {
    render(
      <TcPublicMessagePreviewDialog
        textMessage={textMessage}
        isPreviewDialogEnabled={true}
      />
    );
    fireEvent.click(screen.getByText('Preview'));
    expect(screen.getByText(textMessage)).toBeInTheDocument();
  });

  it('preview button is disabled when isPreviewDialogEnabled is false', () => {
    render(
      <TcPublicMessagePreviewDialog
        textMessage='Sample Message'
        isPreviewDialogEnabled={false}
      />
    );
    const previewButton = screen.getByRole('button', { name: 'Preview' });
    expect(previewButton).toBeDisabled();
  });
});
