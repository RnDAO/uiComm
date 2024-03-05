import { fireEvent, render } from '@testing-library/react';
import React from 'react';

import TcConfirmSchaduledAnnouncementsDialog from './TcConfirmSchaduledAnnouncementsDialog';

const mockHandleCreateAnnouncements = jest.fn();

const defaultProps = {
  buttonLabel: 'Select Date for Announcement',
  selectedChannels: [{ id: '1', label: 'General' }],
  schaduledDate: '2024-01-20T12:00:00',
  isDisabled: false,
  handleCreateAnnouncements: mockHandleCreateAnnouncements,
};

test('renders the dialog with button and calls handleCreateAnnouncements when confirmed', () => {
  const { getByText, getByTestId } = render(
    <TcConfirmSchaduledAnnouncementsDialog {...defaultProps} />
  );

  const button = getByText('Select Date for Announcement');
  expect(button).toBeInTheDocument();

  fireEvent.click(button);

  const dialogTitle = getByText('Confirm Schedule');
  expect(dialogTitle).toBeInTheDocument();

  const confirmButton = getByText('Confirm');
  expect(confirmButton).toBeInTheDocument();
  fireEvent.click(confirmButton);

  expect(mockHandleCreateAnnouncements).toHaveBeenCalledWith(false);
});
