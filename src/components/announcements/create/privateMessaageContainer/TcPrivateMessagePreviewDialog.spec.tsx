import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import TcPublicMessagePreviewDialog from './TcPrivateMessagePreviewDialog';

describe('TcPublicMessagePreviewDialog', () => {
  const textMessage = 'This is a test message';
  const roles = ['Admin', 'User'];
  const usernames = ['user1', 'user2'];

  it('renders without crashing', () => {
    render(
      <TcPublicMessagePreviewDialog
        textMessage={textMessage}
        isPreviewDialogEnabled={true}
        safetyChannel=''
      />
    );
    expect(screen.getByText('Preview')).toBeInTheDocument();
  });

  it('opens dialog on preview button click', () => {
    render(
      <TcPublicMessagePreviewDialog
        textMessage={textMessage}
        isPreviewDialogEnabled={true}
        safetyChannel=''
      />
    );
    fireEvent.click(screen.getByText('Preview'));
    expect(screen.getByText('Preview Private Message')).toBeInTheDocument();
  });

  it('closes dialog on close icon click', async () => {
    render(
      <TcPublicMessagePreviewDialog
        textMessage={textMessage}
        isPreviewDialogEnabled={true}
        safetyChannel=''
      />
    );
    fireEvent.click(screen.getByText('Preview'));
    fireEvent.click(screen.getByTestId('close-icon'));

    await waitFor(() => {
      expect(
        screen.queryByText('Preview Private Message')
      ).not.toBeInTheDocument();
    });
  });

  it('closes dialog on confirm button click', async () => {
    render(
      <TcPublicMessagePreviewDialog
        textMessage={textMessage}
        isPreviewDialogEnabled={true}
        safetyChannel=''
      />
    );
    fireEvent.click(screen.getByText('Preview'));
    fireEvent.click(screen.getByText('Confirm'));

    await waitFor(() => {
      expect(
        screen.queryByText('Preview Private Message')
      ).not.toBeInTheDocument();
    });
  });

  it('displays the correct text message', () => {
    render(
      <TcPublicMessagePreviewDialog
        textMessage={textMessage}
        isPreviewDialogEnabled={true}
        safetyChannel=''
      />
    );
    fireEvent.click(screen.getByText('Preview'));
    expect(screen.getByText(textMessage)).toBeInTheDocument();
  });

  it('displays roles and usernames when provided', () => {
    render(
      <TcPublicMessagePreviewDialog
        textMessage={textMessage}
        selectedRoles={roles}
        selectedUsernames={usernames}
        isPreviewDialogEnabled={true}
        safetyChannel=''
      />
    );
    fireEvent.click(screen.getByText('Preview'));
    roles.forEach((role) => {
      expect(screen.getByText(role)).toBeInTheDocument();
    });
    usernames.forEach((username) => {
      expect(screen.getByText(username)).toBeInTheDocument();
    });
  });
});
