// TcPrompt.test.js

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import TcPrompt from './TcPrompt';

const mockedUseRouter = {
  pathname: '/',
  route: '/',
  asPath: '/',
  query: {},
  push: jest.fn(),
  replace: jest.fn(),
  reload: jest.fn(),
  back: jest.fn(),
  prefetch: jest.fn(),
  beforePopState: jest.fn(),
  events: {
    on: jest.fn(),
    off: jest.fn(),
    emit: jest.fn(),
  },
  isFallback: false,
};

jest.mock('next/router', () => ({
  useRouter: () => {
    return mockedUseRouter;
  },
}));

describe('TcPrompt', () => {
  test('renders without crashing', () => {
    render(<TcPrompt />);
  });

  test.each([
    [
      '/',
      'To see the data, connect your community platforms.',
      'Connect Community',
    ],
    [
      '/growth',
      'To see the data, connect your community’s Twitter account',
      'Connect Twitter account',
    ],
  ])(
    'renders correct message and buttonText for route: %s',
    (pathname, expectedMessage, expectedButtonText) => {
      mockedUseRouter.pathname = pathname;
      render(<TcPrompt />);

      expect(screen.getByText(expectedMessage)).toBeInTheDocument();
      expect(screen.getByText(expectedButtonText)).toBeInTheDocument();
    }
  );
});
