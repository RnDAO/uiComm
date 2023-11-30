import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import TcPrompt from './TcPrompt';
import mockRouter from 'next-router-mock';
import { StorageService } from '../../../services/StorageService';

jest.mock('next/router', () => require('next-router-mock'));
jest.mock('../../../services/StorageService');

describe('TcPrompt', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(StorageService, 'readLocalStorage').mockImplementation((key) => {
      if (key === 'community') {
        return { platforms: [] }; // Adjust this return value as needed for different test cases
      }
      return undefined;
    });
  });

  test('renders without crashing', () => {
    mockRouter.setCurrentUrl('/');
    render(<TcPrompt />);
    // Additional checks can be added here
  });

  test('renders prompt when no platforms are connected', () => {
    mockRouter.setCurrentUrl('/');
    render(<TcPrompt />);
    expect(
      screen.getByText('To see the data, connect your community platforms.')
    ).toBeInTheDocument();
  });

  test('does not render prompt on excluded routes', () => {
    mockRouter.setCurrentUrl('/cetric');
    render(<TcPrompt />);
    expect(
      screen.queryByText('To see the data, connect your community platforms.')
    ).not.toBeInTheDocument();
  });

  test('does not render prompt when platforms are connected', () => {
    mockRouter.setCurrentUrl('/');
    jest
      .spyOn(StorageService, 'readLocalStorage')
      .mockReturnValue({ platforms: ['Discord'] });
    render(<TcPrompt />);
    expect(
      screen.queryByText('To see the data, connect your community platforms.')
    ).not.toBeInTheDocument();
  });
});
