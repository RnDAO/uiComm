import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { useRouter } from 'next/router';
import Callback from './callback';
import { StatusCode } from '../utils/enums';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('Callback component', () => {
  let mockUseRouter: jest.Mock;

  beforeEach(() => {
    mockUseRouter = useRouter as jest.Mock;
  });

  it('should show repeated discord authorization attempt message', async () => {
    mockUseRouter.mockReturnValue({
      isReady: true,
      asPath: `/callback?statusCode=${StatusCode.REPEATED_DISCORD_AUTHORIZATION_ATTEMPT}`,
    });

    render(<Callback />);

    await waitFor(() => {
      expect(
        screen.getByText(
          'You have authorized before and are trying to authorize again.'
        )
      ).toBeInTheDocument();
    });
  });

  it('should show successful first time discord authorization message', async () => {
    mockUseRouter.mockReturnValue({
      isReady: true,
      asPath: `/callback?statusCode=${StatusCode.DISCORD_AUTHORIZATION_SUCCESSFUL_FIRST_TIME}`,
    });

    render(<Callback />);

    await waitFor(() => {
      expect(
        screen.getByText('Welcome! Authorization for sign-in was successful.')
      ).toBeInTheDocument();
    });
  });

  it('should show discord authorization failure message', async () => {
    mockUseRouter.mockReturnValue({
      isReady: true,
      asPath: `/callback?statusCode=${StatusCode.DISCORD_AUTHORIZATION_FAILURE}`,
    });

    render(<Callback />);

    await waitFor(() => {
      expect(
        screen.getByText('Authorization failed. Please try again.')
      ).toBeInTheDocument();
    });
  });

  it('should handle no status code in URL', async () => {
    mockUseRouter.mockReturnValue({
      isReady: true,
      asPath: '/callback',
    });

    render(<Callback />);

    await waitFor(() => {
      expect(
        screen.getByText(
          'An error occurred while processing your request. Please try again.'
        )
      ).toBeInTheDocument();
    });
  });
});
