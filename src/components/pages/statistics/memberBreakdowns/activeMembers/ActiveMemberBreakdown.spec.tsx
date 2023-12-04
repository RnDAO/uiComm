import { render, screen } from '@testing-library/react';
import ActiveMemberBreakdown from './ActiveMemberBreakdown';
import { TokenProvider } from '../../../../../context/TokenContext';
jest.mock('next/router', () => require('next-router-mock'));

describe('ActiveMemberBreakdown', () => {
  it('renders the component', () => {
    render(
      <TokenProvider>
        <ActiveMemberBreakdown />
      </TokenProvider>
    );

    const component = screen.getByText('Members breakdown');
    expect(component).toBeInTheDocument();
  });
});
