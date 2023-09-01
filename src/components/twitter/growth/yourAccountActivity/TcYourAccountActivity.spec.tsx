import React from 'react';
import { render, screen } from '@testing-library/react';
import TcYourAccountActivity from './TcYourAccountActivity';
import TcYourAccountActivityHeader from './TcYourAccountActivityHeader';
import TcYourAccountActivityContent from './TcYourAccountActivityContent';

// Mocking child components
jest.mock('./TcYourAccountActivityHeader', () => () => (
  <div>mockTcYourAccountActivityHeader</div>
));
jest.mock('./TcYourAccountActivityContent', () => () => (
  <div>mockTcYourAccountActivityContent</div>
));

describe('<TcYourAccountActivity />', () => {
  beforeEach(() => {
    render(<TcYourAccountActivity />);
  });

  // Test 1: Check if TcYourAccountActivityHeader is rendered
  it('renders TcYourAccountActivityHeader component', () => {
    expect(
      screen.getByText('mockTcYourAccountActivityHeader')
    ).toBeInTheDocument();
  });

  // Test 2: Check if TcYourAccountActivityContent is rendered
  it('renders TcYourAccountActivityContent component', () => {
    expect(
      screen.getByText('mockTcYourAccountActivityContent')
    ).toBeInTheDocument();
  });
});
