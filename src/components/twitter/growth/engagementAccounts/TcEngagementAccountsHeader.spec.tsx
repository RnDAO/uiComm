import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // For the "toBeInTheDocument" matcher

import TcAudienceResponseHeader from './TcEngagementAccountsHeader';

describe('TcAudienceResponseHeader', () => {
  it('renders the correct text', () => {
    const { getByText } = render(<TcAudienceResponseHeader />);

    const headerText = getByText('Engagement by accounts');

    expect(headerText).toBeInTheDocument();
  });
});
