import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import TcConfirmSchaduledAnnouncementsDialog from './TcConfirmSchaduledAnnouncementsDialog';

describe('TcConfirmSchaduledAnnouncementsDialog', () => {
  const defaultProps = {
    buttonLabel: 'Test Button',
    schaduledDate: 'July 12 at 13pm (CET)',
  };

  it('renders without crashing', () => {
    render(
      <TcConfirmSchaduledAnnouncementsDialog
        selectedChannels={[]}
        {...defaultProps}
      />
    );
    expect(screen.getByText('Test Button')).toBeInTheDocument();
  });

  it('toggles dialog visibility on button click', async () => {
    render(
      <TcConfirmSchaduledAnnouncementsDialog
        selectedChannels={[]}
        {...defaultProps}
      />
    );
    const button = screen.getByText('Test Button');
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText('Confirm Schedule')).toBeInTheDocument();
    });

    const closeButton = screen.getByTestId('close-icon');
    fireEvent.click(closeButton);

    await waitFor(() => {
      expect(screen.queryByText('Confirm Schedule')).not.toBeInTheDocument();
    });
  });

  it('displays the correct dialog content', () => {
    render(
      <TcConfirmSchaduledAnnouncementsDialog
        selectedChannels={[]}
        {...defaultProps}
      />
    );
    fireEvent.click(screen.getByText('Test Button'));
    expect(
      screen.getByText('Discord announcements scheduled for:')
    ).toBeInTheDocument();
    expect(screen.getByText('Public Message to:')).toBeInTheDocument();
    expect(
      screen.getByText('Private Message to these user(s):')
    ).toBeInTheDocument();
    expect(
      screen.getByText('Private Message to these role(s):')
    ).toBeInTheDocument();
  });

  it('closes the dialog when the close icon is clicked', async () => {
    render(
      <TcConfirmSchaduledAnnouncementsDialog
        selectedChannels={[]}
        {...defaultProps}
      />
    );

    fireEvent.click(screen.getByText('Test Button'));

    fireEvent.click(screen.getByTestId('close-icon'));

    await waitFor(() => {
      expect(screen.queryByText('Confirm Schedule')).not.toBeInTheDocument();
    });
  });
});
