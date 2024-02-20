import { render, screen } from '@testing-library/react';

import OnboardingMembersBreakdown from './OnboardingMembersBreakdown';
import { TokenProvider } from '../../../../../context/TokenContext';
jest.mock('next/router', () => require('next-router-mock'));

describe('ActiveMemberBreakdown', () => {
  it('renders the component', () => {
    render(
      <TokenProvider>
        <OnboardingMembersBreakdown />
      </TokenProvider>
    );

    const component = screen.getByText('Members breakdown');
    expect(component).toBeInTheDocument();
  });
});
