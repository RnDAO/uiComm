import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import TcEngagementAccountsContent from './TcEngagementAccountsContent';

describe('TcEngagementAccountsContent', () => {
  it('renders the component and checks presence of key elements', () => {
    render(<TcEngagementAccountsContent />);

    expect(screen.getByText('Quality of engagement')).toBeInTheDocument();
    expect(screen.getByText('Amount of engagement')).toBeInTheDocument();

    const highTexts = screen.getAllByText(/High/i);
    highTexts.forEach((element) => {
      expect(element).toBeInTheDocument();
    });

    const lowTexts = screen.getAllByText(/Low/i);
    lowTexts.forEach((element) => {
      expect(element).toBeInTheDocument();
    });
  });
});
