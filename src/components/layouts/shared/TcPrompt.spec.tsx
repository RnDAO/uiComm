import { render, screen } from '@testing-library/react';
import mockRouter from 'next-router-mock';
import React from 'react';
import '@testing-library/jest-dom/extend-expect';

import TcPrompt from './TcPrompt';
import { TokenProvider } from '../../../context/TokenContext';
import { StorageService } from '../../../services/StorageService';

jest.mock('next/router', () => require('next-router-mock'));
jest.mock('../../../services/StorageService');

describe('TcPrompt', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(StorageService, 'readLocalStorage').mockImplementation((key) => {
      if (key === 'community') {
        return { platforms: [] };
      }
      return undefined;
    });
  });

  const renderComponent = (url = '/') => {
    mockRouter.setCurrentUrl(url);
    render(
      <TokenProvider>
        <TcPrompt />
      </TokenProvider>
    );
  };

  test('renders without crashing', () => {
    renderComponent();
  });

  test('renders prompt when no platforms are connected', () => {
    renderComponent();
    expect(
      screen.getByText(/To see the data, connect your community platforms./i)
    ).toBeInTheDocument();
    expect(screen.getByText('docs')).toHaveAttribute(
      'href',
      'https://togethercrew.gitbook.io/onboarding/fundamentals/getting-set-up'
    );
  });

  test('does not render prompt on excluded routes', () => {
    renderComponent('/cetric');

    expect(
      screen.queryByText('To see the data, connect your community platforms.')
    ).not.toBeInTheDocument();
  });

  test('renders prompt when platform connection is in progress', () => {
    jest
      .spyOn(StorageService, 'readLocalStorage')
      .mockReturnValue({ platforms: [{ metadata: { isInProgress: true } }] });
    renderComponent();
    expect(
      screen.getByText(
        'Data import is in progress. It might take up to 6 hours to finish the data import. Once it is done we will send you a message on Discord.'
      )
    ).toBeInTheDocument();
  });

  test('does not render prompt when platforms are connected and not in progress', () => {
    jest
      .spyOn(StorageService, 'readLocalStorage')
      .mockReturnValue({ platforms: [{ metadata: { isInProgress: false } }] });
    renderComponent();
    expect(
      screen.queryByText('To see the data, connect your community platforms.')
    ).not.toBeInTheDocument();
  });
});
