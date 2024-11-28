import React from 'react';
import { render, screen } from '@testing-library/react';

import TcAccountActivityHeader from './TcAccountActivityHeader';
import { StorageService } from '../../../../services/StorageService';

jest.mock('../../../../services/StorageService');

describe('<TcAccountActivityHeader />', () => {
  beforeEach(() => {
    // Mocking the `readLocalStorage` method
    const mockedReadLocalStorage =
      StorageService.readLocalStorage as jest.MockedFunction<
        typeof StorageService.readLocalStorage
      >;

    mockedReadLocalStorage.mockReturnValue({
      twitter: {
        twitterUsername: 'testUser',
      },
    });

    render(<TcAccountActivityHeader />);
  });

  it('renders the main header text', () => {
    const headerText = screen.getByText('Account activity');
    expect(headerText).toBeInTheDocument();
  });

  it('renders the time information with an icon', () => {
    const timeInfoText = screen.getByText('Data over the last 7 days');
    const timeIcon = screen.getByTestId('bi-time-five-icon');
    expect(timeInfoText).toBeInTheDocument();
    expect(timeIcon).toBeInTheDocument();
  });

  it('renders the analyzed account username when provided', () => {
    const usernameLink = screen.getByText('@testUser');
    expect(usernameLink).toBeInTheDocument();
    expect(usernameLink).toHaveAttribute('href', '/settings');
  });
});
