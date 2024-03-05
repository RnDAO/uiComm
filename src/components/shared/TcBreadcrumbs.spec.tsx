import { render, screen } from '@testing-library/react';
import { useRouter } from 'next/router';
import React from 'react';
import '@testing-library/jest-dom/extend-expect';

import TcBreadcrumbs from './TcBreadcrumbs';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('TcBreadcrumbs', () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders breadcrumb links based on the items prop', () => {
    const items = [
      { label: 'Home', path: '/' },
      { label: 'About', path: '/about' },
    ];

    render(<TcBreadcrumbs items={items} />);

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
  });
});
