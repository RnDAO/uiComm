import React from 'react';
import { render, screen } from '@testing-library/react';
import TcAccountActivityHeader from './TcAccountActivityHeader';

describe('<TcAccountActivityHeader />', () => {
  // Test 1: Check if the component renders correctly
  it('renders without crashing', () => {
    render(<TcAccountActivityHeader />);
  });

  // Test 2: Check if the expected texts are displayed
  it('displays the expected texts', () => {
    render(<TcAccountActivityHeader />);

    expect(screen.getByText('Account activity')).toBeInTheDocument();
    expect(screen.getByText('Data over the last 7 days')).toBeInTheDocument();
    expect(screen.getByText('Analyzed account:')).toBeInTheDocument();
    expect(screen.getByText('@daoxyz')).toBeInTheDocument();
  });

  // Test 3: Check if the BiTimeFive icon (SVG) is rendered using data-testid
  it('renders the BiTimeFive icon (SVG)', () => {
    render(<TcAccountActivityHeader />);
    const svgIcon = screen.getByTestId('bi-time-five-icon');
    expect(svgIcon).toBeInTheDocument();
  });

  // Test 4: Check if TcLink with the to prop as '/' is rendered
  it('renders TcLink with to prop as "/"', () => {
    render(<TcAccountActivityHeader />);
    const link = screen.getByRole('link', { name: /@daoxyz/i });
    expect(link).toHaveAttribute('href', '/');
  });
});
