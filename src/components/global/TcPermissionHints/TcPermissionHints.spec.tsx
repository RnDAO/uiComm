import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import PermissionHints from './TcPermissionHints';
describe('PermissionHints Component', () => {
  test('renders PermissionHints component', () => {
    render(<PermissionHints />);
    expect(screen.getByText('Access Settings')).toBeInTheDocument();
    expect(screen.getByText('Server Level')).toBeInTheDocument();
    expect(screen.getByText('Category Level')).toBeInTheDocument();
    expect(screen.getByText('Channel Level')).toBeInTheDocument();
  });

  test('initial active category is Access Settings', async () => {
    render(<PermissionHints />);
    await waitFor(() => {
      expect(
        screen.getByText('What does “Read” and “Write” access mean?')
      ).toBeInTheDocument();
    });
  });

  test('clicking on a category button changes active category to Server Level', async () => {
    render(<PermissionHints />);
    const serverLevelButton = screen.getByText('Server Level');
    userEvent.click(serverLevelButton);
    await waitFor(() => {
      expect(
        screen.getByText(
          'Please note that your platform’s permission settings enable the above permission controls'
        )
      ).toBeInTheDocument();
    });
  });

  test('clicking on a category button changes active category to Category Level', async () => {
    render(<PermissionHints />);
    const categoryLevelButton = screen.getByText('Category Level');
    userEvent.click(categoryLevelButton);
    await waitFor(() => {
      expect(
        screen.getByText(
          'Please note that Category-level permissions override Server-level permissions'
        )
      ).toBeInTheDocument();
    });
  });

  test('clicking on a category button changes active category to Channel Level', async () => {
    render(<PermissionHints />);

    const channelLevelButton = screen.getByText('Channel Level');

    userEvent.click(channelLevelButton);

    await waitFor(() => {
      expect(
        screen.getByText(
          'Please note that Channel-level permissions override Category-level permissions, which in turn override Server-level permissions'
        )
      ).toBeInTheDocument();
    });
  });
});
