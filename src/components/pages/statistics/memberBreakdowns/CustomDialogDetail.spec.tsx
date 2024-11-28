import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import CustomDialogDetail from './CustomDialogDetail';
import {
  IActivityCompositionOptions,
  IRowDetail,
} from '../../../../utils/interfaces';

const mockRowDetail: IRowDetail = {
  discordId: '123',
  avatar: 'avatar.png',
  username: 'John Doe',
  roles: [
    { roleId: '1', name: 'Role 1', color: '#ff0000' },
    { roleId: '2', name: 'Role 2', color: '#00ff00' },
  ],
  activityComposition: ['Composition 1', 'Composition 2'],
};

const mockOptions: IActivityCompositionOptions[] = [
  { name: 'Option 1', value: 'option1', color: '#0000ff' },
  { name: 'Option 2', value: 'option2', color: '#ffff00' },
];

test('renders the dialog with all states', () => {
  // Render the dialog with open state
  render(
    <CustomDialogDetail
      open={true}
      rowDetail={mockRowDetail}
      onClose={jest.fn()}
      options={mockOptions}
    />
  );

  // Check if the close button is rendered
  const closeButton = screen.getByTestId('close-modal-icon');
  expect(closeButton).toBeInTheDocument();

  // Check if the user avatar is rendered
  const avatar = screen.getByAltText('User Avatar');
  expect(avatar).toBeInTheDocument();

  // Check if the username is rendered
  const username = screen.getByText('John Doe');
  expect(username).toBeInTheDocument();

  // Check if the activity compositions are rendered
  const compositionElements = screen.getAllByTestId('activity-composition');
  expect(compositionElements.length).toBe(2);

  // Render the dialog with closed state
  render(
    <CustomDialogDetail
      open={false}
      rowDetail={mockRowDetail}
      onClose={jest.fn()}
      options={mockOptions}
    />
  );

  // Check if the dialog is not rendered
  const dialog = screen.queryByRole('MuiDialog-paper');
  expect(dialog).toBeNull();
});

test('calls the onClose callback when the close button is clicked', () => {
  const onClose = jest.fn();
  render(
    <CustomDialogDetail
      open={true}
      rowDetail={mockRowDetail}
      onClose={onClose}
      options={mockOptions}
    />
  );

  // Click the close button
  const closeButton = screen.getByTestId('close-modal-icon');
  fireEvent.click(closeButton);

  // Check if the onClose callback is called
  expect(onClose).toHaveBeenCalled();
});
