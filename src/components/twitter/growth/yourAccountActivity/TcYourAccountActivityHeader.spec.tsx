import React from 'react';
import { render, screen } from '@testing-library/react';

import TcYourAccountActivityHeader from './TcYourAccountActivityHeader';

describe('<TcYourAccountActivityHeader />', () => {
  beforeEach(() => {
    render(<TcYourAccountActivityHeader />);
  });

  it('renders the main header text', () => {
    const headerText = screen.getByText('Your account activity');
    expect(headerText).toBeInTheDocument();
    expect(headerText.tagName).toBe('H6'); // if MUI's variant h6 is being translated to the HTML h6 tag
  });

  it('renders the subtext about engagement', () => {
    const subtext = screen.getByText('How much you engage with others');
    expect(subtext).toBeInTheDocument();
  });
});
