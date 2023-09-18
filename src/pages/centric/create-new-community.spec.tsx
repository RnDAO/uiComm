import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import CreateNewCommunity from './create-new-community';

describe('CreateNewCommunity', () => {
  it('renders the TcBoxContainer with correct content', () => {
    render(<CreateNewCommunity />);

    expect(
      screen.getByText('Create a new community account')
    ).toBeInTheDocument();
    expect(screen.getByLabelText('Community name')).toBeInTheDocument();
    expect(screen.getByText('Privacy Policy')).toBeInTheDocument();
    expect(screen.getByText('Terms of Service.')).toBeInTheDocument();
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
    expect(screen.getByText('Create community')).toBeInTheDocument();
  });

  it('allows user to check the agreement checkbox', () => {
    render(<CreateNewCommunity />);

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();
    userEvent.click(checkbox);
    expect(checkbox).toBeChecked();
  });
});
