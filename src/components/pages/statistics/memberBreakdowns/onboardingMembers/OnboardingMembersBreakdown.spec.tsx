import { render, screen } from '@testing-library/react';
import OnboardingMembersBreakdown from './OnboardingMembersBreakdown';
jest.mock('next/router', () => require('next-router-mock'));

describe('ActiveMemberBreakdown', () => {
  it('renders the component', () => {
    render(<OnboardingMembersBreakdown />);

    // Assert the component is rendered
    const component = screen.getByText('Members breakdown');
    expect(component).toBeInTheDocument();
  });
});
